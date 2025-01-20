var _a, _b, _c;
// MARIANA 
import { Paciente } from "./models/Paciente.js";
import { Medico } from "./models/Medico.js";
import { Consulta } from "./models/Consulta.js";
import { Prontuario } from "./models/Prontuario.js";
import { Sala } from "./models/Sala.js";
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
const salas = [];
// RUTHYANNE 
function validarData(data) {
    const [ano, mes, dia] = data.split("-").map(Number);
    if (ano < 2025)
        return false;
    if (mes < 1 || mes > 12)
        return false;
    if (dia < 1 || dia > 31)
        return false;
    const ultimoDiaMes = new Date(ano, mes, 0).getDate(); // calcula o último dia do mês para o ano e mês colocados 
    return dia <= ultimoDiaMes; // verifica se o dia informado é menor ou igual ao último dia do mês
}
// KAUANNE 
function verificarConflitoConsulta(data, horario, sala, medico) {
    return consultas.some((consulta) => consulta.data === data &&
        consulta.horario === horario &&
        (consulta.sala === sala || consulta.medico === medico));
}
// MARIANA 
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
atualizarListaPacientes();
(_a = document.getElementById("pacienteForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.getElementById("pacienteNome").value;
    const idade = parseInt(document.getElementById("pacienteIdade").value);
    const telefone = document.getElementById("pacienteTelefone").value;
    const novoPaciente = new Paciente(nome, idade, telefone);
    pacientes.push(novoPaciente);
    document.getElementById("pacienteNome").value = "";
    document.getElementById("pacienteIdade").value = "";
    document.getElementById("pacienteTelefone").value = "";
    atualizarListaPacientes();
    exibirPacientes();
});
// RUTHYANNE 
function exibirPacientes() {
    // procura o ID no HTML, esse é o local onde a lista de pacientes será exibida
    const pacienteList = document.getElementById("pacienteList");
    pacienteList.innerHTML = pacientes
        .map((p) => `<p>${p.nome} - ${p.idade} anos - ${p.telefone}</p>`) // para cada paciente gera um parágrafo para exibir as informações 
        .join(""); // junta nome, idade e telefone em uma única linha 
}
// ao enviar o form a página não vai recarregar 
(_b = document.getElementById("consultaForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (event) => {
    event.preventDefault();
    // pega as informações colocadas 
    const pacienteNome = document.getElementById("consultaPaciente").value;
    const medicoEspecialidade = document.getElementById("consultaMedico").value;
    const sala = document.getElementById("consultaSala").value;
    const data = document.getElementById("consultaData").value;
    const horario = document.getElementById("consultaHorario").value;
    if (!validarData(data)) { // gera um alerta se a data não for válida
        alert("Data inválida! Verifique se o dia, mês ou ano estão corretos.");
        return;
    }
    // procura na lista de pacientes e medicos para achar o que foi selecionado 
    const paciente = pacientes.find((p) => p.nome === pacienteNome);
    const medico = medicos.find((m) => m.especialidade === medicoEspecialidade);
    if (paciente && medico) { // verifica se o paciente e o médico existem
        if (verificarConflitoConsulta(data, horario, sala, medico)) { // verifica um agendamento no mesmo horário, sala e médico
            alert("Conflito de agendamento! Verifique os dados da consulta.");
            return; // se já houver gera um alerta e interrompe
        }
        const novaConsulta = new Consulta(paciente, medico, sala, data, horario); // cria uma nova consulta com as informações 
        consultas.push(novaConsulta); // adiciona a lista 
        const novaSala = new Sala(sala, data, horario, "Ocupada"); // cria um novo objeto para mostrar que a sala estará ocupada 
        salas.push(novaSala); // adiciona sala a lista 
        // limpa os campos e atualiza a lista de consultas e salas 
        document.getElementById("consultaPaciente").value = "";
        document.getElementById("consultaMedico").value = "";
        document.getElementById("consultaSala").value = "";
        document.getElementById("consultaData").value = "";
        document.getElementById("consultaHorario").value = "";
        exibirConsultas();
        exibirSalas();
    }
});
// KAUANNE 
function exibirConsultas() {
    const consultasAgendadasList = document.getElementById("consultasAgendadasList");
    consultasAgendadasList.innerHTML = consultas
        .map((c, index) => `<tr>
          <td>${index + 1}</td>
          <td>${c.paciente.nome}</td>
          <td>${c.medico.nome}</td>
          <td>${c.data.split("-").reverse().join("/")}</td>
          <td>${c.horario}</td>
          <td>${c.sala}</td>
        </tr>`)
        .join("");
}
function exibirSalas() {
    const salasList = document.getElementById("salasList");
    salasList.innerHTML = salas
        .map((s, index) => `<tr>
          <td>${index + 1}</td>
          <td>${s.numero}</td>
          <td>${s.data.split("-").reverse().join("/")}</td>
          <td>${s.horario}</td>
          <td>${s.status}</td>
        </tr>`)
        .join("");
}
// RUTHYANNE 
function atualizarListaProntuarios() {
    // aqui pegamos o campo de seleção no HTML onde o usuário vai escolher um paciente
    const prontuarioPacienteSelect = document.getElementById("prontuarioPaciente");
    // antes de adicionar os pacientes, cria uma opção dizendo "Selecione o Paciente" 
    prontuarioPacienteSelect.innerHTML = `<option value="">Selecione o Paciente</option>`;
    pacientes.forEach((paciente) => {
        const option = document.createElement("option");
        option.value = paciente.nome; // o valor é o nome do paciente (usado internamente)
        option.textContent = paciente.nome; // o texto é o nome do paciente (mostrado na tela)
        prontuarioPacienteSelect.appendChild(option); // adiciona as opções criadas no campo de seleção
    });
}
// ao enviar o form a página não vai recarregar 
(_c = document.getElementById("prontuarioForm")) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", (event) => {
    event.preventDefault();
    // pega o nome escolhido e o texto da área de prontuario 
    const pacienteNome = document.getElementById("prontuarioPaciente").value;
    const textoProntuario = document.getElementById("prontuarioTexto").value;
    //  procura na lista de pacientes pelo nome que o usuário escolheu
    const paciente = pacientes.find((p) => p.nome === pacienteNome);
    if (!paciente)
        return;
    // procura um prontuário existente para o paciente
    let prontuario = prontuarios.find((p) => p.paciente === paciente);
    if (prontuario) { // se já existir, é atualizado para o novo texto inserido 
        prontuario.historico += `\n${textoProntuario}`;
    }
    else { // se não existir, cria-se um novo prontuario e adiciona a lista 
        prontuario = new Prontuario(paciente, textoProntuario);
        prontuarios.push(prontuario);
    }
    // limpa os campos de seleção e texto 
    document.getElementById("prontuarioPaciente").value = "";
    document.getElementById("prontuarioTexto").value = "";
    // atualiza a tela e mostra os prontuários mais recentes
    exibirProntuarios();
});
// MARIANA 
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
exibirPacientes();
exibirConsultas();
exibirSalas();
exibirProntuarios();
