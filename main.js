import './style.css'

const $semanas = document.querySelector("#semanas");
const $campos = document.querySelector("#campos");
const $boton = document.querySelector("#boton-calcular");
const $limpiar = document.querySelector("#boton-limpiar");
const $resultados = document.querySelector("#resultados");
const $4semanas = document.querySelector("#_4semanas");


$semanas.addEventListener("change", (e) => {
  $campos.innerHTML = "";
  $resultados.innerHTML = "";
  if ($4semanas.checked && e.target.value >= 5) {
    alert("Seleccione un rango válido")
    e.target.value = 1;

  } else {
    for (let i = 1; i <= e.target.value; i++) {
      $campos.innerHTML += `<div class="campo"><label for="semana-${i}">Resultado de la semana ${i}: </label> <input type="number" min=0 max=100 id="semana-${i}"> </div>`
    }
  }
})


$boton.addEventListener("click", (e) => {
  $resultados.innerHTML = "";
  e.preventDefault();
  const semanas = $semanas.value;
  if (semanas === "disabled"){
    alert("Ingrese un rango válido");
    return;
  }
  let sumatoria = 0;
  for (let i = 1; i <= semanas; i++) {
    let campo = document.querySelector(`#semana-${i}`)
    if (campo.value >= 0 && campo.value <= 100 && campo.value != "") {
      sumatoria += parseInt(campo.value);
    } else {
      alert("Ingrese un número válido (entre 0 y 100)");
      campo.value = "";
      return;
    }
  }

  let divisor;
  let faltante;
  if ($4semanas.checked) {
    divisor = 4;
    faltante = 4 * 76 - sumatoria;
  } else {
    divisor = 5;
    faltante = 5 * 76 - sumatoria;
  }

  let textoFinal = "";
  if (($4semanas.checked && semanas == 4) || (!$4semanas.checked && semanas == 5)) {
    textoFinal += `<p> Tu promedio final es: <span class="promedio">${sumatoria / divisor}</span></p>`
    if (sumatoria / divisor < 76) {
      textoFinal += `<p class="no-bonifica"> No alcanzaste a bonificar 😞 </p>`;
    } else {
      textoFinal += `<p class="felicidades"> ¡Felicidades! Alcanzas a bonificar 🥳`;
    }
  } else if (($4semanas.checked && semanas == 3) || (!$4semanas.checked && semanas == 4)) {
    textoFinal += `<p>Hasta el momento tu acumulado es: <span class="promedio">${sumatoria / divisor}</span></p>`

    textoFinal += `<p> Necesitas sumar <span class="necesario"> ${faltante} </span> en el próximo PKT para bonificar.${faltante <= 100 ? " Ánimo! aún hay posibilidades :D" : "<span class='no-bonifica'>Ya es imposible :(, el próximo mes será.</span>"}</p>`
  } else if ($4semanas.checked && semanas == 2) {
    textoFinal += `<p>Hasta el momento tu acumulado es: <span class="promedio">${sumatoria / divisor}</span></p>`

    textoFinal += `<p>Necesitas acumular <span class="necesario"> ${faltante} </span> en los próximos 2 PKTs</p>`

    let pktMinimo = Math.round(faltante / 2);
    let pktMaximo = pktMinimo - (pktMinimo % 5);
    let promedioFinal = (sumatoria + Math.round(faltante / 2) * 2) / 4;

    if (pktMinimo <= 100) {
      textoFinal += `<p>Para ello debes sacar ${pktMinimo} en cada uno</p>`
      let pktCopia = pktMaximo;

      while (pktMaximo <= 100) {
        if (((sumatoria + pktMaximo + pktMinimo) / 4 >= 76) && pktMaximo
          != pktCopia) {
          textoFinal += `<p>O sacar ${pktMaximo} en uno y ${pktCopia} en el otro</p>`

        }
        pktMaximo += 5;
        pktCopia -= 5;
      }
    } else {
      textoFinal += `<p class="no-bonifica"> F por este mes, ya es imposible bonificar :c</p>`;
    }
  } else if (!$4semanas.checked && semanas == 3) {
    textoFinal += `<p>Hasta el momento tu acumulado es: <span class="promedio">${sumatoria / divisor}</span></p>`

    textoFinal += `<p>Necesitas acumular <span class="necesario"> ${faltante} </span> en los próximos 2 PKTs</p>`

    let pktMinimo = Math.round(faltante / 2);
    let pktMaximo = pktMinimo - (pktMinimo % 5);
    let promedioFinal = (sumatoria + Math.round(faltante / 2) * 2) / 5;

    if (pktMinimo <= 100) {
      textoFinal += `<p>Para ello debes sacar ${pktMinimo} en cada uno</p>`
      let pktCopia = pktMaximo;

      while (pktMaximo <= 100) {
        if (((sumatoria + pktMaximo + pktMinimo) / 5 >= 76) && pktMaximo
          != pktCopia) {
          textoFinal += `<p>O sacar ${pktMaximo} en uno y ${pktCopia} en el otro</p>`
        }
        pktMaximo += 5;
        pktCopia -= 5;
      }
    } else {
      textoFinal += `<p class="no-bonifica"> F por este mes, ya es imposible bonificar :c</p>`;
    }
  } else if (!$4semanas.checked && semanas == 2) {
    textoFinal += `<p>Hasta el momento tu acumulado es: <span class="promedio">${sumatoria / divisor}</span></p>`

    if (faltante / 3 <= 100) {
      textoFinal += `<p>Necesitas acumular <span class="necesario"> ${faltante} </span> en los próximos 3 PKTs. Ánimo! c:</p>`
    } else {
      textoFinal += `<p class="no-bonifica"> F por este mes, ya es imposible bonificar :c</p>`
    }
  }
  else {
    textoFinal += `<p>Hasta el momento tu acumulado es: <span class="promedio">${sumatoria / divisor}</span></p>`

    let faltantePromedio = $4semanas.checked ? faltante / 3 : faltante / 4;

    if (faltantePromedio <= 100) {
      textoFinal += `<p>Necesitas acumular <span class="necesario"> ${faltante} </span> en los próximos ${$4semanas.checked ? "3 PKTs" : "4 PKTs"}. Ánimo! c:</p>`
    } else {
      textoFinal += `<p class="no-bonifica">F por este mes, ya es imposible bonificar :c</p>`
    }
  }

  $resultados.innerHTML += textoFinal
  $resultados.classList.remove("hidden");
})

$limpiar.addEventListener("click", (e)=> {
  e.preventDefault();
  $semanas.value = "disabled";
  $campos.innerHTML = "";
  $resultados.innerHTML = "";
  $resultados.classList.add("hidden");
})
