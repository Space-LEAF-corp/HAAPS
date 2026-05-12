const segmentsEl = document.getElementById("segments");
const outputEl = document.getElementById("output");
const segmentCountEl = document.getElementById("segmentCount");

const songIdEl = document.getElementById("songId");
const channelEl = document.getElementById("channel");
const descriptionEl = document.getElementById("description");

const addPulseBtn = document.getElementById("addPulse");
const addRampBtn = document.getElementById("addRamp");
const addTextureBtn = document.getElementById("addTexture");
const clearAllBtn = document.getElementById("clearAll");
const copyJsonBtn = document.getElementById("copyJson");

const presetRiseBtn = document.getElementById("presetRise");
const presetHeartbeatBtn = document.getElementById("presetHeartbeat");
const presetOrbitBtn = document.getElementById("presetOrbit");

let segments = [];

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function renderSegments() {
  segmentsEl.innerHTML = "";
  segments.forEach((seg, idx) => {
    const wrapper = document.createElement("div");
    wrapper.className = "segment";

    const typeSelect = document.createElement("select");
    ["pulse", "ramp", "texture"].forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      if (t === seg.type) opt.selected = true;
      typeSelect.appendChild(opt);
    });

    const intensityInput = document.createElement("input");
    intensityInput.type = "number";
    intensityInput.min = "0";
    intensityInput.max = "1";
    intensityInput.step = "0.05";
    intensityInput.value = seg.intensity;

    const durationInput = document.createElement("input");
    durationInput.type = "number";
    durationInput.min = "10";
    durationInput.max = "5000";
    durationInput.step = "10";
    durationInput.value = seg.durationMs;

    const directionSelect = document.createElement("select");
    ["", "left", "right", "top", "bottom", "center"].forEach((d) => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d === "" ? "direction" : d;
      if (d === (seg.direction || "")) opt.selected = true;
      directionSelect.appendChild(opt);
    });

    const textureInput = document.createElement("input");
    textureInput.type = "text";
    textureInput.placeholder = "texture (e.g., rough)";
    textureInput.value = seg.textureId || "";

    const removeBtn = document.createElement("button");
    removeBtn.className = "danger";
    removeBtn.textContent = "✕";
    removeBtn.title = "Remove segment";

    typeSelect.addEventListener("change", () => {
      seg.type = typeSelect.value;
      updateOutput();
    });

    intensityInput.addEventListener("input", () => {
      seg.intensity = clamp(parseFloat(intensityInput.value) || 0, 0, 1);
      intensityInput.value = seg.intensity;
      updateOutput();
    });

    durationInput.addEventListener("input", () => {
      seg.durationMs = clamp(parseInt(durationInput.value) || 10, 10, 5000);
      durationInput.value = seg.durationMs;
      updateOutput();
    });

    directionSelect.addEventListener("change", () => {
      seg.direction = directionSelect.value || undefined;
      updateOutput();
    });

    textureInput.addEventListener("input", () => {
      seg.textureId = textureInput.value || undefined;
      updateOutput();
    });

    removeBtn.addEventListener("click", () => {
      segments.splice(idx, 1);
      renderSegments();
      updateOutput();
    });

    const header = document.createElement("div");
    header.className = "segment-header";
    const title = document.createElement("div");
    title.className = "segment-title";
    title.innerHTML =
      '<span class="segment-index">Beat ' +
      (idx + 1) +
      "</span> • " +
      seg.type;
    header.appendChild(title);
    header.appendChild(removeBtn);

    wrapper.appendChild(header);
    wrapper.appendChild(typeSelect);
    wrapper.appendChild(intensityInput);
    wrapper.appendChild(durationInput);
    wrapper.appendChild(directionSelect);
    wrapper.appendChild(textureInput);

    segmentsEl.appendChild(wrapper);
  });
  segmentCountEl.textContent = segments.length.toString();
}

function buildPatternJson() {
  const pattern = {
    id: songIdEl.value || "song.untitled",
    channel: channelEl.value || "feedback",
    description: descriptionEl.value || undefined,
    segments: segments.map((s) => {
      const base = {
        type: s.type,
        intensity: clamp(s.intensity, 0, 1),
        durationMs: clamp(s.durationMs, 10, 5000),
      };
      if (s.direction) base.direction = s.direction;
      if (s.textureId) base.textureId = s.textureId;
      return base;
    }),
  };
  return pattern;
}

function updateOutput() {
  const pattern = buildPatternJson();
  outputEl.value = JSON.stringify(pattern, null, 2);
}

function addSegment(type) {
  const base = {
    type,
    intensity: type === "ramp" ? 0.6 : 0.9,
    durationMs: type === "ramp" ? 600 : 180,
    direction: undefined,
    textureId: type === "texture" ? "smooth" : undefined,
  };
  segments.push(base);
  renderSegments();
  updateOutput();
}

addPulseBtn.addEventListener("click", () => addSegment("pulse"));
addRampBtn.addEventListener("click", () => addSegment("ramp"));
addTextureBtn.addEventListener("click", () => addSegment("texture"));

clearAllBtn.addEventListener("click", () => {
  if (!segments.length) return;
  if (confirm("Clear all segments?")) {
    segments = [];
    renderSegments();
    updateOutput();
  }
});

copyJsonBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(outputEl.value);
    copyJsonBtn.textContent = "✅ Copied!";
    setTimeout(() => (copyJsonBtn.textContent = "📋 Copy JSON"), 1200);
  } catch {
    alert("Could not copy to clipboard. Please copy manually.");
  }
});

function loadPresetRise() {
  segments = [
    { type: "ramp", intensity: 0.4, durationMs: 400, direction: "bottom" },
    { type: "ramp", intensity: 0.6, durationMs: 400, direction: "center" },
    { type: "ramp", intensity: 0.9, durationMs: 400, direction: "top" },
  ];
  songIdEl.value = "song.rising_swell";
  descriptionEl.value = "Three‑step rising swell from bottom to top.";
  renderSegments();
  updateOutput();
}

function loadPresetHeartbeat() {
  segments = [
    { type: "pulse", intensity: 0.9, durationMs: 120, direction: "center" },
    { type: "pulse", intensity: 0.7, durationMs: 90, direction: "center" },
    { type: "pulse", intensity: 0.0, durationMs: 220, direction: "center" },
    { type: "pulse", intensity: 0.9, durationMs: 120, direction: "center" },
    { type: "pulse", intensity: 0.7, durationMs: 90, direction: "center" },
  ];
  songIdEl.value = "song.heartbeat";
  descriptionEl.value = "Double‑beat heartbeat pattern.";
  renderSegments();
  updateOutput();
}

function loadPresetOrbit() {
  segments = [
    { type: "pulse", intensity: 0.7, durationMs: 160, direction: "left" },
    { type: "pulse", intensity: 0.7, durationMs: 160, direction: "top" },
    { type: "pulse", intensity: 0.7, durationMs: 160, direction: "right" },
    { type: "pulse", intensity: 0.7, durationMs: 160, direction: "bottom" },
  ];
  songIdEl.value = "song.orbit_loop";
  descriptionEl.value = "Four‑beat orbit around the device.";
  renderSegments();
  updateOutput();
}

presetRiseBtn.addEventListener("click", loadPresetRise);
presetHeartbeatBtn.addEventListener("click", loadPresetHeartbeat);
presetOrbitBtn.addEventListener("click", loadPresetOrbit);

// Initialize with a simple two‑beat pattern
segments = [
  { type: "pulse", intensity: 0.9, durationMs: 180, direction: "center" },
  { type: "pulse", intensity: 0.6, durationMs: 220, direction: "center" },
];
renderSegments();
updateOutput();
