var _a, _b, _c;
import { Paciente } from "./models/Paciente.js";
import { Medico } from "./models/Medico.js";
import { Consulta } from "./models/Consulta.js";
import { Prontuario } from "./models/Prontuario.js";
const pacientes = [];
const medicos = [
    new Medico("Dr. Gustavo Almeida", "Cardiologista"),
    new Medico("Dra. Mariana Soares", "Dermatologista"),
    new Medico("Dr. Ricardo Martins", "Neurologista"),
    new Medico("Dra. Fernanda Oliveira", "Pediatra"),
    new Medico("Dr. Carlos Mendes", "Ortopedista"),
    new Medico("Dra. Camila Santos", "Ginecologista"),
    new Medico("Dr. João Vieira", "Oftalmologista"),
    new Medico("Dra. Letícia Ferreira", "Psiquiatra"),
    new Medico("Dr. Pedro Rocha", "Urologista"),
    new Medico("Dra. Ana Beatriz Costa", "Endocrinologista"),
];
const consultas = [];
const prontuarios = [];
// Atualiza a lista de pacientes no select
function atualizarListaPacientes() {
    const consultaPacienteSelect = document.getElementById("consultaPaciente");
    const prontuarioPacienteSelect = document.getElementById("prontuarioPaciente");
    consultaPacienteSelect.innerHTML = `<option value="">Selecione o Paciente</option>`;
    prontuarioPacienteSelect.innerHTML = `<option value="">Selecione o Paciente</option>`;
    pacientes.forEach((paciente) => {
        const optionConsulta = document.createElement("option");
        optionConsulta.value = paciente.nome;
        optionConsulta.textContent = paciente.nome;
        consultaPacienteSelect.appendChild(optionConsulta);
        const optionProntuario = document.createElement("option");
        optionProntuario.value = paciente.nome;
        optionProntuario.textContent = paciente.nome;
        prontuarioPacienteSelect.appendChild(optionProntuario);
    });
}
// Inicializa as listas
atualizarListaPacientes();
// Cadastra um paciente
(_a = document.getElementById("pacienteForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.getElementById("pacienteNome").value;
    const idade = parseInt(document.getElementById("pacienteIdade").value);
    const telefone = document.getElementById("pacienteTelefone").value;
    const novoPaciente = new Paciente(nome, idade, telefone);
    pacientes.push(novoPaciente);
    // Limpar os campos após adicionar o paciente
    document.getElementById("pacienteNome").value = "";
    document.getElementById("pacienteIdade").value = "";
    document.getElementById("pacienteTelefone").value = "";
    atualizarListaPacientes();
    exibirPacientes();
});
// Exibe a lista de pacientes cadastrados
function exibirPacientes() {
    const pacienteList = document.getElementById("pacienteList");
    pacienteList.innerHTML = pacientes
        .map((p) => `<p>${p.nome} - ${p.idade} anos - ${p.telefone}</p>`)
        .join("");
}
// Agendar consulta
(_b = document.getElementById("consultaForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (event) => {
    event.preventDefault();
    const pacienteNome = document.getElementById("consultaPaciente").value;
    const medicoEspecialidade = document.getElementById("consultaMedico").value;
    const sala = document.getElementById("consultaSala").value;
    const data = document.getElementById("consultaData").value;
    const horario = document.getElementById("consultaHorario").value;
    const paciente = pacientes.find((p) => p.nome === pacienteNome);
    const medico = medicos.find((m) => m.especialidade === medicoEspecialidade);
    if (paciente && medico) {
        const novaConsulta = new Consulta(paciente, medico, sala, data, horario);
        consultas.push(novaConsulta);
        // Limpar os campos após agendar a consulta
        document.getElementById("consultaPaciente").value = "";
        document.getElementById("consultaMedico").value = "";
        document.getElementById("consultaSala").value = "";
        document.getElementById("consultaData").value = "";
        document.getElementById("consultaHorario").value = "";
        exibirConsultas();
    }
});
// Exibe a lista de consultas agendadas
function exibirConsultas() {
    const consultasAgendadasList = document.getElementById("consultasAgendadasList");
    consultasAgendadasList.innerHTML = consultas
        .map((c, index) => `<tr>
          <td>${index + 1}</td>
          <td>${c.paciente.nome}</td>
          <td>${c.medico.nome}</td>
          <td>${c.data.split('-')[2]}-${c.data.split("-")[1]}-${c.data.split("-")[0]}</td>
          <td>${c.horario}</td>
          <td>${c.sala}</td>
        </tr>`)
        .join("");
}
// Atualiza a lista de pacientes no select de prontuários
function atualizarListaProntuarios() {
    const prontuarioPacienteSelect = document.getElementById("prontuarioPaciente");
    prontuarioPacienteSelect.innerHTML = `<option value="">Selecione o Paciente</option>`;
    pacientes.forEach((paciente) => {
        const option = document.createElement("option");
        option.value = paciente.nome;
        option.textContent = paciente.nome;
        prontuarioPacienteSelect.appendChild(option);
    });
}
// Cadastra ou atualiza um prontuário
(_c = document.getElementById("prontuarioForm")) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", (event) => {
    event.preventDefault();
    const pacienteNome = document.getElementById("prontuarioPaciente").value;
    const textoProntuario = document.getElementById("prontuarioTexto").value;
    const paciente = pacientes.find((p) => p.nome === pacienteNome);
    if (!paciente)
        return;
    // Verifica se o prontuário já existe para o paciente
    let prontuario = prontuarios.find((p) => p.paciente === paciente);
    if (prontuario) {
        prontuario.historico += `\n${textoProntuario}`;
    }
    else {
        prontuario = new Prontuario(paciente, textoProntuario);
        prontuarios.push(prontuario);
    }
    // Limpar os campos após salvar o prontuário
    document.getElementById("prontuarioPaciente").value = "";
    document.getElementById("prontuarioTexto").value = "";
    exibirProntuarios();
});
// Exibe os prontuários na tabela
function exibirProntuarios() {
    const pacientesProntuariosList = document.getElementById("pacientesProntuariosList");
    pacientesProntuariosList.innerHTML = prontuarios
        .map((p) => `<tr>
          <td>${p.paciente.nome}</td>
          <td>${p.historico.replace(/\n/g, "<br>")}</td>
        </tr>`)
        .join("");
}
atualizarListaPacientes();
atualizarListaProntuarios();
