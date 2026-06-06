function construirClassificacaoGeral(classificacaoGeral, tbody) {
    for (let i = 0; i < classificacaoGeral.length; i++) {
        const row = document.createElement("tr")
        const td = []
        let v = ""
        if (classificacaoGeral[i]["var"] != 0) {
            if (classificacaoGeral[i]["var"] > 0) {
                v = "<span class='var-vermelho'>" + classificacaoGeral[i]["var"] + "&darr;</span>"
            } else {
                v = "<span class='var-verde'>" + -classificacaoGeral[i]["var"] + "&uarr;</span>"
            }
        }
        td[0] = v
        td[1] = classificacaoGeral[i]["pos"] + "&ordm;"
        if (i > 0) {
            if (classificacaoGeral[i]["pos"] == classificacaoGeral[i - 1]["pos"]) {
                td[1] = ""
            }
        }
        td[2] = classificacaoGeral[i]["nome"]
        td[3] = classificacaoGeral[i]["pontos"]
        td[4] = classificacaoGeral[i]["placares"]
        td[5] = classificacaoGeral[i]["resultados"]
        for (let j = 0; j < td.length; j++) {
            row.appendChild(td[j])
        }
        tbody.appendChild(row)
    }
}

async function construirPagina() {
    jogos = await pegarJogos()
    classificacaoPorDia = calcularClassificacaoPorDia(jogos)
    classificacaoGeral = calcularClassificacaoAtual(classificacaoPorDia)
    construirClassificacaoGeral(classificacaoGeral, document.getElementById("tbody_geral"))
    document.getElementById("subpage_geral_temp").classList.toggle("escondido")
    document.getElementById("subpage_geral").classList.toggle("escondido")
}

window.onload = async () => await construirPagina()
