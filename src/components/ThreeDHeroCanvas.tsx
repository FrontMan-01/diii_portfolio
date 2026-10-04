import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDHeroCanvasProps {
  className?: string;
}

export const ThreeDHeroCanvas: React.FC<ThreeDHeroCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported in ThreeDHeroCanvas:', e);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const getDimensions = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      return { width, height };
    };

    let { width, height } = getDimensions();
    renderer.setSize(width, height);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, -0.4, 3.8);
    camera.lookAt(0, 0, 0);

    // -------------------------------------------------------------
    // 1. Undulating Silk / Molten Gold Ribbon Mesh
    // -------------------------------------------------------------
    // Dense subdivision for ultra-fluid waves and specular reflections
    const silkGeometry = new THREE.PlaneGeometry(8.2, 5.2, 128, 96);

    const silkVertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScrollSpeed;
      varying vec2 vUv;
      varying float vElevation;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      // Multi-harmonic silk wave generator
      float getSilkWave(vec2 p, float time, vec2 mouse, float scroll) {
        float d = length(p - mouse);
        
        // Interactive ripple and indent from mouse cursor
        float mouseRipple = sin(d * 7.0 - time * 3.2) * exp(-d * 1.4) * 0.28;
        float mousePush = -exp(-d * 2.0) * 0.22;

        // Diagonal flowing silk waves with harmonic layering
        vec2 flowDir = vec2(0.707, 0.707);
        float w1 = sin(dot(p, flowDir) * 1.8 + time * 0.55 + scroll * 0.5) * 0.42;
        float w2 = cos(p.x * 2.5 - p.y * 1.6 - time * 0.45) * 0.26;
        float w3 = sin(p.x * 4.8 + p.y * 3.4 + time * 0.85 + w1 * 1.6) * 0.14;
        float w4 = cos(p.x * 7.5 - p.y * 6.2 - time * 1.1) * 0.05; // Micro-silk folds

        return (w1 + w2 + w3 + w4) + mouseRipple + mousePush;
      }

      void main() {
        vUv = uv;
        vec2 p = position.xy;

        // Subtle structural bow for 3D ribbon depth
        float arch = sin(uv.x * 3.14159265) * 0.35 - (position.y * 0.12);
        float elevation = getSilkWave(p, uTime, uMouse, uScrollSpeed) + arch;
        vElevation = elevation;

        vec3 newPos = position;
        newPos.z += elevation * 0.58;

        // Analytical normal via finite differences for crisp specular lighting
        float eps = 0.025;
        float hR = getSilkWave(p + vec2(eps, 0.0), uTime, uMouse, uScrollSpeed) + (sin((uv.x + eps / 8.2) * 3.14159265) * 0.35 - (position.y * 0.12));
        float hT = getSilkWave(p + vec2(0.0, eps), uTime, uMouse, uScrollSpeed) + (arch - (position.y + eps) * 0.12);

        vec3 tangentX = normalize(vec3(eps, 0.0, (hR - elevation) * 0.58));
        vec3 tangentY = normalize(vec3(0.0, eps, (hT - elevation) * 0.58));
        vec3 calcNormal = normalize(cross(tangentX, tangentY));

        vNormal = normalMatrix * calcNormal;

        vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const silkFragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec3 uColorBase;
      uniform vec3 uColorSunset;
      uniform vec3 uColorGold;
      uniform vec3 uColorChampagne;
      varying vec2 vUv;
      varying float vElevation;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Normalize elevation into tiered luxury color bands
        float t = clamp((vElevation + 0.65) * 0.78, 0.0, 1.0);

        // Palette mapping: Mineral Graphite -> Sunset Amber -> Sunlit Gold -> Champagne Sheen
        vec3 col = mix(uColorBase, uColorSunset, smoothstep(0.08, 0.48, t));
        col = mix(col, uColorGold, smoothstep(0.42, 0.82, t));
        col = mix(col, uColorChampagne, smoothstep(0.78, 1.10, t));

        // 1. Directional Sunlit Key Light (Blinn-Phong)
        vec3 keyLight = normalize(vec3(0.55, 0.75, 1.1));
        float diff = max(dot(normal, keyLight), 0.0);
        vec3 halfVector = normalize(keyLight + viewDir);
        float spec = pow(max(dot(normal, halfVector), 0.0), 28.0);

        // 2. Ambient Fill Light from lower angle
        vec3 fillLight = normalize(vec3(-0.6, -0.4, 0.7));
        float fillDiff = max(dot(normal, fillLight), 0.0) * 0.45;

        // 3. Luxurious Champagne Fresnel Rim Glaze
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.2);
        vec3 rim = uColorChampagne * fresnel * 0.75;

        // 4. Anisotropic Molten Gold Micro-Sheen
        float sheen = pow(1.0 - abs(dot(normal, vec3(0.0, 1.0, 0.0))), 2.2) * 0.28;

        // Combine Lighting
        vec3 finalColor = col * (0.42 + diff * 0.68 + fillDiff * 0.32);
        finalColor += uColorChampagne * spec * 0.85;
        finalColor += rim;
        finalColor += uColorGold * sheen;

        // Perimeter feathering & radial fade for smooth backdrop blending
        float fadeX = smoothstep(0.0, 0.14, vUv.x) * smoothstep(1.0, 0.86, vUv.x);
        float fadeY = smoothstep(0.0, 0.14, vUv.y) * smoothstep(1.0, 0.86, vUv.y);
        float edgeAlpha = fadeX * fadeY;

        float distCenter = length(vUv - vec2(0.5, 0.5));
        float radialAlpha = smoothstep(0.85, 0.22, distCenter);

        float alpha = clamp(edgeAlpha * radialAlpha * 0.82, 0.0, 1.0);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const silkUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScrollSpeed: { value: 0 },
      uColorBase: { value: new THREE.Color('#18191B') },       // Mineral graphite
      uColorSunset: { value: new THREE.Color('#E27D26') },     // Sunset amber
      uColorGold: { value: new THREE.Color('#E7C456') },       // Sunlit rich gold
      uColorChampagne: { value: new THREE.Color('#FFF5DC') },  // Champagne sheen
    };

    const silkMaterial = new THREE.ShaderMaterial({
      vertexShader: silkVertexShader,
      fragmentShader: silkFragmentShader,
      uniforms: silkUniforms,
      transparent: true,
      depthWrite: false,
      wireframe: false,
    });

    const silkMesh = new THREE.Mesh(silkGeometry, silkMaterial);
    silkMesh.rotation.x = -Math.PI * 0.1;
    silkMesh.rotation.z = -Math.PI * 0.02;
    scene.add(silkMesh);

    // -------------------------------------------------------------
    // 2. 3D Ambient Golden Motes / Floating Stardust Particles
    // -------------------------------------------------------------
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);
    const particlePhases = new Float32Array(particleCount);
    const particleColorTiers = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 11.0;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 7.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5.0 + 0.5;

      particleScales[i] = Math.random() * 2.2 + 0.9;
      particleSpeeds[i] = Math.random() * 0.35 + 0.15;
      particlePhases[i] = Math.random() * Math.PI * 2.0;
      // 0 = Sunset Amber, 1 = Sunlit Gold, 2 = Champagne
      particleColorTiers[i] = Math.random() < 0.25 ? 0 : Math.random() < 0.7 ? 1 : 2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('aScale', new THREE.BufferAttribute(particleScales, 1));
    particleGeometry.setAttribute('aSpeed', new THREE.BufferAttribute(particleSpeeds, 1));
    particleGeometry.setAttribute('aPhase', new THREE.BufferAttribute(particlePhases, 1));
    particleGeometry.setAttribute('aColorTier', new THREE.BufferAttribute(particleColorTiers, 1));

    const particleVertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      attribute float aScale;
      attribute float aSpeed;
      attribute float aPhase;
      attribute float aColorTier;
      varying float vColorTier;
      varying float vAlpha;

      void main() {
        vColorTier = aColorTier;
        vec3 pos = position;

        float t = uTime * aSpeed + aPhase;
        
        // Gentle 3D orbital turbulence
        pos.x += sin(t * 0.7 + pos.z * 0.6) * 0.35 + uMouse.x * 0.25;
        pos.y += cos(t * 0.6 + pos.x * 0.5) * 0.28 + uMouse.y * 0.20;
        pos.z += sin(t * 0.5) * 0.22;

        // Periodic luminous twinkling
        vAlpha = 0.3 + 0.7 * pow(sin(t * 1.6 + aPhase) * 0.5 + 0.5, 2.0);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aScale * (190.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const particleFragmentShader = `
      uniform vec3 uColorGold;
      uniform vec3 uColorSunset;
      uniform vec3 uColorChampagne;
      varying float vColorTier;
      varying float vAlpha;

      void main() {
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        if (dist > 0.5) discard;

        // Soft radial glow curve
        float glow = exp(-dist * 4.5) * (1.0 - smoothstep(0.0, 0.5, dist));

        vec3 pCol = uColorGold;
        if (vColorTier > 1.5) {
          pCol = uColorChampagne;
        } else if (vColorTier < 0.5) {
          pCol = uColorSunset;
        }

        // Luminous hot core
        vec3 finalCol = mix(pCol, vec3(1.0, 0.98, 0.94), smoothstep(0.18, 0.0, dist));

        gl_FragColor = vec4(finalCol, glow * vAlpha * 0.85);
      }
    `;

    const particleUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorGold: { value: new THREE.Color('#E7C456') },
      uColorSunset: { value: new THREE.Color('#E27D26') },
      uColorChampagne: { value: new THREE.Color('#FFF5DC') },
    };

    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: particleUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // -------------------------------------------------------------
    // Mouse & Scroll Interactivity Tracking
    // -------------------------------------------------------------
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollSpeed = 0;
    let targetScrollSpeed = 0;
    let lastScrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = Math.max(-1.5, Math.min(1.5, x));
      mouse.targetY = Math.max(-1.5, Math.min(1.5, y));
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      targetScrollSpeed = Math.min(delta * 0.05, 1.2);
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      const dims = getDimensions();
      width = dims.width;
      height = dims.height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // Animation Loop
    // -------------------------------------------------------------
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Scroll speed decay
      scrollSpeed += (targetScrollSpeed - scrollSpeed) * 0.1;
      targetScrollSpeed *= 0.92;

      // Update silk uniforms
      silkUniforms.uTime.value = elapsed;
      silkUniforms.uMouse.value.set(mouse.x * 2.8, mouse.y * 2.0);
      silkUniforms.uScrollSpeed.value = scrollSpeed;

      // Update particle uniforms
      particleUniforms.uTime.value = elapsed;
      particleUniforms.uMouse.value.set(mouse.x, mouse.y);

      // Subtle slow canvas sway
      silkMesh.rotation.z = -Math.PI * 0.02 + Math.sin(elapsed * 0.18) * 0.025;
      camera.position.x = mouse.x * 0.15;
      camera.position.y = -0.4 + mouse.y * 0.12;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // -------------------------------------------------------------
    // Cleanup on unmount
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }

      silkGeometry.dispose();
      silkMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
