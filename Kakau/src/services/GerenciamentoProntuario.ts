import { Prontuario } from "../models/Prontuario.js";

export class GerenciamentoProntuarios {
    private prontuarios: Prontuario[] = [];

    adicionarProntuario(prontuario: Prontuario): void {
        this.prontuarios.push(prontuario);
    }

    removerProntuario(index: number): void {
        this.prontuarios.splice(index, 1);
    }

    listarProntuarios(): Prontuario[] {
        return this.prontuarios;
    }
}