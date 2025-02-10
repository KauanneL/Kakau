import { Paciente } from "./PacienteModels.js";

export class Prontuario {
  constructor(
    public paciente: Paciente,
    public historico: string
  ) {}
}
