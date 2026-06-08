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

function construirPlacar(jogo, placarA, placarB) {
    const divPlacarContainer = document.createElement("div")
    divPlacarContainer.classList.add("placar_container")

    const divDataEstadio = document.createElement("div")
    divDataEstadio.innerHTML = jogo.data_hora.toLocaleString() + " - " + jogo.estadio
    divPlacarContainer.appendChild(divDataEstadio)

    const divLinhaPlacar = document.createElement("div")
    divLinhaPlacar.classList.add("placar_linha")

    const divTimeA = document.createElement("div")
    divTimeA.innerHTML = jogo.timeA_nome
    divTimeA.classList.add("placar_nome_time")
    divLinhaPlacar.appendChild(divTimeA)

    const imgBandeiraA = document.createElement("img")
    imgBandeiraA.setAttribute("src", `Imagens/Bandeiras/${jogo.timeA_nome}`)
    imgBandeiraA.setAttribute("alt", `Bandeira de ${jogo.timeA_nome}`)
    imgBandeiraA.classList.add("placar_bandeira")
    divLinhaPlacar.appendChild(imgBandeiraA)

    const divPlacarA = document.createElement("div")
    divPlacarA.innerHTML = placarA
    divPlacarA.classList.add("placar_resultado")
    divPlacarA.classList.add("numero")
    divLinhaPlacar.appendChild(divPlacarA)

    const divX = document.createElement("div")
    divX.innerHTML = "X"
    divLinhaPlacar.appendChild(divX)

    const divPlacarB = document.createElement("div")
    divPlacarB.innerHTML = placarB
    divPlacarB.classList.add("placar_resultado")
    divPlacarB.classList.add("numero")
    divLinhaPlacar.appendChild(divPlacarB)

    const imgBandeiraB = document.createElement("img")
    imgBandeiraB.setAttribute("src", `Imagens/Bandeiras/${jogo.timeB_nome}`)
    imgBandeiraB.setAttribute("alt", `Bandeira de ${jogo.timeB_nome}`)
    imgBandeiraB.classList.add("placar_bandeira")
    divLinhaPlacar.appendChild(imgBandeiraB)

    const divTimeB = document.createElement("div")
    divTimeB.innerHTML = jogo.timeB_nome
    divTimeB.classList.add("placar_nome_time")
    divLinhaPlacar.appendChild(divTimeB)

    divPlacarContainer.appendChild(divLinhaPlacar)

    const divGrupo = document.createElement("div")
    divGrupo.innerHTML = jogo.grupo
    divPlacarContainer.appendChild(divGrupo)

    return divPlacarContainer
}

function construirListaDeJogos(jogos, div) {
    const divInterno = document.createElement("div")
    divInterno.classList.add("placar_lista")
    for (const jogo of jogos) {
        divInterno.appendChild(construirPlacar(jogo, jogo.placarA, jogo.placarB))
    }
    div.appendChild(divInterno)
}

async function construirPagina() {
    jogos = await carregarJogos()
    const { classificacaoPorDia, classificacaoGeral } = calcularClassificacao(jogos)
    construirClassificacaoGeral(classificacaoGeral, document.getElementById("tbody_geral"))
    document.getElementById("subpage_geral_temp").classList.toggle("escondido")
    document.getElementById("subpage_geral").classList.toggle("escondido")
    construirListaDeJogos(jogos, document.getElementById("subpage_jogos"))
    document.getElementById("subpage_jogos_temp").classList.toggle("escondido")
    document.getElementById("subpage_jogos").classList.toggle("escondido")
}

window.onload = async () => await construirPagina()
