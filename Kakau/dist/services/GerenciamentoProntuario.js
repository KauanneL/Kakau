export class GerenciamentoProntuarios {
    constructor() {
        this.prontuarios = [];
    }
    adicionarProntuario(prontuario) {
        this.prontuarios.push(prontuario);
    }
    removerProntuario(index) {
        this.prontuarios.splice(index, 1);
    }
    listarProntuarios() {
        return this.prontuarios;
    }
}
