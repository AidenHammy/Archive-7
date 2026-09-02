const MATERIALS = [
  {
    id: 1,
    name: "STEEL",
    role: "STRUCTURAL",
    strength: 5,
    durability: 4,
    weight: 2,
    flexibility: 5,
    density: "7,850 kg/m³",
    yield: "355 MPa (Grade S355)",
    tensile: "470-630 MPa",
    fire: "Fails ~550°C, needs fireproofing",
    standard: "EN 10025 / ASTM A36",
    pros: [
      "Highest strength-to-cost ratio",
      "Ductile — bends before it breaks",
      "Fully recyclable",
    ],
    cons: [
      "Corrodes without coating",
      "Heavy to transport",
      "Needs fire protection",
    ],
    apps: ["High-rises", "Bridges", "Long-span roofs", "Reinforcement"],
  },
  {
    id: 2,
    name: "CONCRETE",
    role: "STRUCTURAL / MASS",
    strength: 4,
    durability: 5,
    weight: 5,
    flexibility: 1,
    density: "2,400 kg/m³",
    yield: "25-40 MPa compressive",
    tensile: "~3 MPa (needs rebar)",
    fire: "Excellent — inherently fire resistant",
    standard: "ACI 318 / EN 1992",
    pros: [
      "Extremely strong in compression",
      "Fireproof and low-maintenance",
      "Cast into any shape",
    ],
    cons: [
      "Weak in tension without steel",
      "Heavy, high transport cost",
      "Curing time delays schedule",
    ],
    apps: ["Foundations", "Slabs", "Columns", "Retaining walls"],
  },
  {
    id: 3,
    name: "TIMBER",
    role: "STRUCTURAL / FINISH",
    strength: 3,
    durability: 3,
    weight: 1,
    flexibility: 4,
    density: "450-700 kg/m³",
    yield: "40 MPa parallel to grain",
    tensile: "6-10 MPa perpendicular",
    fire: "Combustible but chars predictably",
    standard: "EN 338 / NDS",
    pros: [
      "Renewable, low embodied carbon",
      "Excellent strength-to-weight ratio",
      "Easy on-site modification",
    ],
    cons: [
      "Directional strength (grain-dependent)",
      "Vulnerable to moisture and pests",
      "Combustible",
    ],
    apps: [
      "Residential framing",
      "Roof trusses",
      "Interior finishing",
      "Low-rise structures",
    ],
  },
  {
    id: 4,
    name: "BRICK",
    role: "MASONRY / ENVELOPE",
    strength: 3,
    durability: 5,
    weight: 4,
    flexibility: 1,
    density: "1,700-2,100 kg/m³",
    yield: "10-35 MPa compressive",
    tensile: "Negligible",
    fire: "Excellent — non-combustible",
    standard: "ASTM C62 / EN 771",
    pros: [
      "Extremely durable, centuries-long lifespan",
      "Fireproof and low maintenance",
      "Good thermal mass",
    ],
    cons: [
      "Labor-intensive to install",
      "Weak in tension, needs reinforcement",
      "Heavy, high transport cost",
    ],
    apps: [
      "Load-bearing walls",
      "Facades",
      "Boundary walls",
      "Heritage restoration",
    ],
  },
  {
    id: 5,
    name: "GLASS",
    role: "ENVELOPE / FINISH",
    strength: 2,
    durability: 3,
    weight: 2,
    flexibility: 1,
    density: "2,500 kg/m³",
    yield: "~1,000 MPa theoretical (defect-limited)",
    tensile: "~40 MPa (annealed)",
    fire: "Softens ~600°C, cracks under thermal shock",
    standard: "ASTM E1300 / EN 572",
    pros: [
      "Full daylight transmission",
      "Recyclable indefinitely",
      "Wide range of performance coatings",
    ],
    cons: [
      "Brittle — fails suddenly without warning",
      "Poor insulator unless multi-pane",
      "Expensive at large structural spans",
    ],
    apps: ["Curtain walls", "Windows", "Skylights", "Interior partitions"],
  },
  {
    id: 6,
    name: "ALUMINIUM",
    role: "STRUCTURAL / FACADE",
    strength: 3,
    durability: 4,
    weight: 1,
    flexibility: 4,
    density: "2,700 kg/m³",
    yield: "95-500 MPa (alloy dependent)",
    tensile: "110-570 MPa",
    fire: "Melts ~660°C, no toxic smoke",
    standard: "EN 573 / ASTM B221",
    pros: [
      "One-third the weight of steel",
      "Naturally corrosion resistant",
      "Highly recyclable, low re-processing energy",
    ],
    cons: [
      "Lower strength than steel at equal volume",
      "Higher raw production cost",
      "Loses strength rapidly in fire",
    ],
    apps: [
      "Curtain wall framing",
      "Roofing",
      "Window frames",
      "Lightweight structures",
    ],
  },
];

// boot sequence
function bootSequence(lines, onDone) {
  const overlay = document.getElementById("bootOverlay");
  overlay.innerHTML = lines
    .map(
      (l, i) =>
        `<div class="line" id="bl${i}">${l}<span class="cursor"></span></div>`,
    )
    .join("");
  overlay.classList.add("active");
  lines.forEach((l, i) => {
    setTimeout(() => {
      const el = document.getElementById(`bl${i}`);
      if (el) {
        el.style.animation = "typein 0.05s forwards";
        el.querySelector(".cursor").style.display =
          i === lines.length - 1 ? "none" : "inline-block";
        if (i > 0)
          document
            .getElementById(`bl${i - 1}`)
            .querySelector(".cursor").style.display = "none";
      }
    }, i * 200);
  });
  setTimeout(
    () => {
      overlay.classList.remove("active");
      onDone();
    },
    lines.length * 200 + 240,
  );
}

// database grid
const dbGrid = document.getElementById("dbGrid");
MATERIALS.forEach((m, i) => {
  const meter = (val) =>
    Array.from(
      { length: 5 },
      (_, i) => `<i class="${i < val ? "fill" : ""}"></i>`,
    ).join("");
  const card = document.createElement("div");
  card.className = "mat-card";
  card.onclick = () => openDetail(m.id);
  card.innerHTML = `
    <div class="classcode">CLS-0${i + 1}-${m.name.slice(0, 3)}</div>
    <div class="role">${m.role}</div>
    <h3>${m.name}</h3>
    <div class="stat-row"><span class="label">STRENGTH</span><div class="meter">${meter(m.strength)}</div></div>
    <div class="stat-row"><span class="label">DURABILITY</span><div class="meter">${meter(m.durability)}</div></div>
    <div class="stat-row"><span class="label">WEIGHT</span><div class="meter">${meter(m.weight)}</div></div>
    <div class="stat-row"><span class="label">FLEXIBILITY</span><div class="meter">${meter(m.flexibility)}</div></div>
    <div class="enter">VIEW RECORD →</div>
  `;
  dbGrid.appendChild(card);
});

function openDetail(id) {
  const m = MATERIALS.find((x) => x.id === id);
  bootSequence(
    [
      `RETRIEVING RECORD 0${m.id}...`,
      `VERIFYING STRUCTURAL CLASSIFICATION...`,
      `RECORD RECOVERED. SEAL INTACT.`,
    ],
    () => {
      document.getElementById("dTitle").textContent = m.name;
      document.getElementById("dRole").textContent = `ROLE — ${m.role}`;
      const sealYear = 1927 + ((m.id * 7) % 40);
      const sealNote = [
        "RE-SEALED",
        "CONDITION VERIFIED",
        "PENDING REVIEW",
        "RECOVERED INTACT",
        "PARTIALLY LEGIBLE",
        "ARCHIVIST APPROVED",
      ][m.id % 6];
      document.getElementById("dSeal").innerHTML =
        `${sealNote}<br>EST. ${sealYear}`;
      const specs = [
        ["STRENGTH", m.strength * 20, "rd1"],
        ["DURABILITY", m.durability * 20, "rd2"],
        ["WEIGHT", m.weight * 20, "rd3"],
        ["FLEXIBILITY", m.flexibility * 20, "rd4"],
      ];
      document.getElementById("dDials").innerHTML = specs
        .map(
          ([l, v, id]) => `
      <div class="dial-block">${dialSVG(v, id)}<div class="dial-label">${l}</div><div class="dial-val">${v / 20}/5</div></div>
    `,
        )
        .join("");
      document.getElementById("dPros").innerHTML = m.pros
        .map((p) => `<li>${p}</li>`)
        .join("");
      document.getElementById("dCons").innerHTML = m.cons
        .map((p) => `<li><span class="redact">${p}</span></li>`)
        .join("");
      document.getElementById("dApps").innerHTML = m.apps
        .map((a) => `<span class="app-tag">${a}</span>`)
        .join("");
      document.getElementById("dData").innerHTML = `
      <div class="data-row"><span>DENSITY</span><span>${m.density}</span></div>
      <div class="data-row"><span>STRENGTH</span><span>${m.yield}</span></div>
      <div class="data-row"><span>TENSILE</span><span>${m.tensile}</span></div>
      <div class="data-row"><span>FIRE PERFORMANCE</span><span>${m.fire}</span></div>
      <div class="data-row"><span>STANDARD</span><span>${m.standard}</span></div>
    `;
      go("detail");
      specs.forEach(([, v, id]) => sweepDial(id, v));
    },
  );
}

// ---- nav ----
function go(viewName){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+ viewName).classList.add('active');
  document.querySelectorAll('.depth-mark').forEach(b => b.classList.remove('on'));
  const navBtn = document.querySelector(`.depth-mark[data-view="${viewName}"]`);
  if(navBtn){
    navBtn.classList.add('on');
    const depthPct = navBtn.style.top;
    document.getElementById('depthFill').style.height = depthPct;
  }
  window.scrollTo({top:0, behavior:'instant'});
  if(viewName === 'compare'){ renderChips(); renderCompare(); }
}
document.querySelectorAll('.depth-mark').forEach(b => {
  b.addEventListener('click', ()=>{
    const view = b.getAttribute('data-view');
    if(view === 'database' || view === 'home'){ go(view); return; }
    bootSequence([`ACCESSING REGISTRY: ${view.toUpperCase()}...`,`RECORD RECOVERED.`], () => go(view));
  });
});