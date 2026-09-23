async function buscarCEP() {
    const cep = document.getElementById('cepInput').value;

    const response = await fetch('/buscar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cep: cep})
    });

    const dados = await response.json();

    if (dados.result.erro) {
        document.getElementById('resultado').innerText = 'CEP não encontrado';
        return;
    }

    document.getElementById('resultado').innerHTML = `
        <p>${dados.result.logradouro}, ${dados.result.bairro}</p>
        <p>${dados.result.localidade} - ${dados.result.uf}</p>
    `;
}

async function loadHistory() {
    const response = await fetch('/history')
    const history = await response.json();

    if (history[0]) {
        document.getElementById('history1').innerHTML = `
            <p>${history[0].logradouro} - ${history[0].localidade} - CEP: ${history[0].cep}</p>
        `;
    }

    if (history[1]) {
        document.getElementById('history2').innerHTML = `
            <p>${history[1].logradouro} - ${history[1].localidade} - CEP: ${history[1].cep}</p>
        `;
    }
}

window.onload = loadHistory()

