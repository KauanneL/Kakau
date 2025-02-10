import { Paciente } from "./PacienteModels.js";
import { Medico } from "./MedicoModels.js";

export class Consulta {
  constructor(
    public paciente: Paciente,
    public medico: Medico,
    public sala: string,
    public data: string,
    public horario: string
  ) {}
}
