function construirListaDePalpites(lista, jogos, aposta) {
    lista.innerHTML = ""
    const linkJogoAtual = document.createElement("a")
    linkJogoAtual.href = "#jogoAtual"
    linkJogoAtual.innerHTML = "&darr; Pular para jogo atual"
    lista.appendChild(linkJogoAtual)
    let utilmoJogoComResultado = null
    let primeiroJogoEmAndamento = null
    for (const jogo of jogos) {
        const placarAposta = aposta.jogos[jogo.jogo_num]
        const divJogo = construirPlacar(jogo, placarAposta.A, placarAposta.B)
        if (jogo.em_andamento) {
            divJogo.classList.add("jogo_em_andamento")
            if (primeiroJogoEmAndamento == null) {
                primeiroJogoEmAndamento = divJogo
            }
        }
        if (jogo.finalizado) {
            ultimoJogoComResultado = divJogo
        }
        lista.appendChild(divJogo)
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
    const divJogoAtual = primeiroJogoEmAndamento || ultimoJogoComResultado
    if (divJogoAtual != null) {
        divJogoAtual.id = "jogoAtual"
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
