function filtrarTabela(coluna) {
    // Obtém o valor do input de filtro correspondente
    var input = document.getElementById('filtro' + coluna);
    var filtro = input.value.toUpperCase();
    var tabela = document.getElementById('minhaTabela');
    var linhas = tabela.getElementsByTagName('tr');

    // Loop pelas linhas da tabela
    for (var i = 1; i < linhas.length; i++) {
        var celula = linhas[i].getElementsByTagName('td')[coluna];
        if (celula) {
            var valor = celula.textContent || celula.innerText;
            if (valor.toUpperCase().indexOf(filtro) > -1) {
                linhas[i].style.display = '';
            } else {
                linhas[i].style.display = 'none';
            }
        }
    }
}
