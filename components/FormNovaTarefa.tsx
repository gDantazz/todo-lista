"use client"

import { useState } from "react"
import axios from "axios"

function FormNovaTarefa() {
  const [titulo, setTitulo] = useState("")

  function enviarTarefa() {
    if (titulo.trim() !== "") {
      axios.post("https://jsonplaceholder.typicode.com/todos", {
        title: titulo,
        completed: false,
        userId: 1
      })
        .then(function (resposta) {
          alert("Tarefa enviada (simulada): " + JSON.stringify(resposta.data))
          setTitulo("") // Limpa o input
        })
        .catch(function () {
          alert("Erro ao enviar tarefa.")
        })
    }
  }

  function atualizarTitulo(evento: React.ChangeEvent<HTMLInputElement>) {
    setTitulo(evento.target.value)
  }

  return (
    <div style={{ marginBottom: "24px" }}>
      {/* Campo de texto onde o usuário digita a tarefa */}
      <input
        type="text"
        value={titulo}
        onChange={atualizarTitulo}
        placeholder="Digite uma tarefa..."
      />

      {/* Botão que envia a tarefa quando clicado */}
      <button onClick={enviarTarefa}>
        Adicionar
      </button>
    </div>
  )
}

export default FormNovaTarefa
