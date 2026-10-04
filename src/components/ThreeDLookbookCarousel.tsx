import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { 
  Rotate3d, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  Maximize2, 
  Eye, 
  Film, 
  Grid, 
  Compass, 
  Volume2, 
  Heart,
  Layers
} from 'lucide-react';
import { ReelItem } from '../types';
import { soundFx } from '../utils/soundFx';

export interface Carousel3DItem {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
  badge?: string;
  caption?: string;
  aspect?: string;
  duration?: string;
  views?: string;
  likes?: string;
  tags?: string[];
  audioTrack?: string;
  reelData?: ReelItem;
}

export interface ThreeDLookbookCarouselProps {
  items: Carousel3DItem[];
  variant?: 'lookbook' | 'reels';
  onOpenLightbox?: (imageUrl: string, title: string) => void;
  onSelectReel?: (reel: ReelItem) => void;
  viewMode?: '3d' | 'grid';
  onToggleViewMode?: () => void;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  className?: string;
  heightClass?: string;
  autoSpinDefault?: boolean;
}

// Global Texture Cache for zero redundant texture downloads & lightning memory reuse
const textureCache = new Map<string, THREE.Texture>();
const textureLoader = new THREE.TextureLoader();

function getCachedTexture(url: string, onLoad?: () => void): THREE.Texture {
  if (textureCache.has(url)) {
    const tex = textureCache.get(url)!;
    if (onLoad && tex.image) onLoad();
    return tex;
  }
  const texture = textureLoader.load(url, () => {
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    if (onLoad) onLoad();
  });
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(url, texture);
  return texture;
}

// Fallback detection for WebGL availability
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export const ThreeDLookbookCarousel: React.FC<ThreeDLookbookCarouselProps> = ({
  items,
  variant = 'lookbook',
  onOpenLightbox,
  onSelectReel,
  viewMode = '3d',
  onToggleViewMode,
  title,
  subtitle,
  badgeText,
  className = '',
  heightClass = 'h-[620px] sm:h-[680px] lg:h-[720px]',
  autoSpinDefault = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State for UI overlay
  const [isAutoSpinning, setIsAutoSpinning] = useState(autoSpinDefault);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [texturesLoaded, setTexturesLoaded] = useState(false);

  // References for Three.js interaction & animation state
  const stateRef = useRef({
    currentRotation: 0,
    targetRotation: 0,
    velocity: 0,
    isPointerDown: false,
    pointerStartX: 0,
    pointerStartY: 0,
    pointerStartTime: 0,
    lastPointerX: 0,
    lastPointerTime: 0,
    hasMoved: false,
    hoveredCardIdx: null as number | null,
    cardMeshes: [] as THREE.Group[],
    radius: 6.0,
    itemCount: items.length,
    autoSpin: autoSpinDefault,
    isHoveringCanvas: false,
    rafId: 0,
  });

  // Sync autoSpin state with ref
  useEffect(() => {
    stateRef.current.autoSpin = isAutoSpinning;
  }, [isAutoSpinning]);

  // Keep item count in sync
  useEffect(() => {
    stateRef.current.itemCount = items.length;
  }, [items.length]);

  // Active item reference for UI readout
  const activeItem = useMemo(() => {
    if (items.length === 0) return null;
    const idx = ((activeIndex % items.length) + items.length) % items.length;
    return items[idx];
  }, [items, activeIndex]);

  const hoveredItem = useMemo(() => {
    if (hoveredIndex === null || items.length === 0) return null;
    const idx = ((hoveredIndex % items.length) + items.length) % items.length;
    return items[idx];
  }, [items, hoveredIndex]);

  // Step rotation helpers
  const handleStep = useCallback((direction: 'prev' | 'next') => {
    if (items.length === 0) return;
    soundFx.playWhoosh(1.4);
    const angleStep = (2 * Math.PI) / items.length;
    const step = direction === 'next' ? -angleStep : angleStep;
    stateRef.current.targetRotation += step;
    stateRef.current.velocity = 0;
  }, [items.length]);

  const handleSelectCard = useCallback((item: Carousel3DItem) => {
    soundFx.playClick(1.2);
    if (variant === 'reels' && item.reelData && onSelectReel) {
      onSelectReel(item.reelData);
    } else if (onOpenLightbox) {
      onOpenLightbox(item.imageUrl, item.title);
    } else if (item.reelData && onSelectReel) {
      onSelectReel(item.reelData);
    }
  }, [variant, onSelectReel, onOpenLightbox]);

  // Main Three.js Lifecycle
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || items.length === 0) return;

    let isDisposed = false;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x18191B, 0.045);

    // 2. Camera setup
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 8.2);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.4);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    mainKeyLight.position.set(4, 7, 6);
    scene.add(mainKeyLight);

    const goldFillLight = new THREE.PointLight(0xe7c456, 3.5, 14);
    goldFillLight.position.set(0, 1.5, 3.5);
    scene.add(goldFillLight);

    const orangeRimLight = new THREE.DirectionalLight(0xe27d26, 1.2);
    orangeRimLight.position.set(-6, -2, -3);
    scene.add(orangeRimLight);

    // 5. Floating Amber Gold Atmospheric Dust Particles
    const particleCount = 110;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      particleScales[i] = Math.random() * 0.8 + 0.2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    // Create circular glow particle canvas texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(246, 219, 133, 1)');
      grad.addColorStop(0.3, 'rgba(231, 196, 86, 0.7)');
      grad.addColorStop(0.8, 'rgba(226, 125, 38, 0.2)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const particleTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.65,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. Build 3D Cylinder / Arc Card Meshes
    const cardMeshes: THREE.Group[] = [];
    const isReel = variant === 'reels';
    
    // Card aspect ratio: 9:16 for reels (e.g. 2.1 x 3.73), 4:5 for lookbook (e.g. 2.5 x 3.125)
    const cardWidth = isReel ? 2.1 : 2.5;
    const cardHeight = isReel ? 3.73 : 3.15;
    
    // Adjust radius based on screen size and item count
    const baseRadius = width < 640 ? 4.6 : width < 1024 ? 5.6 : 6.5;
    stateRef.current.radius = baseRadius;

    // Card plane geometry (segmented for curved luxury cylinder or crisp flat planes)
    const cardPlaneGeo = new THREE.PlaneGeometry(cardWidth, cardHeight, 16, 1);
    const borderPlaneGeo = new THREE.PlaneGeometry(cardWidth + 0.08, cardHeight + 0.08, 1, 1);
    const backPlateGeo = new THREE.PlaneGeometry(cardWidth + 0.06, cardHeight + 0.06, 1, 1);

    // Dark sleek titanium back material
    const backMat = new THREE.MeshStandardMaterial({
      color: 0x141618,
      metalness: 0.85,
      roughness: 0.25,
      side: THREE.BackSide,
    });

    let loadedCount = 0;

    items.forEach((item, index) => {
      const cardGroup = new THREE.Group();
      cardGroup.userData = {
        index,
        item,
        isCard: true,
        baseScale: 1.0,
        currentScale: 1.0,
        targetScale: 1.0,
        glowIntensity: 0.2,
      };

      // Texture
      const texture = getCachedTexture(item.imageUrl, () => {
        loadedCount++;
        if (loadedCount >= Math.min(3, items.length)) {
          setTexturesLoaded(true);
        }
      });

      // Front Face Material
      const frontMat = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.1,
        roughness: 0.35,
        side: THREE.FrontSide,
      });

      // Gold Glowing Border Material
      const borderMat = new THREE.MeshStandardMaterial({
        color: 0xE7C456,
        emissive: 0xE7C456,
        emissiveIntensity: 0.25,
        metalness: 0.9,
        roughness: 0.2,
        side: THREE.DoubleSide,
      });

      // Front Mesh
      const frontMesh = new THREE.Mesh(cardPlaneGeo, frontMat);
      frontMesh.position.z = 0.01;
      frontMesh.userData = { parentGroup: cardGroup, index, item };

      // Border Mesh
      const borderMesh = new THREE.Mesh(borderPlaneGeo, borderMat);
      borderMesh.position.z = 0.0;
      borderMesh.userData = { parentGroup: cardGroup, isBorder: true };

      // Backplate Mesh
      const backMesh = new THREE.Mesh(backPlateGeo, backMat);
      backMesh.position.z = -0.01;

      cardGroup.add(borderMesh);
      cardGroup.add(frontMesh);
      cardGroup.add(backMesh);

      scene.add(cardGroup);
      cardMeshes.push(cardGroup);
    });

    stateRef.current.cardMeshes = cardMeshes;

    // 7. Raycaster for hover & click detection
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    // 8. Interaction Handlers
    const onPointerDown = (e: PointerEvent) => {
      stateRef.current.isPointerDown = true;
      stateRef.current.pointerStartX = e.clientX;
      stateRef.current.pointerStartY = e.clientY;
      stateRef.current.lastPointerX = e.clientX;
      stateRef.current.pointerStartTime = performance.now();
      stateRef.current.lastPointerTime = performance.now();
      stateRef.current.hasMoved = false;
      stateRef.current.velocity = 0;
      setIsDragging(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (stateRef.current.isPointerDown) {
        const deltaX = e.clientX - stateRef.current.lastPointerX;
        const now = performance.now();
        const dt = Math.max(now - stateRef.current.lastPointerTime, 1);

        // Movement threshold check
        const totalDist = Math.hypot(
          e.clientX - stateRef.current.pointerStartX,
          e.clientY - stateRef.current.pointerStartY
        );
        if (totalDist > 5) {
          stateRef.current.hasMoved = true;
        }

        // Drag sensitivity mapped to cylinder radius
        const dragFactor = (Math.PI * 1.8) / (rect.width * 0.9);
        stateRef.current.targetRotation += deltaX * dragFactor;

        // Instant velocity estimation for smooth momentum release
        stateRef.current.velocity = (deltaX * dragFactor) / (dt / 16.66);

        stateRef.current.lastPointerX = e.clientX;
        stateRef.current.lastPointerTime = now;
      } else {
        // Raycasting for hover
        raycaster.setFromCamera(mouseCoord, camera);
        const intersects = raycaster.intersectObjects(cardMeshes, true);
        
        let foundIdx: number | null = null;
        if (intersects.length > 0) {
          const hit = intersects[0];
          // Find root card group
          let current: THREE.Object3D | null = hit.object;
          while (current && !current.userData?.isCard && current.parent) {
            current = current.parent;
          }
          if (current && current.userData?.isCard) {
            foundIdx = current.userData.index;
          }
        }

        stateRef.current.hoveredCardIdx = foundIdx;
        setHoveredIndex(foundIdx);
        canvas.style.cursor = foundIdx !== null ? 'pointer' : 'grab';
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!stateRef.current.isPointerDown) return;
      stateRef.current.isPointerDown = false;
      setIsDragging(false);

      const elapsed = performance.now() - stateRef.current.pointerStartTime;
      const totalDist = Math.hypot(
        e.clientX - stateRef.current.pointerStartX,
        e.clientY - stateRef.current.pointerStartY
      );

      // If it was a clean tap/click without drag
      if (totalDist < 6 && elapsed < 350) {
        const rect = canvas.getBoundingClientRect();
        mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mouseCoord, camera);
        const intersects = raycaster.intersectObjects(cardMeshes, true);
        
        if (intersects.length > 0) {
          let current: THREE.Object3D | null = intersects[0].object;
          while (current && !current.userData?.isCard && current.parent) {
            current = current.parent;
          }
          if (current && current.userData?.isCard) {
            const clickedItem: Carousel3DItem = current.userData.item;
            const clickedIdx: number = current.userData.index;
            
            // Smoothly rotate the clicked card to front center
            const angleStep = (2 * Math.PI) / items.length;
            const targetCardAngle = -clickedIdx * angleStep;
            
            // Normalize closest angle delta
            const twoPi = 2 * Math.PI;
            let diff = (targetCardAngle - stateRef.current.targetRotation) % twoPi;
            if (diff > Math.PI) diff -= twoPi;
            if (diff < -Math.PI) diff += twoPi;
            
            stateRef.current.targetRotation += diff;
            stateRef.current.velocity = 0;

            // Trigger action
            handleSelectCard(clickedItem);
          }
        }
      }

      // Clamp velocity to avoid runaway spinning
      stateRef.current.velocity = THREE.MathUtils.clamp(stateRef.current.velocity, -0.12, 0.12);
    };

    const onWheel = (e: WheelEvent) => {
      // Prevent default page scroll only when user actively scrolls over the 3D gallery
      e.preventDefault();
      const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 0.0016;
      stateRef.current.targetRotation -= delta;
      stateRef.current.velocity = 0;
    };

    const onMouseEnter = () => {
      stateRef.current.isHoveringCanvas = true;
    };

    const onMouseLeave = () => {
      stateRef.current.isHoveringCanvas = false;
      stateRef.current.hoveredCardIdx = null;
      setHoveredIndex(null);
      if (stateRef.current.isPointerDown) {
        stateRef.current.isPointerDown = false;
        setIsDragging(false);
      }
    };

    // Attach canvas listeners
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('mouseenter', onMouseEnter);
    canvas.addEventListener('mouseleave', onMouseLeave);

    // 9. Resize Observer for dynamic, responsive dimensions
    const handleResize = () => {
      if (!container || !renderer || isDisposed) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      
      // Dynamic camera distance & radius tuning
      if (w < 640) {
        camera.position.z = 7.4;
        stateRef.current.radius = 4.4;
      } else if (w < 1024) {
        camera.position.z = 7.8;
        stateRef.current.radius = 5.4;
      } else {
        camera.position.z = 8.2;
        stateRef.current.radius = 6.4;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 10. WebGL Context Loss Handlers
    const onContextLost = (e: Event) => {
      e.preventDefault();
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId);
      }
    };

    const onContextRestored = () => {
      handleResize();
    };

    canvas.addEventListener('webglcontextlost', onContextLost, false);
    canvas.addEventListener('webglcontextrestored', onContextRestored, false);

    // 11. Animation Loop (60-120fps Smooth Lerp)
    let lastTime = performance.now();
    let prevActiveCenterIdx = -1;

    const animate = (time: number) => {
      if (isDisposed) return;
      stateRef.current.rafId = requestAnimationFrame(animate);

      const deltaSeconds = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Gentle continuous auto-spin when idle and auto-spin is ON
      if (
        stateRef.current.autoSpin && 
        !stateRef.current.isPointerDown && 
        !stateRef.current.isHoveringCanvas
      ) {
        stateRef.current.targetRotation += 0.0022;
      }

      // Apply drag inertia / momentum decay
      if (!stateRef.current.isPointerDown && Math.abs(stateRef.current.velocity) > 0.0001) {
        stateRef.current.targetRotation += stateRef.current.velocity;
        stateRef.current.velocity *= 0.93; // smooth damping
      }

      // Smooth lerp of currentRotation towards targetRotation
      stateRef.current.currentRotation += (stateRef.current.targetRotation - stateRef.current.currentRotation) * 0.085;

      const rot = stateRef.current.currentRotation;
      const count = items.length;
      const angleStep = (2 * Math.PI) / count;
      const radius = stateRef.current.radius;

      // Subtle atmospheric particle drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.003;
        if (positions[i * 3 + 1] > 5) positions[i * 3 + 1] = -5;
      }
      particleGeo.attributes.position.needsUpdate = true;
      particleSystem.rotation.y = rot * 0.2;

      // Position each card along the 3D cylindrical arc
      let bestCenterIdx = 0;
      let minAngularDist = Infinity;

      cardMeshes.forEach((group, idx) => {
        const baseAngle = idx * angleStep;
        const currentAngle = baseAngle + rot;

        // Position on 3D cylinder
        const x = Math.sin(currentAngle) * radius;
        // Offset Z so front cards face the camera and rear cards recede gracefully
        const z = Math.cos(currentAngle) * radius - (radius - 1.2);
        const y = Math.sin(currentAngle * 2 + time * 0.001) * 0.08; // subtle organic levitation

        group.position.set(x, y, z);
        group.rotation.y = currentAngle;

        // Find angular distance to front center (angle closest to 0 mod 2PI)
        const normalizedAngle = ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const angleDiff = Math.min(normalizedAngle, 2 * Math.PI - normalizedAngle);

        if (angleDiff < minAngularDist) {
          minAngularDist = angleDiff;
          bestCenterIdx = idx;
        }

        // Hover & Center Focus Scaling
        const isHovered = stateRef.current.hoveredCardIdx === idx;
        const isCenter = angleDiff < angleStep * 0.45;

        const targetScale = isHovered ? 1.12 : isCenter ? 1.04 : 0.94;
        group.userData.targetScale = targetScale;
        group.userData.currentScale += (targetScale - group.userData.currentScale) * 0.12;
        group.scale.setScalar(group.userData.currentScale);

        // Gold Rim Illumination intensity
        const targetGlow = isHovered ? 1.4 : isCenter ? 0.7 : 0.2;
        group.userData.glowIntensity += (targetGlow - group.userData.glowIntensity) * 0.12;

        const borderMesh = group.children.find(c => c.userData.isBorder) as THREE.Mesh | undefined;
        if (borderMesh && borderMesh.material) {
          const bMat = borderMesh.material as THREE.MeshStandardMaterial;
          bMat.emissiveIntensity = group.userData.glowIntensity;
        }
      });

      // Update active center card index in state for UI HUD (throttled)
      if (bestCenterIdx !== prevActiveCenterIdx) {
        prevActiveCenterIdx = bestCenterIdx;
        setActiveIndex(bestCenterIdx);
      }

      renderer.render(scene, camera);
    };

    stateRef.current.rafId = requestAnimationFrame(animate);

    // 12. Complete Cleanup & Disposal on unmount
    return () => {
      isDisposed = true;
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId);
      }

      resizeObserver.disconnect();

      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('mouseenter', onMouseEnter);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);

      // Dispose Three.js objects
      cardPlaneGeo.dispose();
      borderPlaneGeo.dispose();
      backPlateGeo.dispose();
      backMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTex.dispose();

      cardMeshes.forEach(group => {
        group.traverse(obj => {
          if (obj instanceof THREE.Mesh) {
            if (obj.geometry) obj.geometry.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach(m => m.dispose());
            } else if (obj.material) {
              obj.material.dispose();
            }
          }
        });
        scene.remove(group);
      });

      renderer.dispose();
    };
  }, [items, variant, handleSelectCard]);

  // If WebGL is not supported, provide elegant fallback
  if (!webglSupported) {
    return (
      <div className={`w-full rounded-3xl glass-warm p-8 text-center flex flex-col items-center justify-center border border-white/10 ${heightClass}`}>
        <Rotate3d className="w-12 h-12 text-[#E7C456] mb-4 animate-bounce" />
        <h3 className="text-xl font-serif font-bold text-white mb-2">3D Acceleration Unavailable</h3>
        <p className="text-sm text-stone-300 max-w-md mb-6">
          Your browser does not currently support WebGL hardware acceleration. You can view the full curated archives in standard high-definition view.
        </p>
        {onToggleViewMode && (
          <button
            onClick={onToggleViewMode}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E7C456] to-[#E27D26] text-stone-950 font-bold text-xs uppercase tracking-wider"
          >
            Switch to Grid Mode
          </button>
        )}
      </div>
    );
  }

  const currentDisplayItem = hoveredItem || activeItem;

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden glass-apple border border-white/10 select-none ${heightClass} ${className}`}>
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none cursor-grab active:cursor-grabbing"
      />

      {/* Atmospheric Ambient Glow Backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#18191B]/90 via-transparent to-[#18191B]/40" />

      {/* Top Floating Glass Control & Status Header */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none z-20">
        {/* Left: Badge / Mode Indicator */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 text-[#F6DB85] shadow-lg">
            <Compass className="w-3.5 h-3.5 text-[#E7C456] animate-spin" style={{ animationDuration: '12s' }} />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              {badgeText || (variant === 'reels' ? '3D Video Orbit' : '3D Spatial Cylinder')}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 text-stone-300 text-[10px] font-mono">
            <Sparkles className="w-3 h-3 text-[#E7C456]" />
            <span>Orbit & Explore</span>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Auto Spin Toggle */}
          <button
            onClick={() => {
              soundFx.playClick(1.0);
              setIsAutoSpinning(prev => !prev);
            }}
            title={isAutoSpinning ? 'Pause Auto-Spin' : 'Resume Auto-Spin'}
            className={`px-3 py-1.5 rounded-full backdrop-blur-xl border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
              isAutoSpinning 
                ? 'bg-[#E7C456]/20 border-[#E7C456]/50 text-[#F6DB85]' 
                : 'bg-black/60 border-white/15 text-stone-300 hover:text-white hover:border-white/30'
            }`}
          >
            {isAutoSpinning ? (
              <>
                <Pause className="w-3 h-3 text-[#E7C456]" />
                <span className="hidden sm:inline text-[11px]">Auto Orbit</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-stone-300 translate-x-0.5" />
                <span className="hidden sm:inline text-[11px]">Paused</span>
              </>
            )}
          </button>

          {/* View Mode Toggle (3D vs Grid) */}
          {onToggleViewMode && (
            <button
              onClick={() => {
                soundFx.playWhoosh(1.3);
                onToggleViewMode();
              }}
              className="px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-xl border border-white/15 hover:border-[#E7C456]/60 text-stone-200 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md group"
            >
              <Grid className="w-3.5 h-3.5 text-[#E7C456] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-[11px]">Masonry View</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating Center / Active Item HUD (Bottom Center) */}
      {currentDisplayItem && (
        <div className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-auto sm:left-1/2 sm:-translate-x-1/2 max-w-xl w-full pointer-events-none z-20 transition-all duration-300">
          <div className="pointer-events-auto p-4 sm:p-5 rounded-2xl sm:rounded-3xl glass-apple border border-white/20 shadow-2xl space-y-3 bg-[#18191B]/85 backdrop-blur-2xl">
            {/* Top row: Counter & Category Badge */}
            <div className="flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E7C456]/20 border border-[#E7C456]/40 text-[#F6DB85] font-bold uppercase tracking-wider text-[10px]">
                  {currentDisplayItem.badge || currentDisplayItem.category || (variant === 'reels' ? 'FEATURED REEL' : 'EDITORIAL ARCHIVE')}
                </span>
                {currentDisplayItem.duration && (
                  <span className="px-2 py-0.5 rounded bg-white/10 text-stone-300 text-[10px]">
                    {currentDisplayItem.duration}
                  </span>
                )}
              </div>

              <span className="text-stone-400 font-bold text-[11px]">
                {String(((activeIndex % items.length) + items.length) % items.length + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
            </div>

            {/* Middle row: Title & Action Button */}
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5 min-w-0">
                <h3 className="font-serif text-base sm:text-lg font-bold text-white truncate tracking-tight">
                  {currentDisplayItem.title}
                </h3>
                {currentDisplayItem.caption && (
                  <p className="text-xs text-stone-300 line-clamp-1">
                    {currentDisplayItem.caption}
                  </p>
                )}
                {variant === 'reels' && currentDisplayItem.audioTrack && (
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#F6DB85] truncate">
                    <Volume2 className="w-3 h-3 shrink-0" />
                    <span className="truncate">{currentDisplayItem.audioTrack}</span>
                  </div>
                )}
              </div>

              {/* Inspect / Play Button */}
              <button
                onClick={() => handleSelectCard(currentDisplayItem)}
                className="shrink-0 px-4 py-2 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] hover:brightness-110 text-stone-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-warm-glow transition-all hover:scale-105 active:scale-95"
              >
                {variant === 'reels' ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-stone-950 translate-x-0.5" />
                    <span>Play</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand</span>
                  </>
                )}
              </button>
            </div>

            {/* Engagement Stats row for reels */}
            {variant === 'reels' && currentDisplayItem.views && (
              <div className="flex items-center gap-4 pt-1 border-t border-white/10 text-[11px] font-mono text-stone-300">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-[#E7C456]" />
                  <span>{currentDisplayItem.views} views</span>
                </span>
                {currentDisplayItem.likes && (
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                    <span>{currentDisplayItem.likes} likes</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Left & Right Step Orbit Controls */}
      <div className="absolute bottom-6 left-6 hidden lg:flex items-center gap-2 pointer-events-auto z-20">
        <button
          onClick={() => handleStep('prev')}
          aria-label="Previous Slide"
          className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#E7C456] hover:text-stone-950 backdrop-blur-xl border border-white/15 hover:border-[#E7C456] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleStep('next')}
          aria-label="Next Slide"
          className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#E7C456] hover:text-stone-950 backdrop-blur-xl border border-white/15 hover:border-[#E7C456] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Floating Interaction Hint (Centered on top or subtle) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none hidden md:block text-[10px] font-mono text-stone-400 tracking-wider">
        ↔ Drag horizontally to orbit • Mouse wheel to scrub • Click to inspect
      </div>
    </div>
  );
};

export default ThreeDLookbookCarousel;
