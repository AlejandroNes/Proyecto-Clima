//generando con fetch API el clima

//variables
const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
const parrafo = document.querySelector("#parrafo");

//eventos
(function () {
  formulario.addEventListener("submit", validarForm);
})();

//funciones
function validarForm(e) {
  e.preventDefault();
  //viendo valores de los imputs
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;
  //validando el formulario
  if (ciudad == "" || pais == "") {
    mostrarError("Llene los campos");
    return;
  }
  consultarAPI(ciudad, pais);
  parrafo.innerHTML = ``;
}

//funcion mostrar error
function mostrarError(mensaje) {
  const verificarAlerta = document.querySelector(".bg-red-100");
  if (!verificarAlerta) {
    const alerta = document.createElement("div");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "my-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );
    alerta.innerHTML = `
                <strong class="font-bold">Error!..</strong>
                <span class="block">${mensaje}</span>
        `;
    container.appendChild(alerta);
    setInterval(() => {
      alerta.remove();
    }, 2000);
  }
}

//consultando mediante FetchAPI
function consultarAPI(pais, ciudad) {
  const idAPI = "932300b9f9d2435f6a3445aac9bba2bb";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${idAPI}`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      limpiar();
      if (data.cod == "404") {
        mostrarError("Ciudad no encontrada");
        return;
      } else {
        mostrarClima(data);
      }
    });
}

//mostrando el clima en HTML
function mostrarClima(data) {
  const {
    main: { temp, temp_min, temp_max },
  } = data;
  const centigrados = volverCentigrados(temp);
  const minimo = volverCentigrados(temp_min);
  const maximo = volverCentigrados(temp_max);
  //creando el clima actual
  const actual = document.createElement("p");
  actual.innerHTML = `${centigrados} &#8451`;
  actual.classList.add("font-bold", "text-6xl");

    //crando el clima maximo
    const max = document.createElement("p");
    max.innerHTML = `Max: ${maximo} &#8451`;
    max.classList.add("font-bold", "text-2xl");

    //crando el clima minimo
    const min = document.createElement("p");
    min.innerHTML = `Min: ${minimo} &#8451`;
    min.classList.add("font-bold", "text-2xl");


  //creando el div
  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(max);
  resultadoDiv.appendChild(min);
  //insertando el el id resultado
  resultado.appendChild(resultadoDiv);
}

//volviendo en centigrados los grados kelvin
function volverCentigrados(dato) {
  return (dato = parseInt(dato - 273.15));
}

//limpiando el HTML
function limpiar(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}
