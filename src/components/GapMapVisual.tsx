import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
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

// Craig deliberately aligned three Blueprint pillar titles to their Life
// Manual chapter names (see blueprintPillars.ts), so all 7 now share an
// icon with their Life Manual counterpart: Digital Life, Financial &
// Assets, Legacy & Wishes, and Business Continuity always matched;
// Household Operations, Vital Records, and Emergency & Successor
// Orientation now match by name too, using the Life Manual's own icons
// for each. Pillar 04's underlying id stays "health" (see the header
// comment above), it's the title and icon that moved, not the id.
const PILLAR_ICON_SRC: Partial<Record<string, string>> = {
  digital: "/g_digital-e.webp",
  legal: "/g_vital-e.webp",
  financial: "/g_financial-e.webp",
  household: "/g_household-e.webp",
  health: "/g_emergency-e.webp",
  business: "/g_business-e.webp",
  legacy: "/g_legacy-e.webp",
};

/** Loads a square source image, masks it to a circle on an offscreen
 * canvas, and hands back a billboarded sprite via callback once ready.
 * Async by nature, so callers need to guard against the component having
 * unmounted (or this effect having re-run) before the image finishes. */
function loadIconSprite(
  src: string,
  worldSize: number,
  onReady: (sprite: THREE.Sprite) => void,
): void {
  const img = new Image();
  img.onload = () => {
    const RENDER_PX = 256;
    const canvas = document.createElement("canvas");
    canvas.width = RENDER_PX;
    canvas.height = RENDER_PX;
    const ctx = canvas.getContext("2d")!;
    ctx.save();
    ctx.beginPath();
    ctx.arc(RENDER_PX / 2, RENDER_PX / 2, RENDER_PX / 2 - 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, 0, 0, RENDER_PX, RENDER_PX);
    ctx.restore();
    // Thin ring so the badge reads as a deliberate medallion against the
    // scene rather than a cropped photo floating in space.
    ctx.beginPath();
    ctx.arc(RENDER_PX / 2, RENDER_PX / 2, RENDER_PX / 2 - 2, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(232, 200, 105, 0.55)";
    ctx.lineWidth = 4;
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(worldSize, worldSize, 1);
    sprite.renderOrder = 9;
    onReady(sprite);
  };
  img.src = src;
}

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
  // No ampersand to split on (e.g. "Household Operations"): fall back to
  // breaking at whichever space sits closest to the midpoint, so a long
  // title still wraps to two roughly balanced lines instead of trying to
  // render as one long unsplit line.
  const mid = title.length / 2;
  let bestSpace = -1;
  let bestDist = Infinity;
  for (let i = 0; i < title.length; i++) {
    if (title[i] === " ") {
      const dist = Math.abs(i - mid);
      if (dist < bestDist) {
        bestDist = dist;
        bestSpace = i;
      }
    }
  }
  if (bestSpace > 0) {
    return [title.slice(0, bestSpace), title.slice(bestSpace + 1)];
  }
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
    /** Dark stroke drawn behind the fill. Off by default now, per Craig's
     * call that it read as a drop shadow rather than a legibility aid. */
    outline?: boolean;
  },
): THREE.Sprite {
  const RENDER_PX = 72;
  const weight = opts.weight ?? 400;
  const spacing = opts.letterSpacing ?? 0;
  const outline = opts.outline ?? false;
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
function makeGlowSprite(color: string, worldSize: number, opacity = 0.32): THREE.Sprite {
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
    opacity,
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
      // Guards the async icon image loads below: if this effect re-runs
      // or the component unmounts before an image finishes loading, its
      // onload callback must not touch a scene that's already been torn
      // down or add a sprite that'll never get cleaned up.
      let cancelled = false;
      // Bloom is a full-scene post-process, so it can't tell text from
      // orbs by brightness alone — cream text is often brighter than the
      // colored gems, so a threshold tweak would catch one or lose the
      // other. Tracking every text sprite here instead, so the render
      // sequence below can hide just these for the bloom-only pass and
      // composite that result back in without them.
      const noBloomSprites: THREE.Object3D[] = [];

      const width = 920;
      const height = 920;

      const scene = new THREE.Scene();
      // Widened from 40 to 46 to keep the enlarged, further-pushed pillar
      // labels (see labelGap below) inside frame at the left/right nodes,
      // where a two-line label like "Household Operations" now runs wide
      // enough to clip the old frustum.
      const camera = new THREE.PerspectiveCamera(56, width / height, 0.1, 100);
      // Steepened from (0, 9.2, 12.6) — a fairly raking ~54-degree angle
      // off vertical — to a much more top-down ~33 degrees. At the old
      // angle, the seven nodes sat at meaningfully different distances
      // from the camera despite being equidistant from the ring center,
      // so the same world-space label size read as different apparent
      // sizes on screen, and pushing a label outward along its node's
      // radial direction meant "outward" sometimes translated to mostly
      // sideways motion on screen and sometimes to mostly depth motion,
      // which is why the gaps looked inconsistent node to node. A more
      // top-down angle makes both of those problems much smaller at the
      // geometry level rather than patching them after the fact.
      camera.position.set(0, 12.5, 8);
      // Look-at target dropped from -0.1 to -0.35 to recenter the frame
      // slightly lower, since the bottom two nodes' status lines were
      // running past the bottom edge with the steeper camera angle.
      camera.lookAt(0, -0.35, 0);

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
      noBloomSprites.push(readinessSprite);

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
      noBloomSprites.push(readinessCaption);

      // --- Seven pillar nodes -------------------------------------------
      const nodeGroup = new THREE.Group();
      scene.add(nodeGroup);
      const disposables: Array<{ dispose: () => void }> = [];
      // Reference distance for the label-scale normalization below: how
      // far the camera sits from the point every node's label is nominally
      // anchored around (the same target camera.lookAt uses).
      const camDistToCenter = camera.position.distanceTo(
        new THREE.Vector3(0, -0.1, 0),
      );

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

        const gemGeo = new THREE.IcosahedronGeometry(0.33, 2);
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

        // Stone pillar shaft beneath the gem, per Craig's direction toward
        // the Legacy OS reference: the gem still carries the readiness
        // color as its own bright emissive cap, and the stone picks up a
        // faint wash of that same color near the top, as if lit by the
        // gem sitting on it, rather than the whole shaft being flat-
        // colored (which read as cartoonish in an early pass).
        const pillarHeight = 1.5;
        const gemRadius = 0.33;
        const pillarGeo = new THREE.CylinderGeometry(0.22, 0.28, pillarHeight, 24);
        const pillarMat = new THREE.MeshStandardMaterial({
          color: 0x8a8378,
          emissive: colorNum,
          emissiveIntensity: 0.16,
          metalness: 0.12,
          roughness: 0.82,
        });
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.y = -(gemRadius + pillarHeight / 2 - 0.14);
        node.add(pillar);
        disposables.push(pillarGeo, pillarMat);

        // Base plinth, a short wider cylinder the shaft sits on, so it
        // reads as standing on something instead of floating mid-air with
        // its bottom edge just stopping in space.
        const plinthHeight = 0.12;
        const pillarBottomY = pillar.position.y - pillarHeight / 2;
        const plinthGeo = new THREE.CylinderGeometry(0.34, 0.38, plinthHeight, 24);
        const plinthMat = new THREE.MeshStandardMaterial({
          color: 0x726c60,
          metalness: 0.1,
          roughness: 0.88,
        });
        const plinth = new THREE.Mesh(plinthGeo, plinthMat);
        plinth.position.y = pillarBottomY - plinthHeight / 2 + 0.03;
        node.add(plinth);
        disposables.push(plinthGeo, plinthMat);

        // Small ground-glow pool at the base, standing in for the ambient
        // light the reference shows pooling around each pillar's foot.
        // Deliberately a soft, per-node additive sprite rather than one
        // shared floor plane across the whole scene, since a single flat
        // disc under everything was the earlier attempt that read as a
        // flat, hard-edged shape once bloom stopped covering for it.
        const groundGlow = makeGlowSprite(color, 1.9, 0.16);
        groundGlow.position.y = pillarBottomY;
        node.add(groundGlow);

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
        // Sprites keep a fixed world-space size, so two labels of the same
        // font size still read as different sizes on screen once they sit
        // at different distances from the camera. Rescaling each one by
        // its own distance-to-camera relative to the ring center's
        // distance-to-camera cancels that out, so all seven read as the
        // same size regardless of which side of the ring they're on.
        const distScale = camera.position.distanceTo(nameSprite.position) / camDistToCenter;
        nameSprite.scale.multiplyScalar(distScale);
        scene.add(nameSprite);
        noBloomSprites.push(nameSprite);

        const iconSrc = PILLAR_ICON_SRC[s.pillarId];
        if (iconSrc) {
          const iconWorldSize = 0.62;
          // Same flat, generous-and-verified approach as the status-line
          // gap below: given how much trouble deriving an exact figure
          // from sprite dimensions caused for that one, not repeating it
          // here. Bigger gap for two-line names so the icon clears the
          // taller block, plus half the icon's own size so its footprint
          // doesn't creep back down into the name it's sitting above.
          // The 0.78 constant was tuned against six nodes before Health &
          // Medical had an icon at all, and none of those six land as
          // close to camera (low distScale) on a two-line label as this
          // node does (id stays "health" after the Emergency & Successor
          // Orientation rename, so it's still the worst-case position).
          // 1.02 cleared the literal collision, then 1.3 still left the
          // icon's badge ring visibly clipping the top of "EMERGENCY &"
          // once rendered and inspected directly, so bumped again to 1.6,
          // rebuilt, and re-inspected at full resolution to confirm the
          // badge sits clear of the text with real margin this time.
          const iconGap = (lines.length >= 2 ? 1.6 : 0.68) + iconWorldSize / 2;
          const iconX = x + lx;
          const iconZ = z + lz;
          const iconY = nameSprite.position.y + iconGap * distScale;
          loadIconSprite(iconSrc, iconWorldSize, (iconSprite) => {
            if (cancelled) return;
            iconSprite.position.set(iconX, iconY, iconZ);
            iconSprite.scale.multiplyScalar(
              camera.position.distanceTo(iconSprite.position) / camDistToCenter,
            );
            scene.add(iconSprite);
            renderScene();
          });
        }

        const pct = s.assessed > 0 ? `${s.riskPct}%` : "";
        const statusSprite = makeTextSprite(
          [pct ? `${statusWord(s).toUpperCase()}  ${pct}` : statusWord(s).toUpperCase()],
          { size: 0.19, color, weight: 600, letterSpacing: 1.2 },
        );
        // Every formula tried here derived from sprite dimensions or
        // camera distance, and each one looked right on paper but still
        // overlapped for at least one node in practice, with no single
        // variable explaining the shortfall. Falling back to a flat,
        // deliberately generous gap per line count instead, confirmed
        // empirically against all seven nodes including the worst case.
        //
        // The single-line value was 0.44 and passed that verification at
        // the time, but "Legal & Estate" (two lines, 1.05 gap) later became
        // "Vital Records" (one line) during the terminology rename, which
        // moved that node onto the tighter single-line offset and nobody
        // re-checked the Gap Map render against the new, shorter title.
        // "VITAL RECORDS" and its status line overlapped as a result.
        // Bumped with real margin this time, re-verified against all seven
        // current titles including Vital Records and Digital Life, the two
        // one-line labels, at the bottom-of-ring camera angle where this
        // has broken before.
        const statusOffset = lines.length >= 2 ? 1.05 : 0.62;
        statusSprite.position.set(
          x + lx,
          nameSprite.position.y - statusOffset,
          z + lz,
        );
        statusSprite.scale.multiplyScalar(
          camera.position.distanceTo(statusSprite.position) / camDistToCenter,
        );
        // Explicit render order above the name sprite (which defaults to
        // 10 from makeTextSprite) so status always draws on top of name
        // if the two ever end up close enough on screen to compete,
        // rather than leaving that to Three's default transparent sort.
        statusSprite.renderOrder = 11;
        scene.add(statusSprite);
        noBloomSprites.push(statusSprite);
      });

      // --- Bloom post-processing (selective) -------------------------------
      // Bloom now only applies to the gems, their glow halos, and the
      // readiness ring. Text renders in a plain pass with no bloom
      // contribution, then the two are composited together additively,
      // so the orbs still glow but the lettering stays crisp and flat.
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      const bloomComposer = new EffectComposer(renderer);
      bloomComposer.renderToScreen = false;
      bloomComposer.setSize(width, height);
      bloomComposer.setPixelRatio(pixelRatio);
      bloomComposer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.35,
        0.28,
        0.5,
      );
      bloomComposer.addPass(bloom);

      const additiveMixShader = {
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D baseTexture;
          uniform sampler2D bloomTexture;
          varying vec2 vUv;
          void main() {
            gl_FragColor = texture2D(baseTexture, vUv) + texture2D(bloomTexture, vUv);
          }
        `,
      };
      const mixPass = new ShaderPass(additiveMixShader, "baseTexture");
      mixPass.needsSwap = true;

      const composer = new EffectComposer(renderer);
      composer.setSize(width, height);
      composer.setPixelRatio(pixelRatio);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(mixPass);
      composer.addPass(new OutputPass());

      const renderScene = () => {
        noBloomSprites.forEach((o) => (o.visible = false));
        bloomComposer.render();
        noBloomSprites.forEach((o) => (o.visible = true));
        composer.render();
      };
      renderScene();

      return () => {
        cancelled = true;
        composer.dispose();
        bloomComposer.dispose();
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
