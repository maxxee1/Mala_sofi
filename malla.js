// Definición de la malla con todos los ramos y prerequisitos
const courses = [
  { code: "IC1103", name: "Intro Prog", prereq: [] },
  { code: "MAT1107", name: "Intro Cálculo", prereq: [] },
  { code: "MAT1207", name: "Intro Álgebra", prereq: [] },
  { code: "MAT0007", name: "Taller Matemáticas", prereq: [] },
  { code: "OFG1", name: "OFG (FIL2001)", prereq: [] },

  { code: "IIC2233", name: "Prog Avanzada", prereq: ["IC1103"] },
  { code: "MAT1610", name: "Cálculo I", prereq: ["MAT1107"] },
  { code: "IMT2210", name: "Álgebra Lineal CD", prereq: ["IC1103", "MAT1107", "MAT1207"] },
  { code: "IMT2200", name: "Intro Ciencia Datos", prereq: ["IC1103", "MAT1207"] },
  { code: "OFG2", name: "OFG (Teológico)", prereq: [] },

  { code: "IMT2220", name: "Cálculo CD", prereq: ["MAT1610"] },
  { code: "IMT2230", name: "Álgebra Avanzada", prereq: ["MAT1610", "IMT2210"] },
  { code: "ETI195", name: "Ética CD", prereq: ["IIC2233", "IMT2200"] },
  { code: "IIC1253", name: "Matemáticas Discretas", prereq: ["IMT2210"] },
  { code: "OFG3", name: "OFG", prereq: [] },

  { code: "EYP1025", name: "Modelos Probabilísticos", prereq: ["IMT2220", "IMT2230"] },
  { code: "IC2133", name: "Estructuras Datos", prereq: ["IIC2233", "IIC1253"] },
  { code: "IC2413", name: "Bases de Datos", prereq: ["IIC2233"] },
  { code: "IMT2250", name: "Optimización CD", prereq: ["IMT2220", "IMT2210"] },
  { code: "OFG4", name: "OFG", prereq: [] },

  { code: "EYP2114", name: "Inferencia Estadística", prereq: ["EYP1025"] },
  { code: "IIC2613", name: "Inteligencia Artificial", prereq: ["EYP1025", "IIC2233"] },
  { code: "LIC2440", name: "Proc Datos Masivos", prereq: ["IC2413", "IC2133"] },
  { code: "OFG5", name: "OFG", prereq: [] },

  { code: "EYP2101", name: "Procesos Estocásticos", prereq: ["EYP2114"] },
  { code: "EYP2301", name: "Análisis Regresión", prereq: ["EYP2114"] },
  { code: "C2026", name: "Visualización Info", prereq: ["IC1103"] },
  { code: "IIC2433", name: "Minería Datos", prereq: ["IC1103", "EYP1025", "IMT2210"] },
  { code: "OFG6", name: "OFG", prereq: [] },

  { code: "EYP2111", name: "Simulación", prereq: ["EYP2101"] },
  { code: "EYP2801", name: "Métodos Bayesianos", prereq: ["EYP2114"] },
  { code: "IMT2260", name: "Teoría Aprendizaje Automático", prereq: ["EYP2114", "LIC2440", "IMT2250"] },
  { code: "OFG7", name: "OFG", prereq: [] },

  { code: "IMT2270", name: "Proyecto Graduación", prereq: ["EYP2801", "IMT2260", "IMT2250", "ETI195"] },
  { code: "OFG8", name: "OFG", prereq: [] },
];

// Render dinámico de la grilla
const grid = document.getElementById("grid");
courses.forEach(c => {
  const div = document.createElement("div");
  div.classList.add("cell");
  div.dataset.code = c.code;
  div.innerHTML = `<strong>${c.code}</strong><br>${c.name}`;
  grid.appendChild(div);
});

// Generar mapa de prerequisitos
const prerequisites = {};
courses.forEach(c => {
  prerequisites[c.code] = c.prereq;
});

// Conectar lógica
const svg = document.querySelector(".connections");
const cells = Array.from(document.querySelectorAll(".cell"));
const cellMap = {};
cells.forEach(cell => {
  const code = cell.dataset.code;
  if (code) cellMap[code] = cell;
});

cells.forEach(cell => {
  cell.addEventListener("mouseenter", () => drawArrowsFrom(cell.dataset.code));
  cell.addEventListener("mouseleave", clearArrows);
  cell.addEventListener("click", () => {
    cell.classList.toggle("completed");
  });
});

function drawArrowsFrom(code) {
  clearArrows();
  if (!code) return;
  const targets = Object.entries(prerequisites)
    .filter(([child, reqs]) => reqs.includes(code))
    .map(([child]) => child);

  targets.forEach(targetCode => {
    drawArrowBetween(cellMap[code], cellMap[targetCode]);
  });
}

function drawArrowBetween(fromCell, toCell) {
  if (!fromCell || !toCell) return;
  const fromRect = fromCell.getBoundingClientRect();
  const toRect = toCell.getBoundingClientRect();
  const svgRect = svg.getBoundingClientRect();

  const x1 = fromRect.left + fromRect.width / 2 - svgRect.left;
  const y1 = fromRect.top + fromRect.height / 2 - svgRect.top;
  const x2 = toRect.left + toRect.width / 2 - svgRect.left;
  const y2 = toRect.top + toRect.height / 2 - svgRect.top;

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.classList.add("line");
  svg.appendChild(line);
}

function clearArrows() {
  svg.innerHTML = `<defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z"></path>
    </marker>
  </defs>`;
}

clearArrows();
