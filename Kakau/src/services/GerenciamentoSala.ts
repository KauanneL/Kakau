import { Sala } from "../models/Sala.js";

export class GerenciamentoSalas {
    atualizarOcupacao(index: number, novaOcupacao: string) {
        throw new Error("Method not implemented.");
    }
    private salas: Sala[] = [];

    adicionarSala(sala: Sala): void {
        this.salas.push(sala);
    }

    removerSala(index: number): void {
        this.salas.splice(index, 1);
    }

    listarSalas(): Sala[] {
        return this.salas;
    }
}