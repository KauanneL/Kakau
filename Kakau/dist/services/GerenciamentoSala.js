export class GerenciamentoSalas {
    constructor() {
        this.salas = [];
    }
    atualizarOcupacao(index, novaOcupacao) {
        throw new Error("Method not implemented.");
    }
    adicionarSala(sala) {
        this.salas.push(sala);
    }
    removerSala(index) {
        this.salas.splice(index, 1);
    }
    listarSalas() {
        return this.salas;
    }
}
