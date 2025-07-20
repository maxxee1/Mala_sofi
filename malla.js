const malla = {
  "1ER SEMESTRE": [
    { codigo: "IC1103", nombre: "INTRODUCCIÓN A LA PROGRAMACIÓN" },
    { codigo: "MAT1107", nombre: "INTRODUCCIÓN AL CÁLCULO" },
    { codigo: "MAT1207", nombre: "INTRODUCCIÓN AL ÁLGEBRA Y GEOMETRÍA" },
    { codigo: "MAT0007", nombre: "TALLER DE MATEMÁTICAS PARA ESTADÍSTICA" },
    { codigo: "OFG1", nombre: "OFG (FIL2001)" },
    { codigo: "LIBRE1", nombre: "Ramo Libre" }
  ],
  "2DO SEMESTRE": [
    { codigo: "IIC2233", nombre: "PROGRAMACIÓN AVANZADA", prereqs: ["IC1103"] },
    { codigo: "MAT1610", nombre: "CÁLCULO I", prereqs: ["MAT1107"] },
    { codigo: "IMT2210", nombre: "ÁLGEBRA LINEAL PARA CIENCIA DE DATOS", prereqs: ["IC1103", "MAT1107", "MAT1207"] },
    { codigo: "IMT2200", nombre: "INTRODUCCIÓN A CIENCIA DE DATOS", prereqs: ["IC1103", "MAT1207"] },
    { codigo: "OFG2", nombre: "OFG (TEOLÓGICO)" },
    { codigo: "LIBRE2", nombre: "Ramo Libre" }
  ],
  "3ER SEMESTRE": [
    { codigo: "IMT2220", nombre: "CÁLCULO PARA CIENCIA DE DATOS", prereqs: ["MAT1610"] },
    { codigo: "IMT2230", nombre: "ÁLGEBRA LINEAL AVANZADA Y MODELAMIENTO", prereqs: ["MAT1610", "IMT2210"] },
    { codigo: "ETI195", nombre: "ÉTICA PARA CIENCIA DE DATOS Y ESTADÍSTICA", prereqs: ["IIC2233", "IMT2200"] },
    { codigo: "IIC1253", nombre: "MATEMÁTICAS DISCRETAS", prereqs: ["IMT2210"] },
    { codigo: "OFG3", nombre: "OFG" },
    { codigo: "LIBRE3", nombre: "Ramo Libre" }
  ],
  "4TO SEMESTRE": [
    { codigo: "EYP1025", nombre: "MODELOS PROBABILÍSTICOS", prereqs: ["IMT2220", "IMT2230"] },
    { codigo: "IC2133", nombre: "ESTRUCTURAS DE DATOS Y ALGORITMOS", prereqs: ["IIC2233", "IIC1253"] },
    { codigo: "IC2413", nombre: "BASES DE DATOS", prereqs: ["IIC2233"] },
    { codigo: "IMT2250", nombre: "OPTIMIZACIÓN PARA CIENCIA DE DATOS", prereqs: ["IMT2220", "IMT2210"] },
    { codigo: "OFG4", nombre: "OFG" },
    { codigo: "LIBRE4", nombre: "Ramo Libre" }
  ],
  "5TO SEMESTRE": [
    { codigo: "EYP2114", nombre: "INFERENCIA ESTADÍSTICA", prereqs: ["EYP1025"] },
    { codigo: "IIC2613", nombre: "INTELIGENCIA ARTIFICIAL", prereqs: ["EYP1025", "IIC2233"] },
    { codigo: "LIC2440", nombre: "PROCESAMIENTO DATOS MASIVOS", prereqs: ["IC2413", "IC2133"] },
    { codigo: "OPR1", nombre: "OPR o MINOR" },
    { codigo: "OFG5", nombre: "OFG" },
    { codigo: "LIBRE5", nombre: "Ramo Libre" }
  ],
  "6TO SEMESTRE": [
    { codigo: "EYP2101", nombre: "PROCESOS ESTOCÁSTICOS APLICADOS", prereqs: ["EYP2114"] },
    { codigo: "EYP2301", nombre: "ANÁLISIS DE REGRESIÓN", prereqs: ["EYP2114"] },
    { codigo: "C2026", nombre: "VISUALIZACIÓN DE INFORMACIÓN", prereqs: ["IC1103"] },
    { codigo: "IIC2433", nombre: "MINERÍA DE DATOS", prereqs: ["IC1103", "EYP1025", "IMT2210"] },
    { codigo: "OFG6", nombre: "OFG" },
    { codigo: "LIBRE6", nombre: "Ramo Libre" }
  ],
  "7MO SEMESTRE": [
    { codigo: "EYP2111", nombre: "SIMULACIÓN", prereqs: ["EYP2101"] },
    { codigo: "EYP2801", nombre: "MÉTODOS BAYESIANOS", prereqs: ["EYP2114"] },
    { codigo: "IMT2260", nombre: "TEORÍA DE APRENDIZAJE AUTOMÁTICO", prereqs: ["EYP2114", "LIC2440", "IMT2250"] },
    { codigo: "OPR2", nombre: "OPR o MINOR" },
    { codigo: "OFG7", nombre: "OFG" },
    { codigo: "LIBRE7", nombre: "Ramo Libre" }
  ],
  "8VO SEMESTRE": [
    { codigo: "IMT2270", nombre: "PROYECTO DE GRADUACIÓN", prereqs: ["EYP2801", "IMT2260", "IMT2250", "ETI195"] },
    { codigo: "OPR3", nombre: "OPR o MINOR" },
    { codigo: "OPR4", nombre: "OPR o MINOR" },
    { codigo: "OPR5", nombre: "OPR o MINOR" },
    { codigo: "OFG8", nombre: "OFG" },
    { codigo: "LIBRE8", nombre: "Ramo Libre" }
  ]
};

const completados = new Set(JSON.parse(localStorage.getItem("ramos-completados")) || []);

function renderMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  Object.entries(malla).forEach(([semestre, ramos]) => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";
    const h2 = document.createElement("h2");
    h2.textContent = semestre;
    semDiv.appendChild(h2);

    ramos.forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.id = ramo.codigo;
      div.textContent = `[${ramo.codigo}] ${ramo.nombre}`;

      if (!ramo.prereqs || ramo.prereqs.every(req => completados.has(req))) {
        div.onclick = () => toggleRamo(ramo.codigo);
      } else {
        div.style.opacity = 0.5;
        div.title = `Bloqueado. Prereqs: ${ramo.prereqs.join(", ")}`;
      }

      if (completados.has(ramo.codigo)) {
        div.classList.add("tachado");
      }

      semDiv.appendChild(div);
    });

    container.appendChild(semDiv);
  });
}

function toggleRamo(codigo) {
  if (completados.has(codigo)) {
    completados.delete(codigo);
  } else {
    completados.add(codigo);
  }
  localStorage.setItem("ramos-completados", JSON.stringify([...completados]));
  renderMalla();
}

renderMalla();
