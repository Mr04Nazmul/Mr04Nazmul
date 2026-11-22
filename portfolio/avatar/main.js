import {
  MathUtils, OrthographicCamera, Scene, SRGBColorSpace, WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const views = [...document.querySelectorAll(".watch-frame")];
const poses = {
  idle: [0, 0, 0],
  greeting: [-.08, .05, -.035],
  listening: [-.045, 0, .04],
  thinking: [-.075, -.085, -.025],
  happy: [.035, .06, -.035],
  talking: [-.025, 0, 0],
};
let model;
let active;
const avatarAsset = "/assets/devnazu-avatar.glb";
const greetingAsset = "/assets/devnazu-greeting.mp3";

function createCharacter(host, mesh) {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.domElement.className = "avatar-canvas";
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new Scene();
  scene.add(mesh);
  const camera = new OrthographicCamera(-.795, .795, 1.025, -1.025, .1, 20);
  camera.position.z = 5;
  const pose = mesh.morphTargetInfluences;
  const face = mesh.morphTargetDictionary;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn sm avatar-voice";
  button.textContent = "Play greeting";
  const message = document.createElement("span");
  message.className = "avatar-voice-status";
  message.setAttribute("role", "status");
  const controls = document.createElement("div");
  controls.className = "avatar-controls";
  controls.append(button, message);
  host.after(controls);

  const audio = new Audio(greetingAsset);
  audio.preload = "none";
  let context;
  let analyser;
  let audioSamples;
  let frame = 0;
  let previous = 0;
  let nextBlink = 0;
  let state = "greeting";
  let until = performance.now() + 900;
  let gazeUntil = 0;
  let gazeX = 0;
  let gazeY = 0;
  let targetX = 0;
  let targetY = 0;
  let jaw = 0;
  let smile = 0;
  let visible = true;
  let lost = false;

  function react(name, duration = 900) {
    if (!audio.paused) return;
    state = name;
    until = performance.now() + duration;
  }
  function aim(x, y, duration) {
    const box = host.getBoundingClientRect();
    targetX = MathUtils.clamp((x - box.left - box.width / 2) / (innerWidth * .45), -1, 1);
    targetY = MathUtils.clamp((y - box.top - box.height * .38) / (innerHeight * .45), -1, 1);
    gazeUntil = performance.now() + duration;
  }
  function render(time) {
    frame = 0;
    const dt = previous ? Math.min((time - previous) / 1000, .04) : 1 / 60;
    previous = time;
    const still = reduced.matches;
    const talking = !audio.paused && !audio.ended;
    const current = talking ? "talking" : time < until ? state : "idle";
    host.dataset.motion = still ? "still" : current;
    const t = time / 1000;
    if (!nextBlink) nextBlink = t + 2.4;
    if (t > nextBlink + .16) nextBlink = t + 2.6 + Math.random() * 3.2;
    const blink = t >= nextBlink && t < nextBlink + .16 ? Math.sin((t - nextBlink) / .16 * Math.PI) : 0;
    let loudness = 0;
    if (talking && analyser) {
      analyser.getByteTimeDomainData(audioSamples);
      let energy = 0;
      for (const value of audioSamples) energy += ((value - 128) / 128) ** 2;
      loudness = MathUtils.clamp((Math.sqrt(energy / audioSamples.length) - .017) * 8.5, 0, 1);
    }
    const resumeGaze = time < gazeUntil;
    gazeX = MathUtils.damp(gazeX, resumeGaze ? targetX : 0, 7, dt);
    gazeY = MathUtils.damp(gazeY, resumeGaze ? targetY : 0, 7, dt);
    const [pitch, yaw, roll] = poses[current];
    const breath = Math.sin(t * 1.7) + .24 * Math.sin(t * 3.4);
    jaw = MathUtils.damp(jaw, loudness, loudness > jaw ? 27 : 15, dt);
    smile = MathUtils.damp(smile, current === "happy" || current === "greeting" ? .65 : 0, 6, dt);
    mesh.rotation.set(
      still ? 0 : pitch - gazeY * .105 + breath * .008,
      still ? 0 : yaw + gazeX * .145 + Math.sin(t * .63) * .015,
      still ? 0 : roll + gazeX * .019,
    );
    mesh.position.y = still ? 0 : breath * .006;
    mesh.scale.y = still ? 1 : 1 + breath * .004;
    pose[face.blink] = still ? 0 : blink * .94;
    pose[face.jaw] = still ? 0 : jaw;
    pose[face.smile] = still ? 0 : smile;
    renderer.render(scene, camera);
    if (visible && !document.hidden && !lost && !still) frame = requestAnimationFrame(render);
  }
  function refresh() {
    cancelAnimationFrame(frame);
    frame = previous = 0;
    if (visible && !document.hidden && !lost) render(performance.now());
  }
  function resize() {
    const box = host.getBoundingClientRect();
    if (!box.width) return;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    renderer.setSize(box.width, box.width * 1728 / 1344, false);
    refresh();
  }
  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    button.textContent = "Play greeting";
  }
  button.addEventListener("click", async () => {
    if (!audio.paused) {
      stopAudio();
      return;
    }
    message.textContent = "";
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass && !context) {
        context = new AudioContextClass();
        analyser = context.createAnalyser();
        analyser.fftSize = 256;
        audioSamples = new Uint8Array(analyser.fftSize);
        context.createMediaElementSource(audio).connect(analyser).connect(context.destination);
      }
      await Promise.all([context?.resume(), audio.play()]);
      button.textContent = "Stop greeting";
    } catch {
      stopAudio();
      message.textContent = "Greeting audio is unavailable.";
    }
  });
  audio.addEventListener("ended", () => { stopAudio(); react("happy"); });
  renderer.domElement.addEventListener("webglcontextlost", event => {
    event.preventDefault();
    lost = true;
    host.classList.remove("avatar-ready");
    controls.hidden = true;
    stopAudio();
    refresh();
  });
  renderer.domElement.addEventListener("webglcontextrestored", () => {
    lost = false;
    host.classList.add("avatar-ready");
    controls.hidden = false;
    resize();
  });
  host.append(renderer.domElement);
  resize();
  host.classList.add("avatar-ready");
  new ResizeObserver(resize).observe(host);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) stopAudio();
    if (visible) active = { aim, react, host };
    else if (active?.host === host) active = undefined;
    refresh();
  }).observe(host);
  reduced.addEventListener("change", refresh);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAudio();
    refresh();
  });
  window.addEventListener("hashchange", () => {
    if (!host.closest(".page.on")) stopAudio();
  });
}
const activate = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    activate.unobserve(entry.target);
    model ??= new GLTFLoader().loadAsync(avatarAsset).then(({ scene }) => {
      const mesh = scene.getObjectByName("Portrait");
      if (!mesh?.isMesh || !mesh.morphTargetDictionary?.jaw) throw new Error("Invalid avatar model");
      return mesh;
    });
    model.then(mesh => createCharacter(entry.target, mesh.clone())).catch(() => {
      entry.target.dataset.motion = "fallback";
    });
  }
});
for (const view of views) activate.observe(view);

window.addEventListener("pointermove", event => {
  if (event.pointerType !== "touch" || event.buttons) active?.aim(event.clientX, event.clientY, 700);
}, { passive: true });
window.addEventListener("pointerdown", event => {
  if (!event.isPrimary) return;
  active?.aim(event.clientX, event.clientY, 1150);
  active?.react("listening");
}, { passive: true });
document.addEventListener("focusin", event => {
  if (!event.target.matches?.("button,a,input,select")) return;
  const box = event.target.getBoundingClientRect();
  active?.aim(box.left + box.width / 2, box.top + box.height / 2, 850);
  active?.react("listening");
});
document.addEventListener("click", event => {
  const button = event.target.closest?.("a,button");
  if (button?.matches(".menu-toggle")) active?.react("thinking", 950);
  else if (button?.matches(".btn.primary")) active?.react("happy");
});
window.addEventListener("hashchange", () => active?.react("greeting"));
