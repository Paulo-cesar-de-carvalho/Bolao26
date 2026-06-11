function construirListaDePalpites(lista, jogos, aposta) {
    lista.innerHTML = ""
    for (const jogo of jogos) {
        const placarAposta = aposta.jogos[jogo.jogo_num]
        lista.appendChild(construirPlacar(jogo, placarAposta.A, placarAposta.B))
        if (jogo.placarA != null && jogo.placarB != null) {
            const pontuacao = calcularPontuacaoPalpite(
                placarAposta.A,
                placarAposta.B,
                jogo.placarA,
                jogo.placarB,
                1
            )
            const resultadoOficial = document.createElement("div")
            resultadoOficial.classList.add("resultado_oficial")
            resultadoOficial.innerHTML = `Resultado Oficial: ${jogo.placarA} x ${jogo.placarB} (${pontuacao} pontos)`
            lista.appendChild(resultadoOficial)
        }
    }
}

function construirSelectDeApostadores(select, lista, jogos) {
    const optionInicial = document.createElement("option")
    optionInicial.selected = true
    optionInicial.innerHTML = "Selecione um nome"
    select.appendChild(optionInicial)
    for (let i = 0; i < apostas.length; i++) {
        const option = document.createElement("option")
        option.value = i
        option.innerHTML = apostas[i].nome
        select.appendChild(option)
    }
    select.addEventListener("change", (event) => {
        const valorSelecionado = event.target.value
        construirListaDePalpites(lista, jogos, apostas[valorSelecionado])
    })
}

async function construirPagina() {
    construirBarraDeNavegacao()
    jogos = await carregarJogos()
    construirSelectDeApostadores(
        document.getElementById("select_apostadores"),
        document.getElementById("apostas_placar_lista"),
        jogos
    )
    document.getElementById("pagina_apostas_temp").classList.toggle("escondido")
    document.getElementById("pagina_apostas").classList.toggle("escondido")
}

window.addEventListener("load", construirPagina)
