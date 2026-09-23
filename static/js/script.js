async function buscarCEP() {
    const cep = document.getElementById('cepInput').value;

    const response = await fetch('/buscar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cep: cep})
    });

    const dados = await response.json();

    if (dados.erro) {
        document.getElementById('resultado').innerText = 'CEP não encontrado';
        return;
    }

    document.getElementById('resultado').innerHTML = `
        <p>${dados.logradouro}, ${dados.bairro}</p>
        <p>${dados.localidade} - ${dados.uf}</p>
    `;
}