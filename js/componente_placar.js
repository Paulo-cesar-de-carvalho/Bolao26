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
    imgBandeiraA.setAttribute("src", `https://api.fifa.com/api/v3/picture/flags-sq-1/${jogo.timeA}`)
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
    imgBandeiraB.setAttribute("src", `https://api.fifa.com/api/v3/picture/flags-sq-1/${jogo.timeB}`)
    imgBandeiraB.setAttribute("alt", `Bandeira de ${jogo.timeB_nome}`)
    imgBandeiraB.classList.add("placar_bandeira")
    divLinhaPlacar.appendChild(imgBandeiraB)

    const divTimeB = document.createElement("div")
    divTimeB.innerHTML = jogo.timeB_nome
    divTimeB.classList.add("placar_nome_time")
    divLinhaPlacar.appendChild(divTimeB)

    divPlacarContainer.appendChild(divLinhaPlacar)

    if (jogo.grupo != null) {
        const divGrupo = document.createElement("div")
        divGrupo.innerHTML = jogo.grupo
        divPlacarContainer.appendChild(divGrupo)
    }

    return divPlacarContainer
}
