export class GerenciamentoConsultas {
    constructor() {
        this.consultas = [];
    }
    adicionarConsulta(consulta) {
        this.consultas.push(consulta);
    }
    removerConsulta(index) {
        this.consultas.splice(index, 1);
    }
    listarConsultas() {
        return this.consultas;
    }
}
