const results = [];

let data
fetch("./db/monedas.json")
            .then(response => response.json())
            .then(responseData => {
                data = responseData
            })

// Se encarga de tratar los datos y en este caso de llamar a la funcion para hacer la conversion.
function convert() {
    let answerCountryDes = document.getElementById("countryDestination").value;
    let answerValueDes = parseFloat(document.getElementById("valueDestination").value);
    let answerCountry = "Colombia"
    let answerValue = document.getElementById("valueOrigin")

    const currencyCountry = data.find(item => item.pais===answerCountryDes)
    if (currencyCountry){
        answerValue.value = currencyCountry.precio
    }
    else {
        answerValuevalue = ""
    }

    const currency = {
        countryOrigin: answerCountry,
        valueOrigin: answerValueDes,
        countryDestination: answerCountryDes,
        valueDestination: operation(currencyCountry.precio, answerValueDes)
    };

    results.push(currency);    
    addToLocalStorage(currency);
}

// Esta funcion se encarga de agregar al localStorage los datos que ingreso el usuario.
function addToLocalStorage(data){
    try {
        let conversionCounter = parseInt(localStorage.getItem("conversionCounter") || 0)
    conversionCounter++

        localStorage.setItem("PaisOrigen_" + conversionCounter, data.countryOrigin)
        localStorage.setItem("ValorOrigen_" + conversionCounter, data.valueOrigin)
        localStorage.setItem("PaisDestino_" + conversionCounter, data.countryDestination)
        localStorage.setItem("ValorDestino_" + conversionCounter, data.valueDestination)

        localStorage.setItem("conversionCounter", conversionCounter)
    } catch (error) {
        return "Error al guardar los datos"
    }
    
}

// Se encarga de realizar la conversion con los dos valores como parametros.
const operation = (answerValue, answerValueDes) => {
    return answerValue * answerValueDes;
};