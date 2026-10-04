import React, { useEffect, useRef, useState } from 'react';

interface LiquidLogoProps {
  size?: number;
  className?: string;
  glyph?: 'A' | 'AKRATI' | 'CREST';
  interactive?: boolean;
}

export const LiquidLogo: React.FC<LiquidLogoProps> = ({
  size = 48,
  className = '',
  glyph = 'A',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);
  hoverRef.current = isHovered;
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, active: 0.0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try WebGL2 first, fallback to WebGL
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        vUv.y = 1.0 - vUv.y; // Flip Y for standard coordinates
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // High-end Molten Gold & Liquid Chrome Shader
    const fragmentShaderSource = `
      precision highp float;
      varying vec2 vUv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_hover;
      uniform int u_glyph;

      // SDF for Serif Letter 'A' and luxury crest
      float sdCircle(vec2 p, float r) {
        return length(p) - r;
      }

      float sdBox(vec2 p, vec2 b) {
        vec2 d = abs(p) - b;
        return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
      }

      float sdSegment(vec2 p, vec2 a, vec2 b) {
        vec2 pa = p - a, ba = b - a;
        float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        return length(pa - ba * h);
      }

      // Elegant 'A' Monogram Distance Field
      float sdMonogramA(vec2 p) {
        p.y += 0.04;
        // Left leg
        float d1 = sdSegment(p, vec2(-0.28, -0.36), vec2(0.0, 0.38)) - 0.045;
        // Right leg
        float d2 = sdSegment(p, vec2(0.28, -0.36), vec2(0.0, 0.38)) - 0.045;
        // Crossbar
        float d3 = sdSegment(p, vec2(-0.16, -0.06), vec2(0.16, -0.06)) - 0.035;
        // Apex serif cap
        float d4 = sdBox(p - vec2(0.0, 0.38), vec2(0.07, 0.02)) - 0.02;
        // Left foot serif
        float d5 = sdBox(p - vec2(-0.28, -0.36), vec2(0.09, 0.02)) - 0.02;
        // Right foot serif
        float d6 = sdBox(p - vec2(0.28, -0.36), vec2(0.09, 0.02)) - 0.02;

        return min(min(min(d1, d2), d3), min(d4, min(d5, d6)));
      }

      // Smooth noise turbulence function (Domain Warping Plasma)
      float fluidPattern(vec2 uv, float t, vec2 mouse) {
        vec2 p = uv * 3.5;
        
        // Interactive mouse distortion wave
        float distToMouse = length(uv - mouse);
        float mouseWave = sin(distToMouse * 18.0 - t * 4.0) * exp(-distToMouse * 3.5) * (0.35 + u_hover * 0.4);
        
        p += vec2(mouseWave * (uv.x - mouse.x), mouseWave * (uv.y - mouse.y));

        // Domain warping passes
        vec2 q = vec2(
          sin(p.x * 2.2 + t * 0.7) + cos(p.y * 1.8 + t * 0.5),
          cos(p.x * 1.9 - t * 0.6) + sin(p.y * 2.4 + t * 0.8)
        );

        vec2 r = vec2(
          sin(p.x * 3.1 + q.x * 2.8 + t * 0.9 + mouse.x * 2.0),
          cos(p.y * 3.4 + q.y * 2.6 - t * 0.8 + mouse.y * 2.0)
        );

        float f = sin(p.x + r.x * 2.0 + t * 0.5) * cos(p.y + r.y * 2.0 - t * 0.4);
        return f * 0.5 + 0.5;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Calculate Monogram & Outer Crest Distance Fields
        float dLetter = sdMonogramA(p);
        float dRing = abs(sdCircle(p, 0.46)) - 0.025;
        float dInnerAccent = abs(sdCircle(p, 0.41)) - 0.008;
        
        float shapeDist = min(dLetter, min(dRing, dInnerAccent));
        
        // Anti-aliased shape mask
        float pixelSize = 1.5 / min(u_resolution.x, u_resolution.y);
        float shapeAlpha = 1.0 - smoothstep(0.0, pixelSize, shapeDist);

        if (shapeAlpha < 0.01) {
          gl_FragColor = vec4(0.0);
          return;
        }

        // Fluid normal calculation for 3D metallic refraction & lighting
        float t = u_time * 0.9;
        float eps = 0.015;
        float hC = fluidPattern(uv, t, u_mouse);
        float hR = fluidPattern(uv + vec2(eps, 0.0), t, u_mouse);
        float hT = fluidPattern(uv + vec2(0.0, eps), t, u_mouse);

        vec3 normal = normalize(vec3((hC - hR) * 3.5, (hC - hT) * 3.5, 0.85));

        // Light sources: Key sunlit gold + ambient sunset fill + top specular rim
        vec3 lightKey = normalize(vec3(0.5, 0.8, 1.2));
        vec3 lightFill = normalize(vec3(-0.7, -0.4, 0.8));
        vec3 viewDir = vec3(0.0, 0.0, 1.0);

        // Diffuse & Specular (Blinn-Phong)
        float diffKey = max(dot(normal, lightKey), 0.0);
        float diffFill = max(dot(normal, lightFill), 0.0);

        vec3 halfKey = normalize(lightKey + viewDir);
        float specKey = pow(max(dot(normal, halfKey), 0.0), 32.0);

        // Fresnel edge glow for liquid mercury / molten rim
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.5);

        // Color Palette: Mineral Graphite (#18191B), Sunlit Gold (#E7C456), Sunset Amber (#E27D26), Platinum Shine (#FFF8E1)
        vec3 colDeepBronze = vec3(0.24, 0.14, 0.04);
        vec3 colSunset = vec3(0.89, 0.49, 0.15);
        vec3 colSunGold = vec3(0.91, 0.77, 0.34);
        vec3 colChampagne = vec3(1.0, 0.96, 0.85);

        // Blend colors across fluid height and lighting
        vec3 metalColor = mix(colDeepBronze, colSunset, smoothstep(0.1, 0.55, hC));
        metalColor = mix(metalColor, colSunGold, smoothstep(0.45, 0.85, hC + diffKey * 0.4));
        metalColor += colChampagne * (specKey * 0.9 + fresnel * 0.45);

        // Outer edge bevel highlight
        float edgeBevel = smoothstep(-0.04, 0.0, shapeDist) * (1.0 - smoothstep(0.0, 0.02, shapeDist));
        metalColor += colChampagne * edgeBevel * 0.5;

        gl_FragColor = vec4(metalColor * shapeAlpha, shapeAlpha);
      }
    `;

    // Compile Helper
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = createShader(gl as WebGLRenderingContext, gl.VERTEX_SHADER, vertexShaderSource);
    const frag = createShader(gl as WebGLRenderingContext, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uHover = gl.getUniformLocation(program, 'u_hover');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let animationId: number;
    let startTime = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startTime) * 0.001;
      
      // Smooth mouse lerp
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;
      mouse.active += ((hoverRef.current ? 1.0 : 0.0) - mouse.active) * 0.08;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uHover, mouse.active);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (program) gl.deleteProgram(program);
    };
  }, [size, glyph]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none cursor-pointer transition-transform duration-300 ${
        isHovered ? 'scale-105' : ''
      } ${className}`}
      style={{ width: size, height: size }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseRef.current.targetX = 0.5;
        mouseRef.current.targetY = 0.5;
      }}
    >
      {/* Radiant backlight halo */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-40 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(231,196,86,0.6) 0%, rgba(226,125,38,0.2) 60%, transparent 80%)',
          transform: isHovered ? 'scale(1.3)' : 'scale(1.0)',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="relative z-10 block pointer-events-none"
      />
    </div>
  );
};
