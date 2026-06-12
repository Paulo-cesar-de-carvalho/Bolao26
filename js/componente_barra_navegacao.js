const ICONE_LINK_EXTERNO = '<i class="bi bi-box-arrow-up-right"></i>'

const items = [
    { nome: "Classificação Geral", url: "index.html", externo: false },
    { nome: "Apostas", url: "apostas.html", externo: false },
    { nome: "Regras", url: "regras.html", externo: false },
    {
        nome: "Arquivos",
        url: "https://1drv.ms/f/c/2c440c9e2e64aebf/IgC0-tZhXpvxQ68j9fPfTmxKAbsgjwBVMtT7LLH4MKGi-Uw?e=WDPLHt",
        externo: true,
    },
]

function construirBarraDeNavegacao() {
    const navbarDiv = document.getElementById("navbarMain")

    let itemsHTML = ""
    for (const { nome, url, externo } of items) {
        let internoHTML = nome
        if (externo) {
            internoHTML += " " + ICONE_LINK_EXTERNO
        }
        itemsHTML += `<li class="nav-item">
                <a class="nav-link" href="${url}">${internoHTML}</a>
            </li>`
    }

    navbarDiv.innerHTML = `<ul class="navbar-nav nav">
            ${itemsHTML}
        </ul>`
}
