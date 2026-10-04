import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AmbientSunlitBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported, using fallback gradients', e);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 3.6);
    camera.lookAt(0, 0, 0);

    // -----------------------------------------------------------------
    // 1. Silky Smooth Mineral Caustics Plane (Low Frequency, Matte Sheen)
    // -----------------------------------------------------------------
    const geometry = new THREE.PlaneGeometry(9.0, 6.0, 96, 72);

    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec2 vUv;
      varying float vElevation;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      // Smooth multi-frequency domain-warped caustics
      float getCausticWave(vec2 p, float t, vec2 m) {
        float d = length(p - m);
        // Subtle, gentle cursor dent/lens distortion (low amplitude)
        float mouseLens = -exp(-d * 2.2) * 0.12;

        // Slow, elegant diagonal silk flow
        vec2 dir = vec2(0.8, 0.6);
        float w1 = sin(dot(p, dir) * 1.2 + t * 0.28) * 0.24;
        float w2 = cos(p.x * 1.6 - p.y * 1.1 - t * 0.22) * 0.16;
        float w3 = sin(p.x * 2.8 + p.y * 2.2 + t * 0.35 + w1 * 1.2) * 0.08;

        return (w1 + w2 + w3) * 0.55 + mouseLens;
      }

      void main() {
        vUv = uv;
        vec2 p = position.xy;
        float elevation = getCausticWave(p, uTime, uMouse);
        vElevation = elevation;

        vec3 newPos = position;
        newPos.z += elevation * 0.42;

        // Compute smooth analytical normals
        float eps = 0.03;
        float hR = getCausticWave(p + vec2(eps, 0.0), uTime, uMouse);
        float hT = getCausticWave(p + vec2(0.0, eps), uTime, uMouse);

        vec3 tangentX = normalize(vec3(eps, 0.0, (hR - elevation) * 0.42));
        vec3 tangentY = normalize(vec3(0.0, eps, (hT - elevation) * 0.42));
        vec3 calcNormal = normalize(cross(tangentX, tangentY));

        vNormal = normalMatrix * calcNormal;
        vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
        vViewPosition = -mvPosition.xyz;

        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3 uColorDarkObsidian;
      uniform vec3 uColorMineralGraphite;
      uniform vec3 uColorWarmBronze;
      uniform vec3 uColorSunGold;
      uniform vec3 uColorChampagne;
      varying vec2 vUv;
      varying float vElevation;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Soft elevation mapping with low saturation
        float t = clamp((vElevation + 0.35) * 1.4, 0.0, 1.0);

        // Velvety color ramp: Obsidian -> Mineral Graphite -> Warm Bronze Hue -> Muted Gold
        vec3 col = mix(uColorDarkObsidian, uColorMineralGraphite, smoothstep(0.0, 0.45, t));
        col = mix(col, uColorWarmBronze, smoothstep(0.35, 0.75, t));
        col = mix(col, uColorSunGold, smoothstep(0.70, 1.15, t));

        // 1. Directional Soft Key Light
        vec3 lightDir = normalize(vec3(0.6, 0.7, 1.0));
        float diff = max(dot(normal, lightDir), 0.0);
        
        // 2. Soft Matte Specular (wide roughness for silky fabric sheen, not plastic)
        vec3 halfVector = normalize(lightDir + viewDir);
        float spec = pow(max(dot(normal, halfVector), 0.0), 16.0) * 0.35;

        // 3. Gentle Fresnel Edge Glow
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
        vec3 rim = uColorChampagne * fresnel * 0.28;

        // Blend lighting with conservative brightness to never overshadow content
        vec3 finalColor = col * (0.55 + diff * 0.45);
        finalColor += uColorChampagne * spec;
        finalColor += rim;

        // Radial falloff towards edges + deep contrast-safe center
        float distCenter = length(vUv - vec2(0.5, 0.5));
        float radialFade = smoothstep(0.92, 0.15, distCenter);

        // Keep alpha low and calm
        float alpha = clamp(radialFade * 0.65, 0.0, 0.85);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      // Calibrated Eye-Pleasing Luxury Palette (Deep Merlot Noir base, low saturation, zero text clash)
      uColorDarkObsidian: { value: new THREE.Color('#140205') },    // Deepest Merlot Noir base
      uColorMineralGraphite: { value: new THREE.Color('#22030A') }, // Rich Velvet Cabernet Slate
      uColorWarmBronze: { value: new THREE.Color('#3D0A16') },      // Muted Burgundy Bronze
      uColorSunGold: { value: new THREE.Color('#A8842E') },         // Sophisticated Brushed Gold
      uColorChampagne: { value: new THREE.Color('#F0DEC3') },       // Soft Champagne Gaze
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.08;
    scene.add(mesh);

    // -----------------------------------------------------------------
    // 2. 28 Subtle Floating Golden Stardust Embers in 3D Depth
    // -----------------------------------------------------------------
    const emberCount = 28;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberScales = new Float32Array(emberCount);
    const emberSpeeds = new Float32Array(emberCount);
    const emberPhases = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3 + 0] = (Math.random() - 0.5) * 8.0;
      emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 3.0;

      emberScales[i] = Math.random() * 2.0 + 1.0;
      emberSpeeds[i] = Math.random() * 0.18 + 0.08;
      emberPhases[i] = Math.random() * Math.PI * 2.0;
    }

    const emberGeometry = new THREE.BufferGeometry();
    emberGeometry.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    emberGeometry.setAttribute('aScale', new THREE.BufferAttribute(emberScales, 1));
    emberGeometry.setAttribute('aSpeed', new THREE.BufferAttribute(emberSpeeds, 1));
    emberGeometry.setAttribute('aPhase', new THREE.BufferAttribute(emberPhases, 1));

    const emberVertexShader = `
      uniform float uTime;
      attribute float aScale;
      attribute float aSpeed;
      attribute float aPhase;
      varying float vAlpha;

      void main() {
        vec3 pos = position;
        float t = uTime * aSpeed + aPhase;

        // Slow upward thermal convection with subtle lateral drift
        pos.y = mod(pos.y + t * 0.2 + 2.75, 5.5) - 2.75;
        pos.x += sin(t * 0.8) * 0.18;

        // Soft, breathing twinkle
        vAlpha = 0.2 + 0.5 * sin(t * 1.5 + aPhase);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aScale * (140.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const emberFragmentShader = `
      void main() {
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        if (dist > 0.5) discard;

        // Ultra soft Gaussian falloff
        float glow = exp(-dist * 4.0) * (1.0 - smoothstep(0.0, 0.5, dist));
        vec3 goldColor = vec3(0.92, 0.78, 0.45);

        gl_FragColor = vec4(goldColor, glow * 0.55);
      }
    `;

    const emberMaterial = new THREE.ShaderMaterial({
      vertexShader: emberVertexShader,
      fragmentShader: emberFragmentShader,
      uniforms: { uTime: uniforms.uTime },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const embers = new THREE.Points(emberGeometry, emberMaterial);
    scene.add(embers);

    // Mouse tracking with heavy damping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      uniforms.uTime.value = elapsedTime;
      uniforms.uMouse.value.set(mouse.x * 2.2, mouse.y * 1.5);

      // Subtle atmospheric camera parallax
      camera.position.x = mouse.x * 0.08;
      camera.position.y = mouse.y * 0.06;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      emberGeometry.dispose();
      emberMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#160205]">
      {/* 1. Dynamic 3D WebGL Mineral Caustics Canvas */}
      <div ref={containerRef} className="absolute inset-0 opacity-90" />

      {/* 2. Contrast Protection Mask: Soft Darkened Column in Center for 100% Text Legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% 45%, rgba(22, 2, 5, 0.45) 0%, rgba(18, 2, 4, 0.88) 100%)',
        }}
      />

      {/* 3. Subtle Ambient Light Anchors (Positioned far in corners to frame content) */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(231, 196, 86, 0.35) 0%, rgba(180, 20, 50, 0.15) 50%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-2/3 -left-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(231, 196, 86, 0.25) 0%, rgba(120, 10, 30, 0.1) 60%, transparent 80%)',
        }}
      />

      {/* 4. Ultra-Fine Luxury Film Grain */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
