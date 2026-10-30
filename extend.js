const EXTRA = {
  STEEL: {
    economy: 3,
    fire: 2,
    eco: 3,
    thermal: 1,
    light: 0,
    density: 7850,
    E: 200,
    ss: 45,
    k: 50,
    exp: 12,
    co2: 1.5,
  },
  CONCRETE: {
    economy: 5,
    fire: 5,
    eco: 2,
    thermal: 2,
    light: 0,
    density: 2400,
    E: 30,
    ss: 12,
    k: 1.7,
    exp: 10,
    co2: 0.13,
  },
  TIMBER: {
    economy: 4,
    fire: 1,
    eco: 5,
    thermal: 4,
    light: 0,
    density: 575,
    E: 11,
    ss: 73,
    k: 0.13,
    exp: 5,
    co2: 0.4,
  },
  BRICK: {
    economy: 4,
    fire: 5,
    eco: 3,
    thermal: 3,
    light: 0,
    density: 1900,
    E: 15,
    ss: 11,
    k: 0.7,
    exp: 6,
    co2: 0.24,
  },
  GLASS: {
    economy: 2,
    fire: 1,
    eco: 3,
    thermal: 2,
    light: 5,
    density: 2500,
    E: 70,
    ss: 16,
    k: 1.0,
    exp: 9,
    co2: 1.2,
  },
  ALUMINIUM: {
    economy: 2,
    fire: 1,
    eco: 2,
    thermal: 1,
    light: 0,
    density: 2700,
    E: 69,
    ss: 102,
    k: 205,
    exp: 23,
    co2: 8.2,
  },
};

MATERIALS.forEach((m) => {
  const x = EXTRA[m.name];
  m.s = {
    strength: m.strength,
    durability: m.durability,
    lightness: 6 - m.weight,
    flexibility: m.flexibility,
    economy: x.economy,
    fire: x.fire,
    eco: x.eco,
    thermal: x.thermal,
    light: x.light,
  };
});

const CRITERIA = {
  strength: "raw strength",
  durability: "durability",
  lightness: "low self-weight",
  flexibility: "ductility",
  economy: "cost economy",
  fire: "fire safety",
  eco: "sustainability",
  thermal: "insulation",
  light: "daylight transmission",
};

const $ = (id) => document.getElementById(id);
const mById = (id) => MATERIALS.find((m) => m.id === id);
const COLORS = ["#e3b866", "#4fb3a9", "#e0592a"];

document.querySelectorAll(".depth-mark").forEach((e) => (e.style.top = ""));
const _go = go;
go = function (v) {
  _go(v);
  if (v === "detail") {
    const d = document.querySelector('.depth-mark[data-view="database"]');
    if (d) d.classList.add("on");
    $("depthFill").style.left = "27%";
  }
  if (v === "home") countUp();
};

for (let i = 0; i < 16; i++) {
  const b = document.createElement("div");
  const s = 4 + Math.random() * 16;
  b.className = "bubble";
  b.style.cssText = `left: ${Math.random() * 100}%;
                     width: ${s}px;
                     height: ${s}px;
                     animation-duration: ${14 + Math.random() * 22}s;
                     animation-delay: ${-Math.random() * 30}s;
                     --drift: ${(Math.random() - 0.5) * 80}px`;
  document.body.appendChild(b);
}

const PROJECTS = [
  {
    id: "highrise",
    code: "P-01",
    name: "High-Rise Tower",
    blurb: "40+ storeys of wind, gravity and fire risk.",
    w: {
      strength: 5,
      durability: 3,
      lightness: 3,
      flexibility: 3,
      fire: 4,
      economy: 2,
    },
    note: "Tall buildings are a steel frame wrapped around a concrete core. Concrete stiffens and fireproofs; steel carries the span. Timber and glass play supporting roles.",
  },
  {
    id: "bridge",
    code: "P-02",
    name: "Long-Span Bridge",
    blurb: "Tension, fatigue, weather - for a century.",
    w: { strength: 5, durability: 4, flexibility: 4, lightness: 3, economy: 2 },
    note: "Steel's ductility gives warning before failure, which matters when the load is a moving one. Concrete decks ride on top.",
  },
  {
    id: "house",
    code: "P-03",
    name: "Family Home",
    blurb: "Warm, affordable, built to last a lifetime.",
    w: { economy: 4, thermal: 4, eco: 3, durability: 3, fire: 3, lightness: 2 },
    note: "Brick and timber dominate low-rise living because they insulate and cost less. Concrete handles the slab; glass is used sparingly.",
  },
  {
    id: "foundation",
    code: "P-04",
    name: "Foundation & Basement",
    blurb: "Everything above rests on this. Compression, damp, decades.",
    w: { strength: 4, durability: 5, economy: 4, fire: 2 },
    note: "Concrete is compression-strong, poured to shape, and cheap. Steel rebar quietly supplies the tension it lacks.",
  },
  {
    id: "facade",
    code: "P-05",
    name: "Glazed Facade",
    blurb: "Daylight, views, and a skin that stays light.",
    w: { light: 5, thermal: 3, lightness: 3, durability: 3, strength: 1 },
    note: "Glass carries the view; aluminium frames it. Multi-pane units fix glass's poor insulation.",
  },
  {
    id: "warehouse",
    code: "P-06",
    name: "Warehouse / Hangar",
    blurb: "Wide open floor, minimal columns, tight budget.",
    w: { strength: 4, lightness: 4, economy: 4, flexibility: 3, fire: 2 },
    note: "Portal steel frames clear huge spans fast. Aluminium cladding and roofing keeps the dead load down.",
  },
  {
    id: "boundary",
    code: "P-07",
    name: "Boundary Wall",
    blurb: "Cheap, permanent, indifferent to rain.",
    w: { durability: 5, economy: 5, fire: 3, thermal: 2 },
    note: "Brick and concrete block win on price and weather resistance. Nothing here needs to flex.",
  },
  {
    id: "heritage",
    code: "P-08",
    name: "Heritage Restoration",
    blurb: "Match the original. Respect the age.",
    w: { durability: 5, eco: 3, thermal: 3, fire: 3, economy: 2 },
    note: "Brick and timber are the original vocabulary of most heritage fabric; matching them keeps behaviour compatible with old walls.",
  },
  {
    id: "seismic",
    code: "P-09",
    name: "Earthquake Zone",
    blurb: "Light, ductile, forgiving.",
    w: { flexibility: 5, lightness: 4, strength: 4, durability: 3, fire: 2 },
    note: "Ductile materials bend instead of snapping, and light ones attract less seismic force. Brittle masonry and glass need special detailing.",
  },
];

function countUp() {
  document.querySelectorAll(".fsval").forEach((el) => {
    const t = +el.dataset.to;
    let n = 0;
    const id = setInterval(() => {
      n++;
      el.textContent = n;
      if (n >= t) clearInterval(id);
    }, 600 / t);
  });
}

function renderHome() {
  $("facilitySummary").innerHTML = [
    [MATERIALS.length, "Specimens catalogued"],
    [PROJECTS.length, "Application profiles"],
    [Object.keys(CRITERIA).length - 1, "Graded parameters"],
  ]
    .map(([n, l]) => `<div class="fs-stat"><div class="fsval" data-to="${n}">0</div><div class="fslabel">${l}</div></div>`)
    .join("");
  const m = MATERIALS[new Date().getDate() % MATERIALS.length];
  $("featuredSpecimen").innerHTML = `
    <div><div class="featured-tag">SPECIMEN OF THE DAY · ${m.role}</div>
    <h3>${m.name}</h3><p>${m.pros[0]}. Watch for: ${m.cons[0].toLowerCase()}.</p></div>
    <div class="featured-cta">OPEN RECORD →</div>`;
  $("featuredSpecimen").onclick = () => openDetail(m.id);
}

// projects
function scoreFor(m, p) {
  let tot = 0,
    wt = 0;
  for (const k in p.w) {
    tot += p.w[k] * m.s[k];
    wt += p.w[k];
  }
  return Math.round((tot / wt / 5) * 100);
}
function reasonFor(m, p) {
  const parts = Object.keys(p.w).map((k) => ({
    k,
    c: p.w[k] * m.s[k],
    v: m.s[k],
    w: p.w[k],
  }));
  const best = [...parts]
    .sort((a, b) => b.c - a.c)
    .slice(0, 2)
    .filter((x) => x.v >= 3)
    .map((x) => CRITERIA[x.k]);
  const weak = parts.filter((x) => x.w >= 2).sort((a, b) => a.v - b.v)[0];
  let s = best.length
    ? `Strong on ${best.join(" and ")}.`
    : "No standout advantages here.";
  if (weak && weak.v <= 2) s += ` Held back by ${CRITERIA[weak.k]}.`;
  return s;
}

function renderProjects() {
  $("projGrid").innerHTML = PROJECTS.map(
    (p) => `
    <button class="proj-card" data-id="${p.id}">
      <span class="pcode">${p.code}</span><h3>${p.name}</h3><p>${p.blurb}</p>
      <span class="penter">RUN ASSESSMENT →</span></button>`,
  ).join("");
  document.querySelectorAll(".proj-card").forEach((c) => {
    c.onclick = () => showProject(c.dataset.id);
  });
}

function showProject(id) {
  const p = PROJECTS.find((x) => x.id === id);
  document.querySelectorAll(".proj-card").forEach((c) => {
    c.classList.toggle("sel", c.dataset.id === id);
  });
  const ranked = MATERIALS.map((m) => ({ m, s: scoreFor(m, p) })).sort((a, b) => b.s - a.s);
  const top = ranked[0].s;
  $("projResultTitle").textContent = `${p.name} - RANKED SPECIMENS`;
  $("projResultList").innerHTML =
    ranked
      .map(({ m, s }, i) => {
        const tag =
          i === 0
            ? ["PRIMARY", "t1"]
            : s >= top - 12
              ? ["ALSO VIABLE", "t2"]
              : s >= 55
                ? ["SUPPORTING", "t3"]
                : ["NOT ADVISED", "t4"];
        return `<div class="rec-row" style="--d:${i * 70}ms" onclick="openDetail(${m.id})">
      <div class="rk">${i + 1}</div>
      <div class="rbody"><div class="rname">${m.name}<span class="rtag ${tag[1]}">${tag[0]}</span></div>
        <div class="rbar"><i style="--w:${s}%"></i></div><div class="rwhy">${reasonFor(m, p)}</div></div>
      <div class="rscore">${s}<small>/100</small></div></div>`;
      })
      .join("") + `<div class="rec-note"><b>FIELD NOTE</b> ${p.note}</div>`;
  const r = $("projResult");
  r.classList.add("show");
  r.scrollIntoView({ behavior: "smooth", block: "start" });
}

// compare
const cmpSel = [1, 2];
const AXES = [
  "strength",
  "durability",
  "lightness",
  "flexibility",
  "economy",
  "fire",
  "eco",
  "thermal",
];

const AX_LABEL = {
  strength: "STRENGTH",
  durability: "DURABILITY",
  lightness: "LIGHTNESS",
  flexibility: "FLEXIBILITY",
  economy: "ECONOMY",
  fire: "FIRE",
  eco: "ECO",
  thermal: "INSULATION",
};

function renderChips() {
  $("cmpSelect").innerHTML =
    `<div class="cmp-hint">SELECT 2–3 SPECIMENS</div>` +
    MATERIALS.map((m) => {
      const i = cmpSel.indexOf(m.id);
      return `<button class="chip ${i > -1 ? "on" : ""}" data-id="${m.id}">${i > -1 ? `<i style="background:${COLORS[i]}"></i>` : ""}${m.name}</button>`;
    }).join("");
  document.querySelectorAll("#cmpSelect .chip").forEach((c) => {
    c.onclick = () => {
      const id = +c.dataset.id,
        i = cmpSel.indexOf(id);
      if (i > -1) {
        if (cmpSel.length > 2) cmpSel.splice(i, 1);
      } else {
        if (cmpSel.length >= 3) cmpSel.shift();
        cmpSel.push(id);
      }
      renderChips();
      renderCompare();
    };
  });
}

function radar(ms) {
  const C = 200,
    R = 135,
    n = AXES.length;
  const pt = (i, v) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [C + (Math.cos(a) * R * v) / 5, C + (Math.sin(a) * R * v) / 5];
  };
  
  let g = [1, 2, 3, 4, 5]
    .map((r) => `<polygon points="${AXES.map((_, i) => pt(i, r).join(",")).join(" ")}" fill="none" stroke="#2a3634" stroke-width="${r === 5 ? 1.4 : 0.7}"/>`)
    .join("");
  g += AXES.map((a, i) => {
    const [x, y] = pt(i, 5),
      [lx, ly] = pt(i, 6.0);
    return `<line x1="${C}" y1="${C}" x2="${x}" y2="${y}" stroke="#2a3634" stroke-width=".7"/><text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="9.5" fill="#8a7860" font-family="JetBrains Mono" letter-spacing="1">${AX_LABEL[a]}</text>`;
  }).join("");
  g += ms
    .map((m, k) =>
      `<polygon class="rpoly" style="animation-delay:${k * 120}ms" points="${AXES.map((a, i) => pt(i, m.s[a]).join(",")).join(" ")}" fill="${COLORS[k]}" fill-opacity=".16" stroke="${COLORS[k]}" stroke-width="2" stroke-linejoin="round"/>` +
      AXES.map((a, i) => {
        const [x, y] = pt(i, m.s[a]);
        return `<circle cx="${x}" cy="${y}" r="3" fill="${COLORS[k]}"/>`;
      }).join(""),
    )
    .join("");
  return `<svg viewBox="0 0 400 400" class="radar">${g}</svg>`;
}

function renderCompare() {
  const ms = cmpSel.map(mById);
  const wins = ms.map(() => 0);
  const rows = AXES.map((a) => {
    const max = Math.max(...ms.map((m) => m.s[a])),
      tie = ms.filter((m) => m.s[a] === max).length > 1;
    return `<div class="cmp-row"><div class="cmp-ax">${AX_LABEL[a]}</div><div class="cmp-bars">${ms
      .map((m, k) => {
        const win = m.s[a] === max && !tie;
        if (win) wins[k]++;
        return `<div class="cb"><i style="--w:${m.s[a] * 20}%;background:${COLORS[k]}"></i><span class="${win ? "win" : ""}">${m.s[a]}${win ? " ▲" : ""}</span></div>`;
      })
      .join("")}</div></div>`;
  }).join("");
  const lead = wins.indexOf(Math.max(...wins));
  const verdict =
    Math.max(...wins) === 0
      ? "A dead heat - no specimen leads outright on any parameter."
      : `<b style="color:${COLORS[lead]}">${ms[lead].name}</b> leads outright on ${wins[lead]} of ${AXES.length} parameters.`;
  const spec = (label, f) =>
    `<div class="cmp-spec"><span>${label}</span>${ms.map((m, k) => `<span style="color:${COLORS[k]}">${f(m)}</span>`).join("")}</div>`;
  $("cmpPanel").innerHTML = `
    <div class="cmp-top">${radar(ms)}
      <div class="cmp-side"><div class="cmp-legend">${ms.map((m, k) => `<span><i style="background:${COLORS[k]}"></i>${m.name}</span>`).join("")}</div>
      <div class="cmp-verdict">${verdict}</div>${rows}</div></div>
    <div class="cmp-specs" style="--n:${ms.length}"><h4>FIELD DATA</h4>
      ${spec("DENSITY", (m) => m.density)}${spec("STRENGTH", (m) => m.yield)}${spec("TENSILE", (m) => m.tensile)}${spec("FIRE", (m) => m.fire)}${spec("STANDARD", (m) => m.standard)}</div>`;
}

// technical register
const TCOLS = [
  ["density", "DENSITY", "kg/m³", 0],
  ["E", "STIFFNESS (E)", "GPa", 0],
  ["ss", "SPECIFIC STRENGTH", "kN·m/kg", 0],
  ["k", "CONDUCTIVITY", "W/m·K", 2],
  ["exp", "THERMAL EXPANSION", "µm/m·K", 0],
  ["co2", "EMBODIED CO₂", "kg CO₂e/kg", 2],
];
let tSort = { key: "ss", dir: -1 };
function renderTech() {
  const rows = [...MATERIALS].sort((a, b) => (EXTRA[a.name][tSort.key] - EXTRA[b.name][tSort.key]) * tSort.dir);
  const maxes = {};
  TCOLS.forEach(([k]) => (maxes[k] = Math.max(...MATERIALS.map((m) => EXTRA[m.name][k]))));
  $("techGrid").innerHTML = `
    <div class="tech-wrap"><table class="tech-table"><thead><tr><th>SPECIMEN</th>${TCOLS.map(
      ([k, l, u]) =>
        `<th data-k="${k}" class="${tSort.key === k ? "sorted" : ""}">${l}<small>${u}</small><b>${tSort.key === k ? (tSort.dir > 0 ? "▲" : "▼") : "↕"}</b></th>`,
    ).join("")}</tr></thead>
    <tbody>${rows
      .map(
        (m) =>
          `<tr onclick="openDetail(${m.id})"><td class="tn">${m.name}</td>${TCOLS.map(
            ([k, , , d]) => {
              const v = EXTRA[m.name][k];
              return `<td><span>${v.toLocaleString("en-US", { maximumFractionDigits: d })}</span><i style="--w:${Math.max(4, (v / maxes[k]) * 100)}%"></i></td>`;
            },
          ).join("")}</tr>`,
      )
      .join("")}</tbody></table></div>
    <div class="tech-notes">
      <div><h5>READING THE REGISTER</h5><p>Click a column to rank the specimens. Bars show each value against the highest in that column. Click a row to open its full record.</p></div>
      <div><h5>SPECIFIC STRENGTH</h5><p>Yield (or compressive) strength divided by density - how much load a kilogram can carry. It's why timber and aluminium punch above their weight.</p></div>
      <div><h5>EMBODIED CARBON</h5><p>Per kilogram, concrete looks gentle and aluminium brutal. Per structure, concrete's sheer volume changes the story. Compare by element, not by kilo.</p></div>
      <div><h5>CAUTION</h5><p>Values are typical, indicative figures for orientation. Real design needs the grade, code and a licensed engineer.</p></div>
    </div>`;
  document.querySelectorAll(".tech-table th[data-k]").forEach((th) => {
    th.onclick = () => {
      const k = th.dataset.k;
      tSort = { key: k, dir: tSort.key === k ? -tSort.dir : -1 };
      renderTech();
    };
  });
}

renderHome();
renderProjects();
renderChips();
renderCompare();
renderTech();

const _dial = dialSVG;
const DIAL_REMAP = {
  "#4a3a26": "#b79b62",
  "#2a2015": "#76643f",
  "#150f0a": "#40341f",
  "#1c1712": "#35504f",
  "#0c0906": "#1b3234",
  "#c4a870": "#fbe9b4",
  "#6b5836": "#c3aa74",
  "#c0392b": "#ff5a36",
  "#8a7248": "#e8c77f",
  "#5a4a34": "#d2bb88",
  "#a8461f": "#f0793f",
};
dialSVG = (p, id) => {
  let s = _dial(p, id);
  for (const [from, to] of Object.entries(DIAL_REMAP)) s = s.replaceAll(from, to);
  return s;
};
document.addEventListener("click", (e) => {
  const r = e.target.closest(".redact");
  if (r) r.classList.toggle("open");
});