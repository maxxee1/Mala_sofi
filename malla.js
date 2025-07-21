// malla.js

// Datos de la malla: cada ramo con código, nombre, prereqs (códigos) y semestre
const RAMOS = [
  // 1er semestre
  { code: "IC1103", name: "INTRODUCCIÓN A LA PROGRAMACIÓN", prereq: [], sem: 1 },
  { code: "MAT1107", name: "INTRODUCCIÓN AL CÁLCULO", prereq: [], sem: 1 },
  { code: "MAT1207", name: "INTRODUCCIÓN AL ÁLGEBRA Y GEOMETRÍA", prereq: [], sem: 1 },
  { code: "MAT0007", name: "TALLER DE MATEMÁTICAS PARA ESTADISTICA", prereq: [], sem: 1 },
  { code: "OFG_FIL2001", name: "OFG (FIL2001)", prereq: [], sem: 1 },

  // 2do semestre
  { code: "IIC2233", name: "PROGRAMACIÓN AVANZADA", prereq: ["IC1103"], sem: 2 },
  { code: "MAT1610", name: "CÁLCULO I", prereq: ["MAT1107"], sem: 2 },
  { code: "IMT2210", name: "ÁLGEBRA LINEAL PARA CIENCIA DE DATOS", prereq: ["IC1103", "MAT1610", "MAT1207"], sem: 2 },
  { code: "IMT2200", name: "INTRODUCCIÓN A CIENCIA DE DATOS", prereq: ["IC1103", "MAT1207"], sem: 2 },
  { code: "OFG_TEOLOGICO", name: "OFG (TEOLOGICO)", prereq: [], sem: 2 },

  // 3er semestre
  { code: "IMT2220", name: "CÁLCULO PARA CIENCIA DE DATOS", prereq: ["MAT1610"], sem: 3 },
  { code: "IMT2230", name: "ÁLGEBRA LINEAL AVANZADA Y MODELAMIENTO", prereq: ["MAT1610", "IMT2210"], sem: 3 },
  { code: "ETI195", name: "ÉTICA PARA CIENCIA DE DATOS Y ESTADÍSTICA", prereq: ["IIC2233", "IMT2200"], sem: 3 },
  { code: "IIC1253", name: "MATEMÁTICAS DISCRETAS", prereq: ["IMT2210"], sem: 3 },
  { code: "OFG3", name: "OFG", prereq: [], sem: 3 },

  // 4to semestre
  { code: "EYP1025", name: "MODELOS PROBABILÍSTICOS", prereq: ["IMT2220", "IMT2230"], sem: 4 },
  { code: "IC2133", name: "ESTRUCTURAS DE DATOS Y ALGORITMOS", prereq: ["IIC2233", "IIC1253"], sem: 4 },
  { code: "IC2413", name: "BASES DE DATOS", prereq: ["IIC2233"], sem: 4 },
  { code: "IMT2250", name: "OPTIMIZACIÓN PARA CIENCIA DE DATOS", prereq: ["IMT2220", "IMT2210"], sem: 4 },
  { code: "OFG4", name: "OFG", prereq: [], sem: 4 },

  // 5to semestre
  { code: "EYP2114", name: "INFERENCIA ESTADÍSTICA", prereq: ["EYP1025"], sem: 5 },
  { code: "IIC2613", name: "INTELIGENCIA ARTIFICIAL", prereq: ["EYP1025", "IIC2233"], sem: 5 },
  { code: "LIC2440", name: "PROCESAMIENTO DATOS MASIVOS", prereq: ["IC2413", "IC2133"], sem: 5 },
  { code: "OPR_MINOR", name: "OPR O MINOR", prereq: [], sem: 5 },
  { code: "OFG5", name: "OFG", prereq: [], sem: 5 },

  // 6to semestre
  { code: "EYP2101", name: "PROCESOS ESTOCÁSTICOS APLICADOS", prereq: ["EYP2114"], sem: 6 },
  { code: "EYP2301", name: "ANÁLISIS DE REGRESIÓN", prereq: ["EYP2114"], sem: 6 },
  { code: "C2026", name: "VISUALIZACIÓN DE INFORMACIÓN", prereq: ["IC1103"], sem: 6 },
  { code: "IIC2433", name: "MINERÍA DE DATOS", prereq: ["IC1103", "EYP1025", "IMT2210"], sem: 6 },
  { code: "OFG6", name: "OFG", prereq: [], sem: 6 },

  // 7mo semestre
  { code: "EYP2111", name: "SIMULACIÓN", prereq: ["EYP2101"], sem: 7 },
  { code: "EYP2801", name: "MÉTODOS BAYESIANOS", prereq: ["EYP2114"], sem: 7 },
  { code: "IMT2260", name: "TEORÍA DE APRENDIZAJE AUTOMÁTICO", prereq: ["EYP2114", "LIC2440", "IMT2250"], sem: 7 },
  { code: "OPR_MINOR7", name: "OPR O MINOR", prereq: [], sem: 7 },
  { code: "OFG7", name: "OFG", prereq: [], sem: 7 },

  // 8vo semestre
  { code: "IMT2270", name: "PROYECTO DE GRADUACIÓN", prereq: ["EYP2801", "IMT2260", "IMT2250", "ETI195"], sem: 8 },
  { code: "OPR_MINOR8", name: "OPR O MINOR", prereq: [], sem: 8 },
  { code: "OPR_MINOR8b", name: "OPR O MINOR", prereq: [], sem: 8 },
  { code: "OPR_MINOR8c", name: "OPR O MINOR", prereq: [], sem: 8 },
  { code: "OFG8", name: "OFG", prereq: [], sem: 8 },
];

// Map para acceso rápido por código
const ramosMap = {};
RAMOS.forEach(r => ramosMap[r.code] = r);

// Mapa inverso para saber qué ramos desbloquea un ramo dado
const desbloqueaMap = {};
RAMOS.forEach(r => {
  r.prereq.forEach(pr => {
    if (!desbloqueaMap[pr]) desbloqueaMap[pr] = [];
    desbloqueaMap[pr].push(r.code);
  });
});

// LocalStorage key
const STORAGE_KEY = 'malla_interactiva_aprobados';

// Estado aprobado
let aprobados = new Set();

// Renderiza la malla en columnas (semestres)
function renderMalla() {
  const mallaDiv = document.getElementById('malla');
  mallaDiv.innerHTML = '';

  // Crear columna por semestre
  for(let s=1; s<=8; s++) {
    const semDiv = document.createElement('section');
    semDiv.classList.add('semester');
    semDiv.dataset.semester = s;
    const h2 = document.createElement('h2');
    h2.textContent = s + (s === 1 ? 'ER' : s === 2 ? 'DO' : s === 3 ? 'ER' : s === 4 ? 'TO' : s === 7 ? 'MO' : s === 8 ? 'VO' : 'TO') + ' SEMESTRE';
    semDiv.appendChild(h2);

    // Cursos del semestre
    RAMOS.filter(r => r.sem === s).forEach(ramo => {
      const div = document.createElement('div');
      div.classList.add('course');
      div.dataset.code = ramo.code;
      div.dataset.prereq = ramo.prereq.join(',');
      div.title = ramo.code + ": " + ramo.name;

      // Checkbox oculto
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = ramo.code;

      // Label con texto
      const label = document.createElement('label');
      label.setAttribute('for', ramo.code);
      label.textContent = `[${ramo.code}] ${ramo.name}`;

      // Caja custom para el check
      const customBox = document.createElement('div');
      customBox.classList.add('custom-checkbox');

      div.appendChild(checkbox);
      div.appendChild(customBox);
      div.appendChild(label);

      semDiv.appendChild(div);
    });

    mallaDiv.appendChild(semDiv);
  }
}

// Guarda progreso en localStorage
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(aprobados)));
}

// Carga progreso desde localStorage
function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return new Set();
  try {
    return new Set(JSON.parse(saved));
  } catch {
    return new Set();
  }
}

// Comprueba si todos los prereqs de un ramo están aprobados
function prereqsMet(prereq) {
  return prereq.every(p => aprobados.has(p));
}

// Actualiza UI: bloquea/desbloquea ramos y marca aprobados
function updateUI() {
  document.querySelectorAll('.course').forEach(div => {
    const code = div.dataset.code;
    const prereq = div.dataset.prereq ? div.dataset.prereq.split(',').filter(s => s) : [];

    // OFG y OPR/MINOR siempre desbloqueados
    if (code.startsWith('OFG') || code.startsWith('OPR_MINOR'))
