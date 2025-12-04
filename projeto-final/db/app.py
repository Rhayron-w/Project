from flask import Flask, request, redirect, send_from_directory
import sqlite3
import os

app = Flask(__name__)

# --- SERVE CSS E ARQUIVOS ESTÁTICOS DA MESMA PASTA ---
@app.route('/<path:filename>')
def arquivos_estaticos(filename):
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), filename)


# --- CRIA O BANCO SE NÃO EXISTIR ---
def criar_tabela():
    conexao = sqlite3.connect("banco.db")
    cursor = conexao.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cpf TEXT,
            nome TEXT,
            data_nascimento TEXT,
            genero TEXT,
            telefone TEXT,
            email TEXT,
            ofertas INTEGER,
            termos INTEGER
        )
    """)
    conexao.commit()
    conexao.close()

criar_tabela()


# --- ROTA PARA RECEBER O FORMULÁRIO ---
@app.route("/cadastro", methods=["POST"])
def cadastro():
    cpf = request.form.get("cpf")
    nome = request.form.get("nome")
    data = request.form.get("data")
    genero = request.form.get("genero")
    telefone = request.form.get("Telefone")
    email = request.form.get("email")
    ofertas = 1 if request.form.get("ofertas") else 0
    termos = 1 if request.form.get("termos") else 0

    conexao = sqlite3.connect("banco.db")
    cursor = conexao.cursor()
    cursor.execute("""
        INSERT INTO usuarios (cpf, nome, data_nascimento, genero, telefone, email, ofertas, termos)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (cpf, nome, data, genero, telefone, email, ofertas, termos))
    conexao.commit()
    conexao.close()

    return redirect("/01.html")  # VOLTA PARA A INICIAL


# --- INICIA O SERVIDOR ---
if __name__ == "__main__":
    app.run(debug=True)
