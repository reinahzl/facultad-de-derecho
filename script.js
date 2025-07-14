const materias = {
  "Constitucional": { creditos: 15, previas: [] },
  "Personas": { creditos: 6, previas: [] },
  "Ideas Jurídico-Políticas": { creditos: 8, previas: [] },
  "Sociedad y Derecho": { creditos: 7, previas: [] },
  "Historia del Derecho": { creditos: 6, previas: [] },
  "Taller de Lectoescritura": { creditos: 5, previas: [] },
  "Intro Fenómeno Jurídico": { creditos: 4, previas: [] },
  "Intro Derecho Penal": { creditos: 6, previas: ["Constitucional", "Personas"] },
  "Bienes": { creditos: 6, previas: [] },
  "Informático Jurídico 1": { creditos: 6, previas: ["Constitucional", "Personas"] },
  "Ciencia Política": { creditos: 7, previas: [] },
  "Derechos Humanos": { creditos: 10, previas: ["Constitucional"] },
  "Obligaciones y Contratos": { creditos: 14, previas: ["Constitucional", "Personas", "Historia del Derecho", "Bienes"] },
  "Economía, Derecho e Instituciones": { creditos: 8, previas: [] },
  "Intro Metodología Investigación": { creditos: 6, previas: [] },
  "Procesal 1": { creditos: 12, previas: ["Constitucional", "Personas", "Historia del Derecho", "Bienes", "Derechos Humanos"] },
  "Informático Jurídico 2": { creditos: 4, previas: ["Bienes", "Informático Jurídico 1"] }
};

let aprobadas = new Set();

function crearMalla() {
  const malla = document.getElementById("malla");
  for (let nombre in materias) {
    const div = document.createElement("div");
    div.className = "materia bloqueada";
    div.innerText = `${nombre}\n(${materias[nombre].creditos} créditos)`;
    div.dataset.nombre = nombre;
    div.onclick = () => aprobarMateria(nombre);
    malla.appendChild(div);
  }
  actualizarEstadoMaterias();
}

function aprobarMateria(nombre) {
  if (!puedeAprobar(nombre)) return;
  aprobadas.add(nombre);
  actualizarEstadoMaterias();
  actualizarCreditos();
}

function puedeAprobar(nombre) {
  return materias[nombre].previas.every(pr => aprobadas.has(pr));
}

function actualizarEstadoMaterias() {
  const divs = document.querySelectorAll(".materia");
  divs.forEach(div => {
    const nombre = div.dataset.nombre;
    div.classList.remove("bloqueada", "aprobada");
    if (aprobadas.has(nombre)) {
      div.classList.add("aprobada");
    } else if (!puedeAprobar(nombre)) {
      div.classList.add("bloqueada");
    }
  });
}

function actualizarCreditos() {
  const total = Array.from(aprobadas).reduce((sum, mat) => sum + materias[mat].creditos, 0);
  document.getElementById("creditos").innerText = `Créditos aprobados: ${total}`;
}

window.onload = () => {
  crearMalla();
  actualizarCreditos();
};

