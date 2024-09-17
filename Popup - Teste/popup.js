
function abrirPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function confirmarEscolha() {
    let coresEscolhidas = [];
    if (document.getElementById('verde').checked) {
        coresEscolhidas.push('Verde');
    }
    if (document.getElementById('amarelo').checked) {
        coresEscolhidas.push('Amarelo');
    }
    if (document.getElementById('azul').checked) {
        coresEscolhidas.push('Azul');
    }
    
    alert("Você escolheu: " + (coresEscolhidas.length > 0 ? coresEscolhidas.join(', ') : 'Nenhuma cor'));
    fecharPopup();
}
