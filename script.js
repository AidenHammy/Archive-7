const MATS = [
  {
    id: 1, name: "STEEL", role: "STRUCTURAL",
    strength: 5, durability: 4, weight: 2, flexibility: 5,
    density: "7,850 kg/m³", yield: "355 MPa (Grade S355)",
    tensile: "470-630 MPa", fire: "Fails ~550°C, needs fireproofing",
    standard: "EN 10025 / ASTM A36",
    pros: ["Highest strength-to-cost ratio", "Ductile - bends before it breaks", "Fully recyclable"],
    cons: ["Corrodes without coating", "Heavy to transport", "Needs fire protection"],
    apps: ["High-rises", "Bridges", "Long-span roofs", "Reinforcement"],
  },
  {
    id: 2, name: "CONCRETE", role: "STRUCTURAL / MASS",
    strength: 4, durability: 5, weight: 5, flexibility: 1,
    density: "2,400 kg/m³", yield: "25-40 MPa compressive",
    tensile: "~3 MPa (needs rebar)", fire: "Excellent - inherently fire resistant",
    standard: "ACI 318 / EN 1992",
    pros: ["Extremely strong in compression", "Fireproof and low-maintenance", "Cast into any shape"],
    cons: ["Weak in tension without steel", "Heavy, high transport cost", "Curing time delays schedule"],
    apps: ["Foundations", "Slabs", "Columns", "Retaining walls"],
  },
  {
    id: 3, name: "TIMBER", role: "STRUCTURAL / FINISH",
    strength: 3, durability: 3, weight: 1, flexibility: 4,
    density: "450-700 kg/m³", yield: "40 MPa parallel to grain",
    tensile: "6-10 MPa perpendicular", fire: "Combustible but chars predictably",
    standard: "EN 338 / NDS",
    pros: ["Renewable, low embodied carbon", "Excellent strength-to-weight ratio", "Easy on-site modification"],
    cons: ["Directional strength (grain-dependent)", "Vulnerable to moisture and pests", "Combustible"],
    apps: ["Residential framing", "Roof trusses", "Interior finishing", "Low-rise structures"],
  },
  {
    id: 4, name: "BRICK", role: "MASONRY / ENVELOPE",
    strength: 3, durability: 5, weight: 4, flexibility: 1,
    density: "1,700-2,100 kg/m³", yield: "10-35 MPa compressive",
    tensile: "Negligible", fire: "Excellent - non-combustible",
    standard: "ASTM C62 / EN 771",
    pros: ["Extremely durable, centuries-long lifespan", "Fireproof and low maintenance", "Good thermal mass"],
    cons: ["Labor-intensive to install", "Weak in tension, needs reinforcement", "Heavy, high transport cost"],
    apps: ["Load-bearing walls", "Facades", "Boundary walls", "Heritage restoration"],
  },
  {
    id: 5, name: "GLASS", role: "ENVELOPE / FINISH",
    strength: 2, durability: 3, weight: 2, flexibility: 1,
    density: "2,500 kg/m³", yield: "~1,000 MPa theoretical (defect-limited)",
    tensile: "~40 MPa (annealed)", fire: "Softens ~600°C, cracks under thermal shock",
    standard: "ASTM E1300 / EN 572",
    pros: ["Full daylight transmission", "Recyclable indefinitely", "Wide range of performance coatings"],
    cons: ["Brittle - fails suddenly without warning", "Poor insulator unless multi-pane", "Expensive at large structural spans"],
    apps: ["Curtain walls", "Windows", "Skylights", "Interior partitions"],
  },
  {
    id: 6, name: "ALUMINIUM", role: "STRUCTURAL / FACADE",
    strength: 3, durability: 4, weight: 1, flexibility: 4,
    density: "2,700 kg/m³", yield: "95-500 MPa (alloy dependent)",
    tensile: "110-570 MPa", fire: "Melts ~660°C, no toxic smoke",
    standard: "EN 573 / ASTM B221",
    pros: ["One-third the weight of steel", "Naturally corrosion resistant", "Highly recyclable, low re-processing energy"],
    cons: ["Lower strength than steel at equal volume", "Higher raw production cost", "Loses strength rapidly in fire"],
    apps: ["Curtain wall framing", "Roofing", "Window frames", "Lightweight structures"],
  },
];

function dots(val) {
  let out = "";
  for (let i = 0; i < 5; i++) {
    out += `<i class="${i < val ? "fill" : ""}"></i>`;
  }
  return out;
}

function mkDial(pct, dialId) {
  const ticks = [];
  for (let i = 0; i <= 12; i++) {
    const stop = i * (100 / 12);
    const angle = -120 + (stop / 100) * 240;
    const rad = (angle * Math.PI) / 180;
    const major = i % 3 === 0;
    const inner = major ? 30 : 33;
    const x1 = (50 + inner * Math.sin(rad)).toFixed(1);
    const y1 = (50 - inner * Math.cos(rad)).toFixed(1);
    const x2 = (50 + 36 * Math.sin(rad)).toFixed(1);
    const y2 = (50 - 36 * Math.cos(rad)).toFixed(1);
    ticks.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${major ? "#c4a870" : "#6b5836"}" stroke-width="${major ? 1.4 : 0.8}"/>`);
  }

  return `
  <svg width="86" height="86" viewBox="0 0 100 100">
    <defs>
      <radialGradient id="${dialId}-bez" cx="35%" cy="30%" r="75%">
        <stop offset="0%" stop-color="#4a3a26"/><stop offset="55%" stop-color="#2a2015"/><stop offset="100%" stop-color="#150f0a"/>
      </radialGradient>
      <radialGradient id="${dialId}-face" cx="45%" cy="38%" r="70%">
        <stop offset="0%" stop-color="#1c1712"/><stop offset="100%" stop-color="#0c0906"/>
      </radialGradient>
      <linearGradient id="${dialId}-glass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.10)"/><stop offset="35%" stop-color="rgba(255,255,255,0)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#${dialId}-bez)"/>
    <circle cx="50" cy="50" r="48" fill="none" stroke="#0a0705" stroke-width="1"/>
    <circle cx="50" cy="50" r="41" fill="url(#${dialId}-face)"/>
    ${ticks.join("")}
    <path d="M 26 74 A 34 34 0 1 1 74 74" fill="none" stroke="#a8461f" stroke-opacity="0.55" stroke-width="2.5"/>
    <line x1="50" y1="50" x2="50" y2="20" stroke="#c0392b" stroke-width="1.6" id="${dialId}-needle" stroke-linecap="round"
      style="transform-origin:50px 50px; transform: rotate(-120deg); transition: transform 1s cubic-bezier(.2,.8,.2,1);"/>
    <circle cx="50" cy="50" r="3.2" fill="#8a7248" stroke="#3a2d1e" stroke-width="0.8"/>
    <circle cx="50" cy="50" r="48" fill="url(#${dialId}-glass)"/>
    <circle cx="10" cy="10" r="2.4" fill="#5c4a30"/><circle cx="90" cy="10" r="2.4" fill="#5c4a30"/>
    <circle cx="10" cy="90" r="2.4" fill="#5c4a30"/><circle cx="90" cy="90" r="2.4" fill="#5c4a30"/>
    <text x="50" y="66" text-anchor="middle" font-size="5" fill="#5a4a34" font-family="monospace">SN-${dialId.toUpperCase()}</text>
  </svg>`;
}

function swing(dialId, pct) {
  requestAnimationFrame(() => {
    const needle = document.getElementById(dialId + "-needle");
    if (!needle) return;
    needle.style.transform = "rotate(" + (-120 + (pct / 100) * 240) + "deg)";
  });
}

function fakeBoot(lines, done) {
  const overlay = document.getElementById("bootOverlay");
  let html = "";
  lines.forEach((text, i) => {
    html += `<div class="line" id="bl${i}">${text}<span class="cursor"></span></div>`;
  });
  overlay.innerHTML = html;
  overlay.classList.add("active");

  const reveal = (i) => {
    const row = document.getElementById("bl" + i);
    if (!row) return;
    row.style.animation = "typein 0.05s forwards";
    row.querySelector(".cursor").style.display =
      i === lines.length - 1 ? "none" : "inline-block";
    if (i > 0) {
      const prev = document.getElementById("bl" + (i - 1));
      if (prev) prev.querySelector(".cursor").style.display = "none";
    }
  };
  for (let i = 0; i < lines.length; i++) {
    setTimeout(() => reveal(i), i * 200);
  }

  setTimeout(() => {
    overlay.classList.remove("active");
    done();
  }, lines.length * 200 + 240);
}

const dEls = {
  title: document.getElementById("dTitle"),
  role: document.getElementById("dRole"),
  seal: document.getElementById("dSeal"),
  dials: document.getElementById("dDials"),
  pros: document.getElementById("dPros"),
  cons: document.getElementById("dCons"),
  apps: document.getElementById("dApps"),
  data: document.getElementById("dData"),
};

const dialDefs = [
  { label: "STRENGTH", stat: "strength", id: "rd1" },
  { label: "DURABILITY", stat: "durability", id: "rd2" },
  { label: "WEIGHT", stat: "weight", id: "rd3" },
  { label: "FLEXIBILITY", stat: "flexibility", id: "rd4" },
];

const stamps = [
  "RE-SEALED", "CONDITION VERIFIED", "PENDING REVIEW",
  "RECOVERED INTACT", "PARTIALLY LEGIBLE", "ARCHIVIST APPROVED",
];

function peek(id) {
  const mat = MATS.find((rec) => rec.id === id);

  dEls.title.textContent = mat.name;
  dEls.role.textContent = `ROLE - ${mat.role}`;
  dEls.seal.innerHTML = `${stamps[mat.id % stamps.length]}<br>EST. ${1927 + ((mat.id * 7) % 40)}`;

  dEls.dials.innerHTML = dialDefs.map((d) => {
    const rating = mat[d.stat];
    return `<div class="dial-block">${mkDial(rating * 20, d.id)}<div class="dial-label">${d.label}</div><div class="dial-val">${rating}/5</div></div>`;
  }).join("");

  dEls.pros.innerHTML = mat.pros.map((p) => `<li>${p}</li>`).join("");
  let out = "";
  for (const c of mat.cons) {
    out += `<li><span class="redact">${c}</span></li>`;
  }
  dEls.cons.innerHTML = out;
  dEls.apps.innerHTML = mat.apps.map((a) => `<span class="app-tag">${a}</span>`).join("");

  dEls.data.innerHTML = `
    <div class="data-row"><span>DENSITY</span><span>${mat.density}</span></div>
    <div class="data-row"><span>STRENGTH</span><span>${mat.yield}</span></div>
    <div class="data-row"><span>TENSILE</span><span>${mat.tensile}</span></div>
    <div class="data-row"><span>FIRE PERFORMANCE</span><span>${mat.fire}</span></div>
    <div class="data-row"><span>STANDARD</span><span>${mat.standard}</span></div>
  `;

  hop("detail");

  dialDefs.forEach((d) => swing(d.id, mat[d.stat] * 20));
}

const stops = {
  home: "5%",
  database: "27%",
  projects: "50%",
  compare: "73%",
  tech: "95%",
};

function hop(v) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  const view = document.getElementById("view-" + v);
  if (view) view.classList.add("active");

  document.querySelectorAll(".depth-mark").forEach((b) => b.classList.remove("on"));
  const mark = document.querySelector(`.depth-mark[data-view="${v}"]`);
  if (mark) {
    mark.classList.add("on");
    const fill = document.getElementById("depthFill");
    fill.style.width = "8%";
    fill.style.left = stops[v] || "5%";
  }

  window.scrollTo({ top: 0, behavior: "instant" });

  if (v === "compare") {
    if (typeof drawChips === "function") drawChips();
    if (typeof redrawCompare === "function") redrawCompare();
  }
}

function cardBits(mat, idx) {
  return `
    <div class="classcode">CLS-0${idx + 1}-${mat.name.slice(0, 3)}</div>
    <div class="role">${mat.role}</div>
    <h3>${mat.name}</h3>
    <div class="stat-row"><span class="label">STRENGTH</span><div class="meter">${dots(mat.strength)}</div></div>
    <div class="stat-row"><span class="label">DURABILITY</span><div class="meter">${dots(mat.durability)}</div></div>
    <div class="stat-row"><span class="label">WEIGHT</span><div class="meter">${dots(mat.weight)}</div></div>
    <div class="stat-row"><span class="label">FLEXIBILITY</span><div class="meter">${dots(mat.flexibility)}</div></div>
    <div class="enter">VIEW RECORD →</div>
  `;
}

const dbGrid = document.getElementById("dbGrid");

MATS.forEach((mat, i) => {
  const card = document.createElement("div");
  card.className = "mat-card";
  card.onclick = () => peek(mat.id);
  card.innerHTML = cardBits(mat, i);
  dbGrid.appendChild(card);
});

document.querySelectorAll(".depth-mark").forEach((btn) => {
  btn.addEventListener("click", () => hop(btn.dataset.view));
});

window.addEventListener("DOMContentLoaded", () => {
  fakeBoot(
    ["INITIALIZING ARCHIVE-7...", "DECRYPTING DEEP SEA RECORDS...", "SYSTEM NOMINAL. WELCOME, ARCHIVIST."],
    () => hop("home"),
  );
})