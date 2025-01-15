import { Consulta } from "./models/Consulta.js";
import { Sala } from "./models/Sala.js";
import { Prontuario } from "./models/Prontuario.js";
import { GerenciamentoConsultas } from "./services/GerenciamentoConsultas.js";
import { GerenciamentoSalas } from "./services/GerenciamentoSala.js";
import { GerenciamentoProntuarios } from "./services/GerenciamentoProntuario.js";

const gerenciamentoConsultas = new GerenciamentoConsultas();
const gerenciamentoSalas = new GerenciamentoSalas();
const gerenciamentoProntuarios = new GerenciamentoProntuarios();

// Simulando eventos do DOM
document.getElementById("agendarConsultaForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const paciente = (document.getElementById("paciente") as HTMLInputElement).value;
    const medico = (document.getElementById("medico") as HTMLInputElement).value;
    const data = new Date((document.getElementById("data") as HTMLInputElement).value);

    gerenciamentoConsultas.adicionarConsulta(new Consulta(paciente, medico, data));
    atualizarTabelaConsultas();
});

function atualizarTabelaConsultas() {
    const tabelaBody = document.querySelector("#consultasList tbody");
    if (tabelaBody) {
        tabelaBody.innerHTML = "";
        gerenciamentoConsultas.listarConsultas().forEach((consulta, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${consulta.paciente}</td>
                <td>${consulta.medico}</td>
                <td>${consulta.data.toLocaleString()}</td>
                <td>
                    <button onclick= ${removerConsulta(index)}>Remover</button>
                </td>
            `;
            tabelaBody.appendChild(row);
        });
    }
}



function removerConsulta(index: number) {
    gerenciamentoConsultas.removerConsulta(index);
    atualizarTabelaConsultas();
}

// Gerenciamento de Salas
document.getElementById("gerenciarSalaForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = (document.getElementById("sala") as HTMLInputElement).value;
    const ocupacao = (document.getElementById("ocupacao") as HTMLSelectElement).value;

    gerenciamentoSalas.adicionarSala(new Sala(nome, ocupacao));
    atualizarTabelaSalas();
});

function atualizarTabelaSalas() {
    const tabelaBody = document.querySelector("#salasList tbody");
    if (tabelaBody) {
        tabelaBody.innerHTML = "";
        gerenciamentoSalas.listarSalas().forEach((sala, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sala.sala}</td>
                <td>${sala.ocupacao}</td>
                <td>
                    <button onclick="removerSala(${index})">Remover</button>
                </td>
            `;
            tabelaBody.appendChild(row);
        });
    }
}

function atualizarOcupacaoSala(index: number, novaOcupacao: string) {
    gerenciamentoSalas.atualizarOcupacao(index, novaOcupacao);
    atualizarTabelaSalas();
}

function removerSala(index: number) {
    gerenciamentoSalas.removerSala(index);
    atualizarTabelaSalas();
}


// Gerenciamento de Prontuários
document.getElementById("atualizarProntuarioForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const paciente = (document.getElementById("pacienteProntuario") as HTMLInputElement).value;
    const descricao = (document.getElementById("descricao") as HTMLTextAreaElement).value;

    gerenciamentoProntuarios.adicionarProntuario(new Prontuario(paciente, descricao));
    atualizarTabelaProntuarios();
});

function atualizarTabelaProntuarios(): void {
    const tabelaBody = document.querySelector("#prontuariosList tbody") as HTMLElement;
    if (tabelaBody) {
        tabelaBody.innerHTML = "";
        gerenciamentoProntuarios.listarProntuarios().forEach((prontuario: Prontuario, index: number) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${prontuario.paciente}</td>
                <td>${prontuario.descricao}</td>
                <td>
                    <button onclick="removerProntuario(${index})">Remover</button>
                </td>
            `;
            tabelaBody.appendChild(row);
        });
    }
}

function removerProntuario(index: number): void {
    gerenciamentoProntuarios.removerProntuario(index);
    atualizarTabelaProntuarios();
}