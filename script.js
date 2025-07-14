const materias = {
  intro: {
    nombre: "Introducción al Derecho",
    descripcion: "Materia de primer semestre que presenta los conceptos básicos del Derecho."
  },
  civil: {
    nombre: "Derecho Civil I",
    descripcion: "Estudia las personas, bienes, y hechos jurídicos. Fundamento del Derecho Privado."
  }
};

function mostrarInfo(clave) {
  const materia = materias[clave];
  document.getElementById("nombreMateria").innerText = materia.nombre;
  document.getElementById("descripcionMateria").innerText = materia.descripcion;
  document.getElementById("infoMateria").classList.remove("oculto");
}

