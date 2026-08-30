import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import type { PillarScore } from "../lib/blueprintDeliverable";

/**
 * The Gap Map: a radial network view of the seven Readiness Check pillars,
 * rendered as an actual lit 3D scene (real geometry, real lighting, real
 * bloom) rather than a flat SVG diagram. Seven faceted status "gems" orbit a
 * partial-ring readiness dial, tilted toward the viewer for genuine depth.
 * Colored by live exposure level, so the map itself is a talking point
 * during the sit-down as statuses get tapped in.
 *
 * The canvas renders to a WebGL context with preserveDrawingBuffer so it can
 * be captured with a plain canvas.toDataURL() call (see gapMapToPng below)
 * and dropped straight into the PDF deliverable, no separate rasterization
 * pass required.
 */

/** Shared with BlueprintSessionPage's checkpoint status chips, so the live
 * handled/partial/exposed labels use the exact same palette as the map
 * itself instead of an independently-chosen set of colors. */
export const STATUS_COLORS = {
  strong: "#3da977",
  watch: "#d9a441",
  exposed: "#b3413a",
  unassessed: "#6b675e",
} as const;

function nodeColor(s: PillarScore): string {
  if (s.assessed === 0) return STATUS_COLORS.unassessed;
  if (s.riskPct >= 60) return STATUS_COLORS.exposed;
  if (s.riskPct >= 30) return STATUS_COLORS.watch;
  return STATUS_COLORS.strong;
}

function statusWord(s: PillarScore): string {
  if (s.assessed === 0) return "Not assessed";
  if (s.riskPct >= 60) return "Exposed";
  if (s.riskPct >= 30) return "Watch";
  return "Strong";
}

/** Two-line label splitting for the longer pillar titles. */
function labelLines(title: string): string[] {
  if (title.length <= 14) return [title];
  const at = title.indexOf(" & ");
  if (at > 0) return [title.slice(0, at + 2), title.slice(at + 3)];
  return [title];
}

interface GapMapVisualProps {
  scores: PillarScore[];
  /** Overall readiness 0-100 (already computed from the scores). */
  readiness: number;
}

/** Draws text to an offscreen canvas at a high, oversampled resolution and
 * wraps it as a billboarded Three.js sprite, so labels stay crisp and always
 * face the camera regardless of the scene's tilt. `size` is the target
 * world-unit height of one line of text; letterSpacing is in raster px. */
function makeTextSprite(
  lines: string[],
  opts: {
    size: number;
    color: string;
    weight?: number;
    letterSpacing?: number;
    /** Dark stroke drawn behind the fill so text stays legible sitting on
     * top of the gem glow / bloom instead of washing out into it. On by
     * default; the dial's own center numerals sit over a near-black cap
     * already, so they skip it rather than pay the extra draw for nothing. */
    outline?: boolean;
  },
): THREE.Sprite {
  const RENDER_PX = 72;
  const weight = opts.weight ?? 400;
  const spacing = opts.letterSpacing ?? 0;
  const outline = opts.outline ?? true;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const font = `${weight} ${RENDER_PX}px 'Crimson Pro', Georgia, serif`;
  ctx.font = font;

  const measureLine = (l: string) => {
    if (!spacing) return ctx.measureText(l).width;
    let w = 0;
    for (const ch of l) w += ctx.measureText(ch).width + spacing;
    return w - spacing;
  };
  const widest = Math.max(...lines.map(measureLine));
  const lineH = RENDER_PX * 1.32;
  canvas.width = Math.max(4, Math.ceil(widest + RENDER_PX * 0.9));
  canvas.height = Math.max(4, Math.ceil(lineH * lines.length + RENDER_PX * 0.3));

  ctx.font = font;
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;
  const strokeWidth = RENDER_PX * 0.16;
  lines.forEach((line, i) => {
    const y = lineH * (i + 0.5) + RENDER_PX * 0.15;
    if (!spacing) {
      ctx.textAlign = "center";
      if (outline) {
        ctx.strokeStyle = "rgba(10,8,5,0.92)";
        ctx.lineWidth = strokeWidth;
        ctx.strokeText(line, canvas.width / 2, y);
      }
      ctx.fillStyle = opts.color;
      ctx.fillText(line, canvas.width / 2, y);
      return;
    }
    const w = measureLine(line);
    let x = (canvas.width - w) / 2;
    ctx.textAlign = "left";
    for (const ch of line) {
      if (outline) {
        ctx.strokeStyle = "rgba(10,8,5,0.92)";
        ctx.lineWidth = strokeWidth;
        ctx.strokeText(ch, x, y);
      }
      ctx.fillStyle = opts.color;
      ctx.fillText(ch, x, y);
      x += ctx.measureText(ch).width + spacing;
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });
  const sprite = new THREE.Sprite(material);
  const unitsPerPx = opts.size / RENDER_PX;
  sprite.scale.set(canvas.width * unitsPerPx, canvas.height * unitsPerPx, 1);
  sprite.renderOrder = 10;
  return sprite;
}

/** Soft radial-gradient billboard used as a glow halo behind each node,
 * additive-blended so it reinforces the real UnrealBloomPass rather than
 * fighting it. */
function makeGlowSprite(color: string, worldSize: number): THREE.Sprite {
  const px = 128;
  const canvas = document.createElement("canvas");
  canvas.width = px;
  canvas.height = px;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2);
  g.addColorStop(0, color);
  g.addColorStop(0.15, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, px, px);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0.32,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(worldSize, worldSize, 1);
  sprite.renderOrder = 1;
  return sprite;
}

const CREAM = "#f2ede2";
const GOLD = "#d9a441";
const RING = 3.05;

export const GapMapVisual = forwardRef<HTMLCanvasElement, GapMapVisualProps>(
  function GapMapVisual({ scores, readiness }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => canvasRef.current as HTMLCanvasElement);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const width = 920;
      const height = 920;

      const scene = new THREE.Scene();
      // Widened from 40 to 46 to keep the enlarged, further-pushed pillar
      // labels (see labelGap below) inside frame at the left/right nodes,
      // where a two-line label like "Household & Property" now runs wide
      // enough to clip the old frustum.
      const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
      camera.position.set(0, 9.2, 12.6);
      camera.lookAt(0, -0.1, 0);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      // --- Lighting ---------------------------------------------------
      scene.add(new THREE.AmbientLight(0xfff4e0, 0.42));
      const key = new THREE.DirectionalLight(0xfff2df, 1.35);
      key.position.set(3.5, 6, 4);
      scene.add(key);
      const rim = new THREE.PointLight(0x6f9ad6, 0.6, 20);
      rim.position.set(-4, 2, -5);
      scene.add(rim);
      const dialGlowLight = new THREE.PointLight(GOLD, 1.1, 8);
      dialGlowLight.position.set(0, 0.6, 0);
      scene.add(dialGlowLight);

      // --- Center readiness dial ---------------------------------------
      const dialGroup = new THREE.Group();
      dialGroup.rotation.x = -Math.PI / 2;
      scene.add(dialGroup);

      const trackGeo = new THREE.RingGeometry(1.02, 1.16, 96, 1, 0, Math.PI * 2);
      const trackMat = new THREE.MeshStandardMaterial({
        color: 0x1c1914,
        emissive: 0x000000,
        metalness: 0.2,
        roughness: 0.9,
        side: THREE.DoubleSide,
      });
      dialGroup.add(new THREE.Mesh(trackGeo, trackMat));

      const fillFraction = Math.max(0.002, Math.min(1, readiness / 100));
      const fillGeo = new THREE.RingGeometry(
        1.02,
        1.16,
        Math.max(2, Math.round(96 * fillFraction)),
        1,
        Math.PI / 2,
        -fillFraction * Math.PI * 2,
      );
      const fillMat = new THREE.MeshStandardMaterial({
        color: GOLD,
        emissive: GOLD,
        emissiveIntensity: 1.4,
        metalness: 0.55,
        roughness: 0.25,
        side: THREE.DoubleSide,
      });
      dialGroup.add(new THREE.Mesh(fillGeo, fillMat));

      const dialCap = new THREE.Mesh(
        new THREE.CircleGeometry(0.94, 64),
        new THREE.MeshStandardMaterial({
          color: 0x120f0a,
          emissive: 0x0a0806,
          emissiveIntensity: 0.6,
          metalness: 0.3,
          roughness: 0.85,
        }),
      );
      dialCap.position.y = -0.001;
      dialGroup.add(dialCap);

      const readinessSprite = makeTextSprite([`${Math.round(readiness)}%`], {
        size: 0.62,
        color: GOLD,
        weight: 700,
        outline: false,
      });
      readinessSprite.position.set(0, 0.08, 0.18);
      scene.add(readinessSprite);

      const readinessCaption = makeTextSprite(["READINESS"], {
        size: 0.16,
        color: CREAM,
        weight: 500,
        letterSpacing: 6,
        outline: false,
      });
      readinessCaption.position.set(0, -0.38, 0.18);
      readinessCaption.material.opacity = 0.75;
      scene.add(readinessCaption);

      // --- Seven pillar nodes -------------------------------------------
      const nodeGroup = new THREE.Group();
      scene.add(nodeGroup);
      const disposables: Array<{ dispose: () => void }> = [];

      scores.forEach((s, i) => {
        const angle = -Math.PI / 2 + i * ((Math.PI * 2) / scores.length);
        const x = Math.cos(angle) * RING;
        const z = Math.sin(angle) * RING;
        const color = nodeColor(s);
        const colorNum = new THREE.Color(color);

        const node = new THREE.Group();
        node.position.set(x, 0, z);
        nodeGroup.add(node);

        const glow = makeGlowSprite(color, 1.05);
        glow.position.y = 0.02;
        node.add(glow);

        const gemGeo = new THREE.IcosahedronGeometry(0.44, 2);
        const gemMat = new THREE.MeshStandardMaterial({
          color: colorNum,
          emissive: colorNum,
          emissiveIntensity: 0.55,
          metalness: 0.65,
          roughness: 0.18,
        });
        const gem = new THREE.Mesh(gemGeo, gemMat);
        gem.rotation.set(0.4, 0.6, 0.1);
        node.add(gem);
        disposables.push(gemGeo, gemMat);

        // Icon sprite and number-chip badge removed. Neither carried
        // information the gem's own color and the label/status text below
        // didn't already, and stacked together they read as clutter rather
        // than detail. The gem's color and glow now do that job alone.

        // Pushed further out than before (1.2 -> 1.7) so adjacent labels
        // clear each other around the ring, especially the top row where
        // three nodes used to collapse into a jumble at phone scale.
        const labelGap = 1.7;
        const lx = Math.cos(angle) * labelGap;
        const lz = Math.sin(angle) * labelGap;
        const lines = labelLines(s.title).map((l) => l.toUpperCase());
        const nameSprite = makeTextSprite(lines, {
          size: 0.25,
          color: CREAM,
          weight: 600,
          letterSpacing: 1,
        });
        nameSprite.position.set(x + lx, 0.62, z + lz);
        nameSprite.material.opacity = 0.92;
        scene.add(nameSprite);

        const pct = s.assessed > 0 ? `${s.riskPct}%` : "";
        const statusSprite = makeTextSprite(
          [pct ? `${statusWord(s).toUpperCase()}  ${pct}` : statusWord(s).toUpperCase()],
          { size: 0.19, color, weight: 600, letterSpacing: 1.2 },
        );
        // Vertical drop scales with lines.length the same way the name
        // sprite's own line height does, so a two-line pillar name (e.g.
        // "FINANCIAL & ASSETS") still clears its status line below it now
        // that both are drawn larger than before.
        statusSprite.position.set(
          x + lx,
          0.62 - 0.03 - lines.length * 0.32,
          z + lz,
        );
        scene.add(statusSprite);
      });

      // --- Floor glow -----------------------------------------------------
      const floorGlow = new THREE.Mesh(
        new THREE.CircleGeometry(4.6, 64),
        new THREE.MeshBasicMaterial({
          color: 0x14110c,
          transparent: true,
          opacity: 0.35,
        }),
      );
      floorGlow.rotation.x = -Math.PI / 2;
      floorGlow.position.y = -0.6;
      scene.add(floorGlow);

      // --- Bloom post-processing ------------------------------------------
      const composer = new EffectComposer(renderer);
      composer.setSize(width, height);
      composer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.35,
        0.28,
        0.5,
      );
      composer.addPass(bloom);
      composer.addPass(new OutputPass());

      composer.render();

      return () => {
        composer.dispose();
        renderer.dispose();
        scene.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          const mat = (obj as THREE.Sprite).material as
            | THREE.Material
            | THREE.Material[]
            | undefined;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else if (mat) mat.dispose();
        });
        disposables.forEach((d) => d.dispose());
      };
    }, [scores, readiness]);

    return (
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          maxWidth: 560,
          aspectRatio: "1 / 1",
          display: "block",
          margin: "0 auto",
        }}
      />
    );
  },
);

/**
 * Captures the already-rendered Gap Map canvas as a PNG data URI, ready to
 * drop into the PDF deliverable as an image block. The WebGL context is
 * created with preserveDrawingBuffer, so this is a direct read of the canvas
 * buffer with no separate rasterization pass needed.
 */
export function gapMapToPng(
  canvasEl: HTMLCanvasElement,
): Promise<{ src: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    if (!canvasEl.width || !canvasEl.height) {
      reject(new Error("Gap Map canvas has not rendered yet"));
      return;
    }
    try {
      resolve({
        src: canvasEl.toDataURL("image/png"),
        width: canvasEl.width,
        height: canvasEl.height,
      });
    } catch (err) {
      reject(err instanceof Error ? err : new Error("Could not capture the Gap Map"));
    }
  });
}
