function calcularPontuacaoPalpite(apostaA, apostaB, realA, realB, multiplicador) {
    const umPlacarCorreto = apostaA == realA || apostaB == realB
    const resultadoCorreto = Math.sign(apostaA - apostaB) == Math.sign(realA - realB)
    const todoPlacarCorreto = apostaA == realA && apostaB == realB
    let pontos = umPlacarCorreto * 2 + resultadoCorreto * 5 + todoPlacarCorreto * 3
    return pontos * multiplicador
}

function calcularClassificacaoPorDia(jogos) {
    // Datas únicas que já passaram
    const dias = []
    for (const jogo of jogos) {
        if (jogo.placar1 === null || jogo.placar2 === null) {
            continue
        }
        if (!dias.find((d) => d.getTime() === jogo.dia.getTime())) {
            dias.push(jogo.dia)
        }
    }
    const classificacaoPorDia = []
    for (const dia of dias) {
        const jogosFiltrados = jogos.filter((jogo) => jogo.dia.getTime() <= dia.getTime())
        const classificacao = []
        // apostas vem de apostas.js
        for (const aposta of apostas) {
            const jogador = {
                pos: 1,
                var: 0,
                nome: aposta.nome,
                placares: 0,
                resultados: 0,
                pontos: 0,
            }
            for (let i = 0; i < jogosFiltrados.length; i++) {
                const jogoFiltrado = jogosFiltrados[i]
                // Se não tiver resultado disponível, ignora esse jogo
                if (jogoFiltrado.placarA === null || jogoFiltrado.placarB === null) {
                    continue
                }
                const apostaPlacarA = aposta.jogos[jogoFiltrado.jogo_num]["A"]
                const apostaPlacarB = aposta.jogos[jogoFiltrado.jogo_num]["B"]
                jogador["pontos"] += calcularPontuacaoPalpite(
                    apostaPlacarA,
                    apostaPlacarB,
                    jogoFiltrado.placarA,
                    jogoFiltrado.placarB,
                    1
                )
                if (
                    apostaPlacarA == jogoFiltrado.placarA &&
                    apostaPlacarB == jogoFiltrado.placarB
                ) {
                    jogador["placares"]++
                }
                if (
                    Math.sign(apostaPlacarA - apostaPlacarB) ==
                    Math.sign(jogoFiltrado.placarA - jogoFiltrado.placarB)
                ) {
                    jogador["resultados"]++
                }
            }
            classificacao.push(jogador)

            // Critérios de desempate
            classificacao.sort((a, b) => a.nome.localeCompare(b.nome)) // Ordem alfabética
            classificacao.sort((a, b) => (a.resultados <= b.resultados ? 1 : -1))
            classificacao.sort((a, b) => (a.placares <= b.placares ? 1 : -1))
            classificacao.sort((a, b) => (a.pontos <= b.pontos ? 1 : -1))

            // Cálculo das posições
            for (let i = 1; i < classificacao.length; i++) {
                const atual = classificacao[i]
                const anterior = classificacao[i - 1]
                if (
                    atual.pontos == anterior.pontos &&
                    atual.placares == anterior.placares &&
                    atual.resultados == anterior.resultados
                ) {
                    atual.pos = anterior.pos
                } else {
                    atual.pos = i + 1
                }
            }
        }
        classificacaoPorDia.push({ dia: dia, classificacao: classificacao })
    }
    return classificacaoPorDia
}

function calcularClassificacaoAtual(classificacaoPorDia) {
    const classificacaoAtual = classificacaoPorDia[classificacaoPorDia.length - 1].classificacao
    if (classificacaoPorDia.length > 1) {
        const classificacaoAnterior =
            classificacaoPorDia[classificacaoPorDia.length - 2].classificacao
        for (const jogador of classificacaoAtual) {
            const posAnterior = classificacaoAnterior.find((j) => j.nome === jogador.nome).pos
            const posAtual = jogador.pos
            jogador.var = posAtual - posAnterior
        }
    }
    return classificacaoAtual
}
