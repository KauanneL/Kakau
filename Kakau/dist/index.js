var _a, _b, _c;
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
(_a = document.getElementById("agendarConsultaForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => {
    e.preventDefault();
    const paciente = document.getElementById("paciente").value;
    const medico = document.getElementById("medico").value;
    const data = new Date(document.getElementById("data").value);
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
function removerConsulta(index) {
    gerenciamentoConsultas.removerConsulta(index);
    atualizarTabelaConsultas();
}
// Gerenciamento de Salas
(_b = document.getElementById("gerenciarSalaForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("sala").value;
    const ocupacao = document.getElementById("ocupacao").value;
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
function atualizarOcupacaoSala(index, novaOcupacao) {
    gerenciamentoSalas.atualizarOcupacao(index, novaOcupacao);
    atualizarTabelaSalas();
}
function removerSala(index) {
    gerenciamentoSalas.removerSala(index);
    atualizarTabelaSalas();
}
// Gerenciamento de Prontuários
(_c = document.getElementById("atualizarProntuarioForm")) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", (e) => {
    e.preventDefault();
    const paciente = document.getElementById("pacienteProntuario").value;
    const descricao = document.getElementById("descricao").value;
    gerenciamentoProntuarios.adicionarProntuario(new Prontuario(paciente, descricao));
    atualizarTabelaProntuarios();
});
function atualizarTabelaProntuarios() {
    const tabelaBody = document.querySelector("#prontuariosList tbody");
    if (tabelaBody) {
        tabelaBody.innerHTML = "";
        gerenciamentoProntuarios.listarProntuarios().forEach((prontuario, index) => {
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
function removerProntuario(index) {
    gerenciamentoProntuarios.removerProntuario(index);
    atualizarTabelaProntuarios();
}
