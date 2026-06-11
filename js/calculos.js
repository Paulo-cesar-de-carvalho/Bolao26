function calcularPontuacaoPalpite(apostaA, apostaB, realA, realB, multiplicador) {
    const umPlacarCorreto = apostaA == realA || apostaB == realB
    const resultadoCorreto = Math.sign(apostaA - apostaB) == Math.sign(realA - realB)
    const todoPlacarCorreto = apostaA == realA && apostaB == realB
    let pontos = umPlacarCorreto * 2 + resultadoCorreto * 5 + todoPlacarCorreto * 3
    return pontos * multiplicador
}

function calcularClassificacao(jogos) {
    // Datas únicas que já passaram
    const dias = []
    for (const jogo of jogos) {
        if (jogo.placarA === null || jogo.placarB === null) {
            continue
        }
        if (!dias.find((d) => d.getTime() === jogo.dia.getTime())) {
            dias.push(jogo.dia)
        }
    }
    const classificacaoPorDia = new Map()
    for (let i = 0; i < dias.length; i++) {
        const dia = dias[i]
        const diaAnterior = i > 0 ? dias[i - 1] : null
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
            classificacao.sort((a, b) => b.nome.localeCompare(a.nome)) // Ordem alfabética
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

            // Cálculo das variações
            if (diaAnterior != null) {
                const classificacaoDiaAnterior = classificacaoPorDia.get(diaAnterior)
                const posDiaAnterior = classificacaoDiaAnterior.find(
                    (c) => c.nome === jogador.nome
                ).pos
                jogador.var = jogador.pos - posDiaAnterior
            }
        }
        classificacaoPorDia.set(dia, classificacao)
    }
    const ultimoDia = dias.length > 0 ? dias[dias.length - 1] : null
    return {
        classificacaoPorDia: classificacaoPorDia,
        classificacaoGeral: classificacaoPorDia.get(ultimoDia),
    }
}
