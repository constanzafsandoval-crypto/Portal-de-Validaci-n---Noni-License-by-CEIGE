// CEIGE · Portal de Validación v5.0
// Operación Polli Misterios · Volumen II

const fases = {
  "RECONSTRUCCION": {
    fase: "FASE I",
    titulo: "RECONSTRUCCIÓN VALIDADA",
    ubicacion: "Diríjase al mesón de la cocina. La unidad autorizada se encuentra sobre la superficie.",
    nota: "Recupere el elemento asignado y regrese al centro de operaciones para continuar."
  },
  "UMBRAL": {
    fase: "FASE II",
    titulo: "UMBRAL SUPERADO",
    ubicacion: "Diríjase al baño. La unidad autorizada se encuentra en ese sector.",
    nota: "Recupere el elemento asignado y regrese al centro de operaciones para continuar."
  },
  "ALQUIMIA": {
    fase: "FASE III",
    titulo: "MENSAJE RECUPERADO",
    ubicacion: "Inspeccione la zona posterior del sillón. La unidad autorizada se encuentra allí.",
    nota: "Recupere el elemento asignado y regrese al centro de operaciones para continuar."
  },
  "ENCUENTROS": {
    fase: "FASE IV",
    titulo: "CLASIFICACIÓN VALIDADA",
    ubicacion: "Revise las sillas del comedor. La unidad autorizada se encuentra en ese sector.",
    nota: "Recupere el elemento asignado y regrese al centro de operaciones para continuar."
  },
  "INDICIO": {
    fase: "FASE V",
    titulo: "INDICIO AUTORIZADO",
    ubicacion: "Diríjase al mueble destinado al almacenamiento de platos. La unidad autorizada se encuentra allí.",
    nota: "Recupere el elemento asignado y regrese al centro de operaciones para continuar."
  },
  "ACCESO": {
    fase: "FASE VI",
    titulo: "CASO CERRADO",
    ubicacion: "Revise el interior de la lavadora. La unidad autorizada se encuentra dentro.",
    nota: "Recupere el elemento asignado y regrese al centro de operaciones para continuar."
  },
  "DESTINO": {
    fase: "FASE VII",
    titulo: "DESTINO CONFIRMADO",
    ubicacion: "Diríjase a la terraza. La unidad autorizada se encuentra en ese sector.",
    nota: "Recupere el elemento asignado y regrese al centro de operaciones para continuar."
  },
  "HUELLA": {
    fase: "FASE VIII",
    finalAparente: true,
    titulo: "OPERACIÓN COMPLETADA",
    ubicacion: "Diríjase al mueble destinado al almacenamiento de tazas. Allí se encuentra el elemento final autorizado.",
    nota: "Recupere el elemento asignado y siga las instrucciones encontradas en el lugar."
  }
};

const protocoloFinal = {
  codigo: "EPILOGO",
  titulo: "PROTOCOLO FINAL DESBLOQUEADO",
  ubicacion: "DESTINO DEFINITIVO: arriba del refrigerador.",
  nota: "Autorización final concedida. Recupere el último elemento y complete la operación."
};

const totalFases = [
  "FASE I", "FASE II", "FASE III", "FASE IV",
  "FASE V", "FASE VI", "FASE VII", "FASE VIII"
];

const STORAGE_KEY = "ceige_completed_v5";

const code = document.getElementById("code");
const validate = document.getElementById("validate");
const scan = document.getElementById("scan");
const scanText = document.getElementById("scanText");
const barFill = document.getElementById("barFill");
const result = document.getElementById("result");
const phaseList = document.getElementById("phaseList");

function normalize(text){
  return text.trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function wait(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getCompleted(){
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function setCompleted(fase){
  const completed = new Set(getCompleted());
  completed.add(fase);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  renderProgress();
}

function renderProgress(){
  const completed = getCompleted();
  phaseList.innerHTML = totalFases.map(fase => {
    const done = completed.includes(fase);
    return `<div class="phase ${done ? "done" : ""}">${done ? "✔" : "□"} ${fase}</div>`;
  }).join("");
}

async function runScan(finalMode = false){
  scan.classList.remove("hidden");
  result.className = "result hidden";
  result.innerHTML = "";
  barFill.style.width = "0%";

  scanText.textContent = finalMode ? "Detectando protocolo restringido..." : "Conectando con archivos CEIGE...";
  barFill.style.width = "22%";
  await wait(550);

  scanText.textContent = finalMode ? "Solicitando autorización superior..." : "Consultando expediente CG-01-19...";
  barFill.style.width = "56%";
  await wait(650);

  scanText.textContent = finalMode ? "Liberando archivo final..." : "Verificando autorización...";
  barFill.style.width = "84%";
  await wait(600);

  scanText.textContent = "Generando respuesta oficial...";
  barFill.style.width = "100%";
  await wait(450);
}

function showStandardResult(data){
  result.className = "result success";
  result.classList.remove("hidden");

  const headline = data.finalAparente ? "✓ REGISTRO FINAL VALIDADO" : "✓ EXPEDIENTE LOCALIZADO";
  const state = data.finalAparente ? "CIERRE AUTORIZADO" : "VERIFICADO";
  const locationTitle = data.finalAparente ? "OBJETIVO FINAL" : "UBICACIÓN AUTORIZADA";

  result.innerHTML = `
    <h2>${headline}</h2>
    <div class="seal">${data.fase} COMPLETADA</div>
    <p><strong>SUJETO:</strong> GUSTAVO</p>
    <p><strong>ESTADO:</strong> ${state}</p>
    <hr>
    <h2>${locationTitle}</h2>
    <p class="location-box">${data.ubicacion}</p>
    <p><em>${data.nota}</em></p>
    ${data.finalAparente
      ? '<p class="final-status"><strong>OPERACIÓN POLLI MISTERIOS · ESTADO: COMPLETADA</strong></p>'
      : '<p><strong>Estado del sujeto:</strong> APTO PARA CONTINUAR</p>'}
  `;
}

function showFinalProtocol(){
  result.className = "result final-clearance";
  result.classList.remove("hidden");
  result.innerHTML = `
    <div class="final-kicker">FINAL CLEARANCE</div>
    <h2>✓ ${protocoloFinal.titulo}</h2>
    <div class="seal final-seal">EPÍLOGO</div>
    <p><strong>SUJETO:</strong> GUSTAVO</p>
    <p><strong>NIVEL DE ACCESO:</strong> DEFINITIVO</p>
    <hr>
    <p>El registro anterior no correspondía al destino definitivo.</p>
    <h2>DESTINO DEFINITIVO</h2>
    <p class="final-location">${protocoloFinal.ubicacion}</p>
    <p><em>${protocoloFinal.nota}</em></p>
    <p class="operation-complete"><strong>OPERACIÓN COMPLETADA</strong></p>
    <button id="finishExperience" class="finish-button">FINALIZAR EXPERIENCIA</button>
  `;

  document.getElementById("finishExperience").addEventListener("click", showFarewell);
}

function showFarewell(){
  result.className = "result farewell";
  result.classList.remove("hidden");
  result.innerHTML = `
    <div class="farewell-kicker">OPERACIÓN POLLI MISTERIOS · VOL. II</div>
    <h2>EXPERIENCIA FINALIZADA</h2>

    <div class="farewell-divider">✦</div>

    <p>
      Si llegaste hasta aquí, significa que Polli Misterios Vol. II
      ha llegado oficialmente a su fin.
    </p>

    <p>
      Todo lo que viste, resolviste y encontraste fue pensado y preparado
      especialmente para ti. Cada detalle, cada pista y cada pequeña tontera
      que apareció en el camino fue hecha con muchísimo amor, con la idea de
      regalarte algo más que cosas: una experiencia que pudieras disfrutar,
      recordar y que fuera solamente tuya.
    </p>

    <p>
      Espero que te hayas divertido tanto viviéndola como yo disfruté
      imaginándola y preparándola para ti. Quería hacer algo diferente,
      algo que no se pudiera simplemente comprar, y que cuando lo recordáramos
      pudiéramos decir que fue una experiencia única e irrepetible.
    </p>

    <p>
      Gracias por seguir cada pista, por prestarte para mis ideas y,
      sobre todo, por llegar hasta el final.
    </p>

    <p class="wish-message">
      <strong>Deseo haberte sorprendido, y espero poder seguir haciéndolo
      durante el resto de mi vida.</strong>
    </p>

    <p class="love-message">
      <strong>Feliz cumpleaños, mi pollito.<br>Te amo mucho. ❤️</strong>
    </p>

    <div class="farewell-signature">
      — Coni
    </div>
  `;
  result.scrollIntoView({behavior:"smooth", block:"start"});
}

function showError(){
  result.className = "result error";
  result.classList.remove("hidden");
  result.innerHTML = `
    <h2>⛔ ACCESO DENEGADO</h2>
    <p>No existe ningún registro compatible con el código ingresado.</p>
    <p>Verifique la palabra obtenida durante la fase.</p>
    <p><strong>Código:</strong> CEIGE-404</p>
  `;
}

validate.addEventListener("click", async () => {
  const key = normalize(code.value);
  if(!key) return;

  const isFinal = key === protocoloFinal.codigo;
  await runScan(isFinal);
  scan.classList.add("hidden");

  if(isFinal){
    showFinalProtocol();
  } else if(fases[key]){
    const data = fases[key];
    setCompleted(data.fase);
    showStandardResult(data);
  } else {
    showError();
  }
});

code.addEventListener("keydown", (e) => {
  if(e.key === "Enter") validate.click();
});

renderProgress();
