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

  "Obligaciones y Contratos": { creditos: 14, previas: ["Bienes", "Constitucional", "Personas", "Historia del Derecho"] },
  "Economía, Derecho e Instituciones": { creditos: 8, previas: [] },
  "Intro Metodología Investigación": { creditos: 6, previas: [] },
  "Procesal 1": { creditos: 12, previas: ["Bienes", "Constitucional", "Personas", "Historia del Derecho", "Derechos Humanos"] },
  "Informático Jurídico 2": { creditos: 4, previas: ["Bienes", "Informático Jurídico 1"] },

  "D. Penal - Parte General": { creditos: 7, previas: ["Bienes", "Intro Derecho Penal", "Derechos Humanos"] },
  "Teoría de la Responsabilidad Civil": { creditos: 10, previas: ["Obligaciones y Contratos"] },
  "Derecho Internacional Público": { creditos: 12, previas: ["Bienes", "Constitucional", "Personas", "Historia del Derecho", "Intro Fenómeno Jurídico"] },
  "Trabajo y Seguridad Social 1": { creditos: 11, previas: ["Constitucional", "Obligaciones y Contratos", "Economía, Derecho e Instituciones"] },

  "Contratos Especiales": { creditos: 12, previas: ["Teoría de la Responsabilidad Civil", "Obligaciones y Contratos"] },
  "D. Penal - Parte Especial": { creditos: 10, previas: ["D. Penal - Parte General"] },
  "Administrativo 1": { creditos: 6, previas: ["Bienes", "Constitucional", "Personas"] },
  "Registral": { creditos: 4, previas: ["Bienes", "Personas"] },
  "Práctica Profesional 1": { creditos: 14, previas: [] },

  "Financiero 1": { creditos: 6, previas: ["Constitucional", "Administrativo 1", "Economía, Derecho e Instituciones", "D. Penal - Parte General"] },
  "Procesal 2": { creditos: 12, previas: ["Constitucional", "Contratos Especiales", "Procesal 1", "D. Penal - Parte General"] },
  "Comercial 1": { creditos: 14, previas: ["Obligaciones y Contratos", "Teoría de la Responsabilidad Civil", "Economía, Derecho e Instituciones"] },

  "Minoridad, Adolescencia y Familia": { creditos: 6, previas: ["Constitucional", "Contratos Especiales", "Procesal 1"] },
  "Comercial 2": { creditos: 12, previas: ["Constitucional", "Contratos Especiales", "Procesal 1", "Comercial 1"] },
  "Seminario del Área": { creditos: 2, previas: [] },
  "Familia Personal y Patrimonial": { creditos: 8, previas: ["Constitucional", "Contratos Especiales", "Procesal 1", "Comercial 1"] },
  "Derecho Agrario": { creditos: 10, previas: ["Administrativo 1", "Contratos Especiales"] },
  "Administrativo 2": { creditos: 0, previas: ["Administrativo 1"] },

  "Financiero 2": { creditos: 7, previas: ["Financiero 1", "Constitucional"] },
  "Sucesiones": { creditos: 6, previas: ["Contratos Especiales", "Procesal 1"] },

  "Teoría del Derecho": { creditos: 8, previas: ["Administrativo 1", "Contratos Especiales", "Procesal 1", "Intro Fenómeno Jurídico"] },
  "Trabajo y Seguridad Social 2": { creditos: 11, previas: ["Obligaciones y Contratos", "Teoría de la Responsabilidad Civil", "Economía, Derecho e Instituciones", "Trabajo y Seguridad Social 1"] },
  "Consultorio Jurídico 1": { creditos: 11, previas: [] },

  "Consultorio Jurídico 2": { creditos: 11, previas: [] },
  "Financiamiento Empresarial": { creditos: 4, previas: ["Contratos Especiales", "Comercial 1", "Comercial 2"] },
  "Derecho Internacional Privado": { creditos: 12, previas: ["Obligaciones y Contratos", "Comercial 1", "Comercial 2", "Familia Personal y Patrimonial", "Sucesiones", "Derecho Internacional Público", "Procesal 1", "Procesal 2"] },
  "Situaciones Jurídicas Subjetivas": { creditos: 12, previas: ["Administrativo 1", "Administrativo 2"] }
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


