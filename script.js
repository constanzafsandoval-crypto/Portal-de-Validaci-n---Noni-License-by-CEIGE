// CEIGE · Portal de Validación v3.0
// Edita estas claves cuando definamos las fases reales.

const fases = {
  "INICIO": {
    fase: "FASE I",
    titulo: "Fase de Inicio completada",
    ubicacion: "Ubicación de recompensa: por definir.",
    nota: "El sujeto ha obtenido acceso al siguiente protocolo."
  },
  "POLLITO": {
    fase: "FASE II",
    titulo: "Registro validado",
    ubicacion: "Ubicación de recompensa: por definir.",
    nota: "La información coincide con el archivo CG-001."
  },
  "COFRE": {
    fase: "FASE III",
    titulo: "Cofre autorizado",
    ubicacion: "Ubicación del cofre: por definir.",
    nota: "Se recomienda conservar todos los elementos obtenidos."
  }
};

const totalFases = ["FASE I","FASE II","FASE III","FASE IV","FASE V","FASE VI"];

const code = document.getElementById("code");
const validate = document.getElementById("validate");
const scan = document.getElementById("scan");
const scanText = document.getElementById("scanText");
const barFill = document.getElementById("barFill");
const result = document.getElementById("result");
const phaseList = document.getElementById("phaseList");

function normalize(text){
  return text.trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
}

function wait(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getCompleted(){
  return JSON.parse(localStorage.getItem("ceige_completed") || "[]");
}

function setCompleted(fase){
  const completed = new Set(getCompleted());
  completed.add(fase);
  localStorage.setItem("ceige_completed", JSON.stringify([...completed]));
  renderProgress();
}

function renderProgress(){
  const completed = getCompleted();
  phaseList.innerHTML = totalFases.map(fase => {
    const done = completed.includes(fase);
    return `<div class="phase ${done ? "done" : ""}">${done ? "✔" : "□"} ${fase}</div>`;
  }).join("");
}

function typeText(element, html, speed = 12){
  element.innerHTML = "";
  let i = 0;
  const plain = html;
  return new Promise(resolve => {
    const timer = setInterval(() => {
      element.innerHTML = plain.slice(0, i);
      i++;
      if(i > plain.length){
        clearInterval(timer);
        element.innerHTML = html;
        resolve();
      }
    }, speed);
  });
}

async function runScan(){
  scan.classList.remove("hidden");
  result.className = "result hidden";
  result.innerHTML = "";

  scanText.textContent = "Conectando con servidores CEIGE...";
  barFill.style.width = "22%";
  await wait(650);

  scanText.textContent = "Consultando expediente CG-001...";
  barFill.style.width = "58%";
  await wait(750);

  scanText.textContent = "Verificando autorización...";
  barFill.style.width = "86%";
  await wait(700);

  scanText.textContent = "Generando respuesta oficial...";
  barFill.style.width = "100%";
  await wait(550);
}

validate.addEventListener("click", async () => {
  const key = normalize(code.value);
  await runScan();
  scan.classList.add("hidden");

  if(fases[key]){
    const data = fases[key];
    setCompleted(data.fase);
    result.className = "result success";
    result.classList.remove("hidden");

    const html = `
      <h2>✔ EXPEDIENTE LOCALIZADO</h2>
      <div class="seal">${data.fase} COMPLETADA</div>
      <p><strong>SUJETO:</strong> GUSTAVO</p>
      <p><strong>ESTADO:</strong> VERIFICADO</p>
      <hr>
      <h2>RECOMPENSA AUTORIZADA</h2>
      <p>${data.ubicacion}</p>
      <p><em>${data.nota}</em></p>
      <p><strong>Estado del sujeto:</strong> APTO PARA CONTINUAR</p>
    `;
    result.innerHTML = html;
  } else {
    result.className = "result error";
    result.classList.remove("hidden");
    result.innerHTML = `
      <h2>⛔ ACCESO DENEGADO</h2>
      <p>No existe ningún registro compatible con el código ingresado.</p>
      <p>Verifique la palabra obtenida durante la fase.</p>
      <p><strong>Código:</strong> CEIGE-404</p>
    `;
  }
});

code.addEventListener("keydown", (e) => {
  if(e.key === "Enter") validate.click();
});

renderProgress();
