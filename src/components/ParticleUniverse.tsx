"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * AI PARTICLE UNIVERSE
 *
 * 5000+ GPU-rendered particles in 3D space.
 * Behaviors:
 *  - Form different shapes (sphere, cube, KC monogram, torus, spiral)
 *  - Morph between shapes every ~6 seconds automatically
 *  - React to mouse cursor (push away with falloff)
 *  - Slow auto-rotation for ambient motion
 *  - Theme-aware colors (read CSS vars on mount + theme change)
 *
 * Performance:
 *  - Single THREE.Points object with custom shader
 *  - GPU-side morph (no per-frame CPU work besides uniforms)
 *  - Reduced particle count on mobile (auto-detected)
 *  - Caps DPR at 2 to avoid retina display tax
 */
export default function ParticleUniverse() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const PARTICLE_COUNT = isMobile ? 2500 : 5000;

    // ─── Scene setup ─────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ─── Generate target positions for each shape ─────────────────────────────────────────
    const shapes: Float32Array[] = [];

    // Shape 0: Sphere
    const sphere = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 3.5 + (Math.random() - 0.5) * 0.2;
      sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      sphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sphere[i * 3 + 2] = r * Math.cos(phi);
    }
    shapes.push(sphere);

    // Shape 1: Cube wireframe (particles on edges)
    const cube = new Float32Array(PARTICLE_COUNT * 3);
    const cubeS = 3;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const edge = Math.floor(Math.random() * 12);
      const t = Math.random();
      const corners: [number, number, number][] = [
        [-cubeS, -cubeS, -cubeS], [cubeS, -cubeS, -cubeS], [cubeS, cubeS, -cubeS], [-cubeS, cubeS, -cubeS],
        [-cubeS, -cubeS, cubeS], [cubeS, -cubeS, cubeS], [cubeS, cubeS, cubeS], [-cubeS, cubeS, cubeS],
      ];
      const edges: [number, number][] = [
        [0,1],[1,2],[2,3],[3,0],
        [4,5],[5,6],[6,7],[7,4],
        [0,4],[1,5],[2,6],[3,7],
      ];
      const [a, b] = edges[edge];
      const p1 = corners[a]; const p2 = corners[b];
      cube[i * 3]     = p1[0] + (p2[0] - p1[0]) * t + (Math.random() - 0.5) * 0.08;
      cube[i * 3 + 1] = p1[1] + (p2[1] - p1[1]) * t + (Math.random() - 0.5) * 0.08;
      cube[i * 3 + 2] = p1[2] + (p2[2] - p1[2]) * t + (Math.random() - 0.5) * 0.08;
    }
    shapes.push(cube);

    // Shape 2: Torus (donut)
    const torus = new Float32Array(PARTICLE_COUNT * 3);
    const R = 3.0; // major radius
    const r = 0.8; // minor radius
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      torus[i * 3]     = (R + r * Math.cos(v)) * Math.cos(u);
      torus[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
      torus[i * 3 + 2] = r * Math.sin(v);
    }
    shapes.push(torus);

    // Shape 3: Galaxy spiral (5 arms)
    const galaxy = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const arm = i % 5;
      const t = Math.pow(Math.random(), 0.5);
      const radius = t * 4.5;
      const angle = (arm / 5) * Math.PI * 2 + radius * 1.2;
      const wobble = (Math.random() - 0.5) * (1 - t) * 0.6;
      galaxy[i * 3]     = Math.cos(angle) * radius + wobble;
      galaxy[i * 3 + 1] = (Math.random() - 0.5) * 0.4 * (1 - t);
      galaxy[i * 3 + 2] = Math.sin(angle) * radius + wobble;
    }
    shapes.push(galaxy);

    // Shape 4: KC monogram (text rendered to canvas, sampled to particles)
    const kc = new Float32Array(PARTICLE_COUNT * 3);
    {
      const cv = document.createElement("canvas");
      cv.width = 256; cv.height = 128;
      const cvCtx = cv.getContext("2d")!;
      cvCtx.fillStyle = "#fff";
      cvCtx.font = "bold 110px Arial Black, sans-serif";
      cvCtx.textAlign = "center";
      cvCtx.textBaseline = "middle";
      cvCtx.fillText("KC", 128, 70);
      const data = cvCtx.getImageData(0, 0, cv.width, cv.height).data;
      const points: [number, number][] = [];
      for (let y = 0; y < cv.height; y += 1) {
        for (let x = 0; x < cv.width; x += 1) {
          const i = (y * cv.width + x) * 4;
          if (data[i + 3] > 128) points.push([x, y]);
        }
      }
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = points[Math.floor(Math.random() * points.length)] || [128, 64];
        kc[i * 3]     = (p[0] - 128) / 28;          // ~9 wide
        kc[i * 3 + 1] = -(p[1] - 64) / 28 + 0.3;
        kc[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      }
    }
    shapes.push(kc);

    // ─── BufferGeometry with custom shader for morphing ─────────────────────────────────────────
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(shapes[0], 3));     // current
    geometry.setAttribute("targetPosition", new THREE.BufferAttribute(shapes[1], 3)); // next
    // random offset per particle to stagger morph timing
    const offsets = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) offsets[i] = Math.random();
    geometry.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));

    const uniforms = {
      uTime:        { value: 0 },
      uMorph:       { value: 0 },
      uMouse:       { value: new THREE.Vector3(0, 0, 4) },
      uMouseStrength: { value: 0 },
      uPointSize:   { value: isMobile ? 4.5 : 6.0 },
      uColorA:      { value: new THREE.Color(0x00ffff) },
      uColorB:      { value: new THREE.Color(0xff00c8) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute vec3 targetPosition;
        attribute float aOffset;
        uniform float uTime;
        uniform float uMorph;
        uniform vec3 uMouse;
        uniform float uMouseStrength;
        uniform float uPointSize;
        varying float vDist;
        varying float vDepth;

        void main() {
          // Stagger morph by particle offset for an organic effect
          float morph = clamp((uMorph - aOffset * 0.4) * 1.4, 0.0, 1.0);
          // Smooth ease
          morph = morph * morph * (3.0 - 2.0 * morph);

          vec3 pos = mix(position, targetPosition, morph);

          // Subtle wobble
          pos.x += sin(uTime * 0.5 + aOffset * 6.28) * 0.04;
          pos.y += cos(uTime * 0.4 + aOffset * 6.28) * 0.04;

          // Mouse repulsion
          vec3 toMouse = pos - uMouse;
          float md = length(toMouse);
          float push = exp(-md * 0.7) * uMouseStrength;
          pos += normalize(toMouse + vec3(0.001)) * push * 1.2;

          vDist = morph;

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          vDepth = -mv.z;
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uPointSize * (200.0 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying float vDist;
        varying float vDepth;
        void main() {
          // Soft circular point
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d);

          // Mix two theme colors based on morph progress + slight depth shading
          vec3 col = mix(uColorA, uColorB, vDist * 0.7);
          col *= 0.5 + 0.5 * exp(-vDepth * 0.05);

          gl_FragColor = vec4(col, alpha * 0.9);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ─── Theme color reading ─────────────────────────────────────────
    const themeColors: Record<string, [number, number]> = {
      neon:    [0x00ffff, 0xff00c8],
      nothing: [0xff0033, 0xffffff],
      elegant: [0xd4af6e, 0xf5f1e8],
      classic: [0x8b1a1a, 0x2a1a0a],
      glass:   [0xb8d4ff, 0xffd4f0],
      game:    [0x00ff66, 0xff00ff],
    };
    const applyTheme = () => {
      const t = document.documentElement.getAttribute("data-theme") || "neon";
      const [a, b] = themeColors[t] || themeColors.neon;
      uniforms.uColorA.value.setHex(a);
      uniforms.uColorB.value.setHex(b);
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // ─── Mouse tracking ─────────────────────────────────────────
    const targetMouse = new THREE.Vector3(0, 0, 4);
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetMouse.set(x * 5, y * 5, 4);
      uniforms.uMouseStrength.value = Math.min(uniforms.uMouseStrength.value + 0.05, 1.5);
    };
    const onPointerLeave = () => { uniforms.uMouseStrength.value = 0; };
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);

    // ─── Resize ─────────────────────────────────────────
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ─── Auto-morph state machine ─────────────────────────────────────────
    let currentShape = 0;
    let nextShape = 1;
    let morphProgress = 0;
    let lastMorphTime = performance.now();
    const MORPH_DURATION = 2500;   // ms to interpolate
    const HOLD_DURATION  = 4000;   // ms to hold a shape

    const triggerMorph = () => {
      // Move geometry: target → current, pick new target
      currentShape = nextShape;
      nextShape = (nextShape + 1) % shapes.length;
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const tgtAttr = geometry.getAttribute("targetPosition") as THREE.BufferAttribute;
      // Snap position to where we landed (the previous target)
      posAttr.array.set(shapes[currentShape]);
      tgtAttr.array.set(shapes[nextShape]);
      posAttr.needsUpdate = true;
      tgtAttr.needsUpdate = true;
      morphProgress = 0;
      uniforms.uMorph.value = 0;
      lastMorphTime = performance.now();
    };

    // ─── Render loop ─────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf: number;
    const tick = () => {
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;

      // Mouse smoothing
      uniforms.uMouse.value.lerp(targetMouse, 0.08);
      uniforms.uMouseStrength.value *= 0.95;

      // Morph progression
      const elapsed = performance.now() - lastMorphTime;
      if (morphProgress < 1 && elapsed > HOLD_DURATION) {
        morphProgress = Math.min(1, (elapsed - HOLD_DURATION) / MORPH_DURATION);
        uniforms.uMorph.value = morphProgress;
        if (morphProgress >= 1) {
          // After fully morphed, schedule next morph
          setTimeout(triggerMorph, HOLD_DURATION);
        }
      }

      // Slow rotation for ambient motion
      points.rotation.y += dt * 0.05;
      points.rotation.x = Math.sin(t * 0.15) * 0.1;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    // ─── Cleanup ─────────────────────────────────────────
    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      ro.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };

    return () => { cleanupRef.current?.(); };
  }, []);

  return <div ref={mountRef} className="particle-universe" aria-hidden="true" />;
}
