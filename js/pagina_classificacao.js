function construirClassificacaoGeral(classificacaoGeral, tbody) {
    for (let i = 0; i < classificacaoGeral.length; i++) {
        const row = document.createElement("tr")
        const tdTextos = []
        let v = ""
        if (classificacaoGeral[i]["var"] != 0) {
            if (classificacaoGeral[i]["var"] > 0) {
                v = "<span class='var-vermelho'>" + classificacaoGeral[i]["var"] + "&darr;</span>"
            } else {
                v = "<span class='var-verde'>" + -classificacaoGeral[i]["var"] + "&uarr;</span>"
            }
        }
        tdTextos[0] = v
        tdTextos[1] = classificacaoGeral[i]["pos"] + "&ordm;"
        if (i > 0) {
            if (classificacaoGeral[i]["pos"] == classificacaoGeral[i - 1]["pos"]) {
                tdTextos[1] = ""
            }
        }
        tdTextos[2] = classificacaoGeral[i]["nome"]
        tdTextos[3] = classificacaoGeral[i]["pontos"]
        tdTextos[4] = classificacaoGeral[i]["placares"]
        tdTextos[5] = classificacaoGeral[i]["resultados"]
        for (let j = 0; j < tdTextos.length; j++) {
            const tdElem = document.createElement("td")
            tdElem.innerHTML = tdTextos[j]
            if (j != 2) {
                tdElem.classList.add("numero")
            }
            row.appendChild(tdElem)
        }
        tbody.appendChild(row)
    }
}

function construirListaDeJogos(jogos, div) {
    for (const jogo of jogos) {
        div.appendChild(construirPlacar(jogo, jogo.placarA, jogo.placarB))
    }
}

async function construirPagina() {
    construirBarraDeNavegacao()
    jogos = await carregarJogos()
    const { classificacaoPorDia, classificacaoGeral } = calcularClassificacao(jogos)
    if (classificacaoGeral) {
        construirClassificacaoGeral(classificacaoGeral, document.getElementById("tbody_geral"))
        construirListaDeJogos(jogos, document.getElementById("jogos_placar_lista"))
    } else {
        document.getElementById("pagina_geral").innerHTML =
            "<center>Aguardando resultados do primeiro jogo...</center>"
    }
    document.getElementById("pagina_geral_temp").classList.toggle("escondido")
    document.getElementById("pagina_geral").classList.toggle("escondido")
}

window.addEventListener("load", construirPagina)
