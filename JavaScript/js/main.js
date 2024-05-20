// Hacer uso del DOM y a la vez variables globales.
let botonFormConvertir = document.getElementById("showConversionForm")
let botonHistorial = document.getElementById("showConversionHistory")
let formConvertir = document.getElementById("conversionForm")
let botonConvertir = document.getElementById("convert")
let botonReiniciar = document.getElementById("restart")
let countryDestination = document.getElementById("countryDestination")

formConvertir.style.display = "none"

botonFormConvertir.onclick = () => {
    formConvertir.style.display = "block"
}

// Esta funcion se encarga de cargar los paises a una etiqueta select.
function uploadCountries() {
    return new Promise((resolve, reject) => {
        fetch("./db/monedas.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar el archivo JSON");
                }
                return response.json()
            })
            .then(data => {
                data.forEach(country => {
                    const card = document.createElement("option")
                    card.innerHTML = `<option value="${country.pais}">${country.pais}</option>`
                    countryDestination.appendChild(card)
                })
                resolve()
            })
            .catch(error => reject(error))
    })
}

// Se encarga de llamar a la funcion convert() y a la vez crea un div el cual mostrara un parrafo de la conversion.
botonConvertir.onclick = () => {
    convert()
    let convertHTML = document.createElement("div")
    for (let i = 0; i < results.length; i++) {
        convertHTML.innerHTML += `<p>El país cuya moneda usted busca convertir es: ${results[i].countryDestination}, donde el valor solicitado es: ${results[i].valueOrigin}. <br> El país con la moneda que usted cuenta es: ${results[i].countryOrigin}, arrojando una conversión de: ${results[i].valueDestination}.</p><hr>`;
    }
    formConvertir.appendChild(convertHTML)
}

// Indica que debe de hacer para ver el historial.
botonHistorial.onclick = () => {
    Swal.fire("Abrir el localStorage de la consola para ver el historial");
    console.table(results)
}

// Reinicia todos los valores.
botonReiniciar.onclick = () => {
    document.getElementById("countryDestination").value = "";
    document.getElementById("valueDestination").value = "";
    document.getElementById("countryOrigin").value = "";
    document.getElementById("valueOrigin").value = "";

    formConvertir.remove()
};

uploadCountries().catch(error=> console.log(error))