const FIFA_API_URL =
    "https://api.fifa.com/api/v3/calendar/matches?from=2026-06-10T00%3A00%3A00Z&to=2026-06-28T23%3A59%3A59Z&language=pt&count=500&idCompetition=17"

async function carregarJogos() {
    const placares = await (await fetch(FIFA_API_URL)).json()
    const jogos = []
    const horaAtual = new Date()
    for (const id of idJogos) {
        const placar = placares.Results.find((obj) => obj.IdMatch == id)
        if (placar == null) {
            console.error("Jogo de ID " + id + " não encontrado")
            continue
        }
        const horaJogo = new Date(placar.Date)
        const placarDisponivel = horaAtual.getTime() >= horaJogo.getTime() - 15 * 60 * 1000
        jogos.push({
            jogo_id: id,
            jogo_num: placar.MatchNumber,
            data_hora: horaJogo,
            dia: new Date(horaJogo.getFullYear(), horaJogo.getMonth(), horaJogo.getDate()),
            estadio: placar.Stadium.Name[0].Description,
            grupo: placar.GroupName[0].Description,
            timeA: placar.Home.Abbreviation,
            timeB: placar.Away.Abbreviation,
            timeA_nome: placar.Home.TeamName[0].Description,
            timeB_nome: placar.Away.TeamName[0].Description,
            placarA: placarDisponivel ? placar.Home.Score : null,
            placarB: placarDisponivel ? placar.Away.Score : null,
        })
    }
    jogos.sort((a, b) => a.data_hora - b.data_hora)
    return jogos
}
