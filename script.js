// CEIGE · Portal de Validación
// Cambia las palabras y ubicaciones aquí cuando definas las fases.
// Recomendación: escribir las claves en MAYÚSCULAS, sin tildes.

const respuestas = {
  "INICIO": {
    titulo: "Validación exitosa",
    ubicacion: "Recompensa autorizada. Ubicación: por definir.",
    nota: "Fase de Inicio completada."
  },
  "COFRE": {
    titulo: "Cofre autorizado",
    ubicacion: "Ubicación de la llave/cofre: por definir.",
    nota: "Registro aprobado por CEIGE."
  },
  "POLLITO": {
    titulo: "Recompensa desbloqueada",
    ubicacion: "Ubicación: por definir.",
    nota: "No existen registros equivalentes."
  }
};

function normalizar(texto){
  return texto
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const form = document.getElementById("validationForm");
const input = document.getElementById("keyword");
const result = document.getElementById("result");

form.addEventListener("submit", function(event){
  event.preventDefault();

  const clave = normalizar(input.value);

  if(respuestas[clave]){
    const r = respuestas[clave];
    result.className = "result success";
    result.innerHTML = `
      <h2>${r.titulo}</h2>
      <p><strong>Estado:</strong> VALIDADO</p>
      <p>${r.ubicacion}</p>
      <p><em>${r.nota}</em></p>
    `;
  } else {
    result.className = "result error";
    result.innerHTML = `
      <h2>Acceso denegado</h2>
      <p>La palabra ingresada no coincide con ningún registro activo.</p>
      <p>Revisa la fase e inténtalo nuevamente.</p>
    `;
  }

  result.classList.remove("hidden");
});
