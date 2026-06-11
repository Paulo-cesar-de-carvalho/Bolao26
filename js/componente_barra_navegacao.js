const items = {
    "Classificação Geral": "/",
    Apostas: "apostas.html",
    Regras: "regras.html",
}

function construirBarraDeNavegacao() {
    const navbarDiv = document.getElementById("navbarMain")

    let itemsHTML = ""
    for (const [nome, pagina] of Object.entries(items)) {
        itemsHTML += `<li class="nav-item">
                <a class="nav-link" href="${pagina}">${nome}</a>
            </li>`
    }

    navbarDiv.innerHTML = `<ul class="navbar-nav nav">
            ${itemsHTML}
        </ul>`
}
