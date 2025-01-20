import { Paciente } from "./Paciente.js";
import { Medico } from "./Medico.js";

export class Consulta {
  constructor(
    public paciente: Paciente,
    public medico: Medico,
    public sala: string,
    public data: string,
    public horario: string
  ) {}
}
