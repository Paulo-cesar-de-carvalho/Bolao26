
let btnCopiar = document.querySelector("#btn-copiar")



btnCopiar.addEventListener("click", async function copiarTexto() {
  try {
    await navigator.clipboard.writeText("00020126330014br.gov.bcb.pix0111005827936965204000053039865406100.005802BR5923PAULO CESAR DE CARVALHO6012POUSO ALEGRE62070503***630484C0");
    alert("Código Pix Copiado com Sucesso");
  } catch (err) {
    console.error("Falha ao copiar: ", err);
  }
})
//aa