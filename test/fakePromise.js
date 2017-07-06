export default class FakePromise {
    constructor(dadosParaResolver, dadosParaRejeitar) {
        this.then = (resolver) => {
            if (dadosParaResolver !== undefined) {
                resolver(dadosParaResolver);
            }
            return this;
        };

        this.catch = (rejeitar) => {
            if (dadosParaRejeitar !== undefined) {
                rejeitar(dadosParaRejeitar);
            }
        };
    }
}