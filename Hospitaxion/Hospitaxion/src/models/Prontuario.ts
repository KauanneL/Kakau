import { Paciente } from "./Paciente.js";

export class Prontuario {
  constructor(
    public paciente: Paciente,
    public historico: string
  ) {}
}
