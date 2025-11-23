async function listarTodos() {
    const buscaNoBancoDeDados = await fetch('http://localhost:3000/Programador');
    const respostaObtida = await buscaNoBancoDeDados.json();
    console.log(respostaObtida);
    let html = '<table border="1"><tr><th>id</th><th>Nome do programador</th><th>idade</th><th>área de atuação</th>Tipo de programador</th></tr>';

    respostaObtida.forEach(Programador => {
        html += `<tr>
        <td>${Programador.id}</td>
        <td>${Programador.nome_do_programador}</td>
        <td>${vendaCombustivel.idade}</td>
        <td>${Programador.area_de_atuacao}</td>
        <td>${Programador.tipo_de_programador}</td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('resultado').innerHTML = html;
}
