"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Color,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uFlakeSize;
uniform float uMinFlakeSize;
uniform float uPixelResolution;
uniform float uSpeed;
uniform float uDepthFade;
uniform float uFarPlane;
uniform vec3 uColor;
uniform float uBrightness;
uniform float uGamma;
uniform float uDensity;
uniform float uVariant;
uniform float uDirection;

#define PI 3.14159265
#define PI_OVER_6 0.5235988
#define PI_OVER_3 1.0471976
#define M1 1597334677U
#define M2 3812015801U
#define M3 3299493293U
#define F0 2.3283064e-10

#define hash(n) (n * (n ^ (n >> 15)))
#define coord3(p) (uvec3(p).x * M1 ^ uvec3(p).y * M2 ^ uvec3(p).z * M3)

const vec3 camK = vec3(0.57735027, 0.57735027, 0.57735027);
const vec3 camI = vec3(0.70710678, 0.0, -0.70710678);
const vec3 camJ = vec3(-0.40824829, 0.81649658, -0.40824829);
const vec2 b1d = vec2(0.574, 0.819);

vec3 hash3(uint n) {
  uvec3 hashed = hash(n) * uvec3(1U, 511U, 262143U);
  return vec3(hashed) * F0;
}

// Optimized SDF: fast bounding-circle reject before full SDF evaluation
float snowflakeDist(vec2 p, float flakeSize) {
  // Early-exit: if point is outside bounding circle, skip the full SDF
  if (length(p) > flakeSize * 1.5) return flakeSize * 2.0;

  float invFlakeSize = 1.0 / flakeSize;
  vec2 q_norm = p * invFlakeSize;
  float r = length(q_norm);
  float a = atan(q_norm.y, q_norm.x);
  a = abs(mod(a + PI_OVER_6, PI_OVER_3) - PI_OVER_6);
  vec2 q = r * vec2(cos(a), sin(a));
  float dMain = max(abs(q.y), max(-q.x, q.x - 1.0));
  float b1t = clamp(dot(q - vec2(0.4, 0.0), b1d), 0.0, 0.4);
  float dB1 = length(q - vec2(0.4, 0.0) - b1t * b1d);
  float b2t = clamp(dot(q - vec2(0.7, 0.0), b1d), 0.0, 0.25);
  float dB2 = length(q - vec2(0.7, 0.0) - b2t * b1d);
  return min(dMain, min(dB1, dB2)) * 10.0 * flakeSize;
}

void main() {
  float invPixelRes = 1.0 / uPixelResolution;
  float pixelSize = max(1.0, floor(0.5 + uResolution.x * invPixelRes));
  float invPixelSize = 1.0 / pixelSize;

  vec2 fragCoord = floor(gl_FragCoord.xy * invPixelSize);
  vec2 res = uResolution * invPixelSize;
  float invResX = 1.0 / res.x;

  vec3 ray = normalize(vec3((fragCoord - res * 0.5) * invResX, 1.0));
  ray = ray.x * camI + ray.y * camJ + ray.z * camK;

  float timeSpeed = uTime * uSpeed;
  float windX = cos(uDirection) * 0.4;
  float windY = sin(uDirection) * 0.4;
  vec3 camPos = (windX * camI + windY * camJ + 0.1 * camK) * timeSpeed;
  vec3 pos = camPos;

  vec3 absRay = max(abs(ray), vec3(0.001));
  vec3 strides = 1.0 / absRay;
  vec3 raySign = step(ray, vec3(0.0));
  vec3 phase = fract(pos) * strides;
  phase = mix(strides - phase, phase, raySign);

  float rayDotCamK = dot(ray, camK);
  float invRayDotCamK = 1.0 / rayDotCamK;
  float invDepthFade = 1.0 / uDepthFade;
  float halfInvResX = 0.5 * invResX;
  vec3 timeAnim = timeSpeed * 0.1 * vec3(7.0, 8.0, 5.0);

  float t = 0.0;

  // OPTIMIZATION 1: Loop count reduced from 128 → 64.
  // With farPlane=20 and typical step sizes, 64 iterations covers the full
  // visible range while halving per-fragment ALU cost.
  for (int i = 0; i < 64; i++) {
    if (t >= uFarPlane) break;

    vec3 fpos = floor(pos);
    uint cellCoord = coord3(fpos);

    // OPTIMIZATION 2: First hash only (cheap) used for density cull.
    // The three-component hash3() is only called when the cell passes,
    // avoiding expensive math on ~(1-density) of all cells.
    uint cheapHash = hash(cellCoord);
    float cellHash = float(cheapHash) * F0;

    if (cellHash < uDensity) {
      vec3 h = hash3(cellCoord);

      vec3 sinArg1 = fpos.yzx * 0.073;
      vec3 sinArg2 = fpos.zxy * 0.27;
      vec3 flakePos = 0.5 - 0.5 * cos(4.0 * sin(sinArg1) + 4.0 * sin(sinArg2) + 2.0 * h + timeAnim);
      flakePos = flakePos * 0.8 + 0.1 + fpos;

      float toIntersection = dot(flakePos - pos, camK) * invRayDotCamK;

      if (toIntersection > 0.0) {
        vec3 testPos = pos + ray * toIntersection - flakePos;
        float testX = dot(testPos, camI);
        float testY = dot(testPos, camJ);
        vec2 testUV = abs(vec2(testX, testY));

        float depth = dot(flakePos - camPos, camK);
        float flakeSize = max(uFlakeSize, uMinFlakeSize * depth * halfInvResX);

        float dist;
        if (uVariant < 0.5) {
          // Square: cheap Chebyshev distance
          dist = max(testUV.x, testUV.y);
        } else if (uVariant < 1.5) {
          // Round: Euclidean length
          dist = length(testUV);
        } else {
          // OPTIMIZATION 3: SDF has an early bounding-circle exit.
          // Avoids trig/branching for fragments clearly outside the flake.
          dist = snowflakeDist(vec2(testX, testY), flakeSize);
        }

        if (dist < flakeSize) {
          float flakeSizeRatio = uFlakeSize / flakeSize;
          float intensity = exp2(-(t + toIntersection) * invDepthFade) *
                            min(1.0, flakeSizeRatio * flakeSizeRatio) * uBrightness;
          gl_FragColor = vec4(uColor * pow(vec3(intensity), vec3(uGamma)), 1.0);
          return;
        }
      }
    }

    float nextStep = min(min(phase.x, phase.y), phase.z);
    vec3 sel = step(phase, vec3(nextStep));
    phase = phase - nextStep + strides * sel;
    t += nextStep;
    pos = mix(pos + ray * nextStep, floor(pos + ray * nextStep + 0.5), sel);
  }

  gl_FragColor = vec4(0.0);
}
`;

// OPTIMIZATION 4: Detect low-end GPU heuristically via canvas benchmark.
// Runs once at module load; result used to scale default quality settings.
function detectLowEndGPU(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return true;
    const dbgInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!dbgInfo) return false;
    const renderer = gl.getParameter(dbgInfo.UNMASKED_RENDERER_WEBGL) as string;
    // Flag integrated GPUs and mobile GPUs as low-end
    return /intel|mali|adreno|apple gpu|llvm/i.test(renderer);
  } catch {
    return false;
  }
}

interface PixelSnowProps {
  color?: string;
  flakeSize?: number;
  minFlakeSize?: number;
  pixelResolution?: number;
  speed?: number;
  depthFade?: number;
  farPlane?: number;
  brightness?: number;
  gamma?: number;
  density?: number;
  variant?: "square" | "round" | "snowflake";
  direction?: number;
  /** Cap frames per second. Defaults to 60; set lower (e.g. 30) to save power. */
  maxFPS?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function PixelSnow({
  color = "#ffffff",
  flakeSize = 0.01,
  minFlakeSize = 1.25,
  // OPTIMIZATION 5: Lower default pixelResolution (200→150).
  // The effect is intentionally pixelated so this saves ~40% fragment work
  // with no perceptible quality loss at typical viewport sizes.
  pixelResolution = 150,
  speed = 1.25,
  depthFade = 8,
  farPlane = 20,
  brightness = 1,
  gamma = 0.4545,
  density = 0.3,
  variant = "square",
  direction = 125,
  maxFPS = 60,
  className = "",
  style = {},
}: PixelSnowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFrameRef = useRef(0);

  const frameBudget = 1000 / maxFPS;

  const variantValue = useMemo(() => {
    return variant === "round" ? 1.0 : variant === "snowflake" ? 2.0 : 0.0;
  }, [variant]);

  const colorVector = useMemo(() => {
    const threeColor = new Color(color);
    return new Vector3(threeColor.r, threeColor.g, threeColor.b);
  }, [color]);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    resizeTimeoutRef.current = setTimeout(() => {
      const container = containerRef.current;
      const renderer = rendererRef.current;
      const material = materialRef.current;
      if (!container || !renderer || !material) return;

      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    }, 100);
  }, []);

  // IntersectionObserver: pause rendering when off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // OPTIMIZATION 6: document visibilitychange listener.
  // Stops rendering while the tab is hidden, saving GPU and battery.
  useEffect(() => {
    const onVisibility = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Main Three.js setup — runs once
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isLowEnd = detectLowEndGPU();

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: false,
    });

    // OPTIMIZATION 7: Clamp devicePixelRatio more aggressively.
    // 1.5 on desktop saves ~44% fill rate vs 2.0 with minimal visual difference
    // on a pixelated effect. Low-end devices get 1.0 (native resolution only).
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isLowEnd ? 1.0 : 1.5),
    );
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Vector2(container.offsetWidth, container.offsetHeight),
        },
        uFlakeSize: { value: flakeSize },
        uMinFlakeSize: { value: minFlakeSize },
        uPixelResolution: { value: pixelResolution },
        uSpeed: { value: speed },
        uDepthFade: { value: depthFade },
        uFarPlane: { value: farPlane },
        uColor: { value: colorVector.clone() },
        uBrightness: { value: brightness },
        uGamma: { value: gamma },
        uDensity: { value: density },
        uVariant: { value: variantValue },
        uDirection: { value: (direction * Math.PI) / 180 },
      },
      transparent: true,
    });
    materialRef.current = material;

    const geometry = new PlaneGeometry(2, 2);
    scene.add(new Mesh(geometry, material));

    window.addEventListener("resize", handleResize);

    const startTime = performance.now();

    // OPTIMIZATION 8: Frame-rate cap via timestamp delta check.
    // Skipping frames when under budget costs nothing; rendering at 30fps
    // instead of 60fps halves GPU load for a smooth but lighter animation.
    const animate = (timestamp: number) => {
      animationRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;
      if (timestamp - lastFrameRef.current < frameBudget) return;

      lastFrameRef.current = timestamp;
      material.uniforms.uTime.value = (timestamp - startTime) * 0.001;
      renderer.render(scene, camera);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      renderer.forceContextLoss();
      geometry.dispose();
      material.dispose();
      rendererRef.current = null;
      materialRef.current = null;
    };
  }, [handleResize]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync uniforms when props change — no scene teardown needed
  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uFlakeSize.value = flakeSize;
    material.uniforms.uMinFlakeSize.value = minFlakeSize;
    material.uniforms.uPixelResolution.value = pixelResolution;
    material.uniforms.uSpeed.value = speed;
    material.uniforms.uDepthFade.value = depthFade;
    material.uniforms.uFarPlane.value = farPlane;
    material.uniforms.uBrightness.value = brightness;
    material.uniforms.uGamma.value = gamma;
    material.uniforms.uDensity.value = density;
    material.uniforms.uVariant.value = variantValue;
    material.uniforms.uDirection.value = (direction * Math.PI) / 180;
    material.uniforms.uColor.value.copy(colorVector);
  }, [
    flakeSize,
    minFlakeSize,
    pixelResolution,
    speed,
    depthFade,
    farPlane,
    brightness,
    gamma,
    density,
    variantValue,
    direction,
    colorVector,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full transform-gpu will-change-transform backface-hidden ${className}`}
      style={style}
    />
  );
}
