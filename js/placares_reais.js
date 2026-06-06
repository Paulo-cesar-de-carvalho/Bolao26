async function pegarPlacaresReais() {
    const FIFA_API_URL = "https://api.fifa.com/api/v3/calendar/matches?from=2026-06-10T00%3A00%3A00Z&to=2026-06-28T23%3A59%3A59Z&language=pt&count=500&idCompetition=17"
    const placares = await (await fetch(FIFA_API_URL)).json()
    const jogos = new Map()
    for (const id of idJogos) {
        const placar = placares.Results.find(obj => obj.IdMatch == id)
        if (placar == null) {
            console.error("Jogo de ID " + id + " não encontrado")
            continue
        }
        // TODO: resultado
        jogos.set(id, {
            "jogo_id": id,
            "jogo_num": placar.MatchNumber,
            "data": new Date(placar.Date),
            "estadio": placar.Stadium.Name[0].Description,
            "grupo": placar.GroupName[0].Description,
            "time1": placar.Home.Abbreviation,
            "time2": placar.Away.Abbreviation,
            "time1_nome": placar.Home.TeamName[0].Description,
            "time2_nome": placar.Away.TeamName[0].Description,
        })
    }
    return jogos
}
