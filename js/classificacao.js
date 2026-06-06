async function calcularClassificacao() {
    placares = await pegarPlacaresReais()
    console.log(placares)
    // TODO
}

window.onload = async () => await calcularClassificacao()
