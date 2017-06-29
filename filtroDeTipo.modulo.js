import urlBase from './utils/urlBase';
import ko from 'knockout';
import $ from 'jquery';


const template = `
<select id="select-tipo-da-solicitacao" class="form-control" name="" data-js="select-do-filtro-de-tipo" data-bind=" options: tipo, optionsCaption: 'Selecione o tipo'">
</select>
`;

export default class FiltroDeTipo {
    constructor(mediador) {
        this.mediador = mediador;
    }
    iniciar() {
        let funcaoChange = function () {
            console.log(this);
            this.mediador.notificar('trocou-filtro-de-tipo', this.value);
        };

        $.ajax({
            url: urlBase.obter() + "solicitacao/tipo"
        }).then(function (data) {
            console.log("Resultado: "+ this);
            this.tipo = data;
            document.querySelector('div[data-js="filtro-de-tipo"]').innerHTML = template;

            document.querySelector('#select-tipo-da-solicitacao').addEventListener('change', funcaoChange);
            ko.applyBindings(this, document.querySelector('select[data-js="select-do-filtro-de-tipo"]'));
        });
    }
}
