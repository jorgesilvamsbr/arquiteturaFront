import urlBase from "./utils/urlBase";
import Http from "./utils/http";
import ko from 'knockout';

const templateStatus = `
<select id="select-status" class="form-control" name="" data-js="select-do-status-da-empresa" data-bind=" options: status, optionsCaption: 'Selecione o status'">
</select>
`;

export default class FiltroDeStatus {
    constructor(mediador) {
        this.mediador = mediador;
    }
    iniciar() {
        Http.get(urlBase.obter() + "solicitacao/status")
            .then(function (data) {
                this.status = data;
                document.querySelector('div[data-js="filtro-de-status"]').innerHTML = templateStatus;
                document.querySelector('#select-status').addEventListener('change', function () {
                    this.mediador.notificar('trocou-filtro-de-status', this.value);
                });
                ko.applyBindings(this, document.querySelector('select[data-js="select-do-status-da-empresa"]'));
            })
            .catch((erro)=>{
                console.log(erro);
            });
    }
}