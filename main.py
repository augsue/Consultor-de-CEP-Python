import webview
import requests
from flask import Flask, render_template, jsonify, request
import threading


app = Flask(__name__)

# Busca do CEP
def buscar_cep(cep):
    cep = cep.replace("-", "")
    url = f"https://viacep.com.br/ws/{cep}/json/"
    dados = requests.get(url).json()

    if "erro" in dados:
        return {"erro": "CEP não encontrado"}
    
    return dados
    string_dados = f""
    for key, value in dados.items():
        string_dados += f"{key}: {value}\n"

    return string_dados


@app.route('/')
def homepage():
    return render_template('index.html')

@app.route('/buscar', methods=['POST'])
def buscar():
    dados = request.get_json()
    cep = dados['cep']
    resultado = buscar_cep(cep)
    return jsonify(resultado)

def start_flask():
    app.run(debug=True, use_reloader=False)  # Start Flask server

# webview.start(gui='gtk', http_server=True, func=None)  # custom_logic)

if __name__ == '__main__':
    threading.Thread(target=start_flask, daemon=True).start()  # Start Flask server in a separate thread
    webview.create_window('ViaCEP - GUI', 'http://localhost:5000')
    webview.start(gui='gtk')  # Start the webview GUI

# anything below this line will be executed after program FINISHED

pass