import { Paciente } from "./models/Paciente.js";
import { Medico } from "./models/Medico.js";
import { Consulta } from "./models/Consulta.js";
import { Prontuario } from "./models/Prontuario.js";
import { Sala } from "./models/Sala.js"; 

const pacientes: Paciente[] = [];
const medicos: Medico[] = [
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
const consultas: Consulta[] = [];
const prontuarios: Prontuario[] = [];
const salas: Sala[] = [];


function validarData(data: string): boolean {
  const [ano, mes, dia] = data.split("-").map(Number);


  if (ano < 2025) return false;
  if (mes < 1 || mes > 12) return false;
  if (dia < 1 || dia > 31) return false;

  
  const ultimoDiaMes = new Date(ano, mes, 0).getDate(); 
  return dia <= ultimoDiaMes;
}


function verificarConflitoConsulta(
  data: string,
  horario: string,
  sala: string,
  medico: Medico
): boolean {
  return consultas.some(
    (consulta) =>
      consulta.data === data &&
      consulta.horario === horario &&
      (consulta.sala === sala || consulta.medico === medico)
  );
}


function atualizarListaPacientes() {
  const consultaPacienteSelect = document.getElementById(
    "consultaPaciente"
  ) as HTMLSelectElement;
  const prontuarioPacienteSelect = document.getElementById(
    "prontuarioPaciente"
  ) as HTMLSelectElement;

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


document.getElementById("pacienteForm")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = (document.getElementById("pacienteNome") as HTMLInputElement).value;
  const idade = parseInt((document.getElementById("pacienteIdade") as HTMLInputElement).value);
  const telefone = (document.getElementById("pacienteTelefone") as HTMLInputElement).value;

  const novoPaciente = new Paciente(nome, idade, telefone);
  pacientes.push(novoPaciente);

  
  (document.getElementById("pacienteNome") as HTMLInputElement).value = "";
  (document.getElementById("pacienteIdade") as HTMLInputElement).value = "";
  (document.getElementById("pacienteTelefone") as HTMLInputElement).value = "";

  atualizarListaPacientes();
  exibirPacientes();
});


function exibirPacientes() {
  const pacienteList = document.getElementById("pacienteList")!;
  pacienteList.innerHTML = pacientes
    .map((p) => `<p>${p.nome} - ${p.idade} anos - ${p.telefone}</p>`)
    .join("");
}


document.getElementById("consultaForm")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const pacienteNome = (document.getElementById("consultaPaciente") as HTMLSelectElement).value;
  const medicoEspecialidade = (document.getElementById("consultaMedico") as HTMLSelectElement).value;
  const sala = (document.getElementById("consultaSala") as HTMLSelectElement).value;
  const data = (document.getElementById("consultaData") as HTMLInputElement).value;
  const horario = (document.getElementById("consultaHorario") as HTMLInputElement).value;

  
  if (!validarData(data)) {
    alert("Data inválida! Verifique se o dia, mês ou ano estão corretos.");
    return;
  }

  const paciente = pacientes.find((p) => p.nome === pacienteNome);
  const medico = medicos.find((m) => m.especialidade === medicoEspecialidade);

  if (paciente && medico) {
    if (verificarConflitoConsulta(data, horario, sala, medico)) {
      alert("Conflito de agendamento! Verifique os dados da consulta.");
      return;
    }

    const novaConsulta = new Consulta(paciente, medico, sala, data, horario);
    consultas.push(novaConsulta);

    
    const novaSala = new Sala(sala, data, horario, "Ocupada");
    salas.push(novaSala);

    
    (document.getElementById("consultaPaciente") as HTMLSelectElement).value = "";
    (document.getElementById("consultaMedico") as HTMLSelectElement).value = "";
    (document.getElementById("consultaSala") as HTMLSelectElement).value = "";
    (document.getElementById("consultaData") as HTMLInputElement).value = "";
    (document.getElementById("consultaHorario") as HTMLInputElement).value = "";

    exibirConsultas();
    exibirSalas();
  }
});


function exibirConsultas() {
  const consultasAgendadasList = document.getElementById("consultasAgendadasList")!;
  consultasAgendadasList.innerHTML = consultas
    .map(
      (c, index) =>
        `<tr>
          <td>${index + 1}</td>
          <td>${c.paciente.nome}</td>
          <td>${c.medico.nome}</td>
          <td>${c.data.split("-").reverse().join("/")}</td>
          <td>${c.horario}</td>
          <td>${c.sala}</td>
        </tr>`
    )
    .join("");
}


function exibirSalas() {
  const salasList = document.getElementById("salasList")!;
  salasList.innerHTML = salas
    .map(
      (s, index) =>
        `<tr>
          <td>${index + 1}</td>
          <td>${s.numero}</td>
          <td>${s.data.split("-").reverse().join("/")}</td>
          <td>${s.horario}</td>
          <td>${s.status}</td>
        </tr>`
    )
    .join("");
}


function atualizarListaProntuarios() {
  const prontuarioPacienteSelect = document.getElementById(
    "prontuarioPaciente"
  ) as HTMLSelectElement;

  prontuarioPacienteSelect.innerHTML = `<option value="">Selecione o Paciente</option>`;
  pacientes.forEach((paciente) => {
    const option = document.createElement("option");
    option.value = paciente.nome;
    option.textContent = paciente.nome;
    prontuarioPacienteSelect.appendChild(option);
  });
}


document.getElementById("prontuarioForm")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const pacienteNome = (document.getElementById("prontuarioPaciente") as HTMLSelectElement).value;
  const textoProntuario = (document.getElementById("prontuarioTexto") as HTMLTextAreaElement).value;

  const paciente = pacientes.find((p) => p.nome === pacienteNome);
  if (!paciente) return;

  
  let prontuario = prontuarios.find((p) => p.paciente === paciente);
  if (prontuario) {
    prontuario.historico += `\n${textoProntuario}`;
  } else {
    prontuario = new Prontuario(paciente, textoProntuario);
    prontuarios.push(prontuario);
  }

  
  (document.getElementById("prontuarioPaciente") as HTMLSelectElement).value = "";
  (document.getElementById("prontuarioTexto") as HTMLTextAreaElement).value = "";

  exibirProntuarios();
});


function exibirProntuarios() {
  const pacientesProntuariosList = document.getElementById("pacientesProntuariosList")!;
  pacientesProntuariosList.innerHTML = prontuarios
    .map(
      (p) =>
        `<tr>
          <td>${p.paciente.nome}</td>
          <td>${p.historico.replace(/\n/g, "<br>")}</td>
        </tr>`
    )
    .join("");
}

atualizarListaPacientes();
exibirPacientes();
exibirConsultas();
exibirSalas();
exibirProntuarios();



