import { Consulta } from "../models/Consulta.js";

export class GerenciamentoConsultas {
    private consultas: Consulta[] = [];

    adicionarConsulta(consulta: Consulta): void {
        this.consultas.push(consulta);
    }

    removerConsulta(index: number): void {
        this.consultas.splice(index, 1);
    }

    listarConsultas(): Consulta[] {
        return this.consultas;
    }
}