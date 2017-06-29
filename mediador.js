export default class Mediador {
    constructor() {
        this.eventos = {};
    }

    registrar(nome, callback) {
        this.eventos[nome] = callback;
    }

    notificar(nome, parametros) {
        this.eventos[nome](parametros);
    }
}