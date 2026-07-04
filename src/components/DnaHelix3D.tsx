import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
/**
 * A 3D animated DNA double-helix rendered with raw Three.js.
 * Uses physically-based materials, image-based lighting (RoomEnvironment),
 * filmic tone mapping and a subtle bloom pass so the strands read as polished
 * glass/metal nucleotides rather than flat plastic. Cyan accent for GENESIS X.
 */
export function DnaHelix3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    /* FIX: Updated accent + background to match the new bright theme
       (#0EA5C7 accent on a light page). Slightly reduces emissive to
       keep the helix readable on white. */
    const ACCENT = 0x0ea5c7;
    const SECONDARY = 0x6b7c93;
    const BG = 0xf4f8fb;
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    // --- Scene / Camera ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(BG, 16, 30);
    // Camera FOV + distance chosen so the helix fills ~75% of the
    // container's short axis, looking balanced on both 3:4 (portrait) and
    // wider hero frames.
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16.5);
    // --- Image-based lighting for realistic reflections ---
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    // --- Punctual lights for highlights ---
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);
    const cyanFill = new THREE.PointLight(ACCENT, 40, 60);
    cyanFill.position.set(-8, -2, 6);
    scene.add(cyanFill);
    const rimLight = new THREE.DirectionalLight(ACCENT, 0.8);
    rimLight.position.set(-6, 4, -8);
    scene.add(rimLight);
    // --- Helix group ---
    const helix = new THREE.Group();
    scene.add(helix);
    const TURNS = 3;
    const RUNGS = 32;
    const RADIUS = 2.1;
    const HEIGHT = 13;
    const sphereGeo = new THREE.SphereGeometry(1, 48, 48);
    const rungGeo = new THREE.CylinderGeometry(0.05, 0.05, 1, 16);
    // Glossy cyan nucleotide — low emissive so it reads as a polished bead,
    // not a flat self-lit ball. Clearcoat adds a wet, realistic sheen.
    const accentMat = new THREE.MeshPhysicalMaterial({
      color: ACCENT,
      metalness: 0.15,
      roughness: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12,
      emissive: ACCENT,
      emissiveIntensity: 0.08,
      envMapIntensity: 1.2
    });
    // Brushed-metal secondary strand for contrast/depth.
    const secondaryMat = new THREE.MeshPhysicalMaterial({
      color: SECONDARY,
      metalness: 0.85,
      roughness: 0.35,
      clearcoat: 0.4,
      clearcoatRoughness: 0.3,
      envMapIntensity: 1.0
    });
    // Translucent glassy rung.
    const rungMat = new THREE.MeshPhysicalMaterial({
      color: 0xbfe9f5,
      metalness: 0.0,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 0.5,
      transparent: true,
      opacity: 0.7,
      emissive: ACCENT,
      emissiveIntensity: 0.05,
      envMapIntensity: 1.2
    });
    for (let i = 0; i < RUNGS; i++) {
      const t = i / (RUNGS - 1);
      const angle = t * Math.PI * 2 * TURNS;
      const y = (t - 0.5) * HEIGHT;
      const x1 = Math.cos(angle) * RADIUS;
      const z1 = Math.sin(angle) * RADIUS;
      const x2 = Math.cos(angle + Math.PI) * RADIUS;
      const z2 = Math.sin(angle + Math.PI) * RADIUS;
      // Subtle size variation makes the beads feel organic, not machined.
      const s1 = 0.3 + Math.sin(i * 1.7) * 0.03;
      const s2 = 0.3 + Math.cos(i * 1.3) * 0.03;
      const a = new THREE.Mesh(sphereGeo, accentMat);
      a.position.set(x1, y, z1);
      a.scale.setScalar(s1);
      helix.add(a);
      const b = new THREE.Mesh(sphereGeo, secondaryMat);
      b.position.set(x2, y, z2);
      b.scale.setScalar(s2);
      helix.add(b);
      // Connecting base-pair rung
      const start = new THREE.Vector3(x1, y, z1);
      const end = new THREE.Vector3(x2, y, z2);
      const rung = new THREE.Mesh(rungGeo, rungMat);
      const dist = start.distanceTo(end);
      rung.scale.set(1, dist, 1);
      rung.position.copy(start).add(end).multiplyScalar(0.5);
      rung.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        end.clone().sub(start).normalize()
      );
      helix.add(rung);
    }
    helix.rotation.z = 0.16;
    // --- Post-processing: subtle bloom on the bright cyan highlights ---
    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    composer.setSize(width, height);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.4,
      // strength
      0.5,
      // radius
      0.85
    );
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
    // --- Animation loop ---
    let frameId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      helix.rotation.y = elapsed * 0.45;
      helix.position.y = Math.sin(elapsed * 0.7) * 0.22;
      composer.render();
      frameId = requestAnimationFrame(animate);
    };
    animate();
    // --- Resize handling ---
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);
    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      sphereGeo.dispose();
      rungGeo.dispose();
      accentMat.dispose();
      secondaryMat.dispose();
      rungMat.dispose();
      envTex.dispose();
      pmrem.dispose();
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] bg-accent/15 rounded-full blur-[110px] pointer-events-none" />
      <div
        ref={mountRef}
        className="relative z-10 w-full h-full"
        aria-hidden="true" />

    </div>);

}