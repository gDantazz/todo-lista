"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface Tarefa {
    id: number;
    title: string;
    completed: boolean;
}

export default function ListaTarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then(function (resposta) {
                setTarefas(resposta.data);
                setCarregando(false);
            })
            .catch(function () {
                setCarregando(false);
            });
    }, []);
    function deletarTarefa(id: number) {
        axios.delete("https://jsonplaceholder.typicode.com/todos" + id)
            .then(function () {
                alert("Tarefa deletada com sucesso(simulada)")
                const novasTarefas = tarefas.filter(function (dados) {
                    return dados.id !== id
                })
                setTarefas(novasTarefas)
            })
            .catch(function () {
                alert("erro ao deletar")
            })

    }

    if (carregando) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <ul>
                {tarefas.map(function (tarefa) {
                    return (
                        <li key={tarefa.id}>
                            {tarefa.title}
                            <button onClick={function () {
                                deletarTarefa(tarefa.id)
                            }}>DELETAR
                            </button>
                        </li>
                    )
                }
                )}
            </ul>
        </>
    )
}
