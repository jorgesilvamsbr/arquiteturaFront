import urlBase from './utils/urlBase';
import ko from 'knockout';
import Http from './utils/http';


const template = `
<select id="select-tipo-da-solicitacao" class="form-control" name="" 
    data-js="select-do-filtro-de-tipo" 
    data-bind=" options: tipo, optionsCaption: 'Selecione o tipo'">
</select>
`;

export default class FiltroDeTipo {
    constructor(mediador) {
        this.mediador = mediador;
        this.viewModel = {
            tipo: ['oi']
        };
    }
    iniciar() {
        document.querySelector('div[data-js="filtro-de-tipo"]').innerHTML = template;
        let funcaoChange = () => {
            this.mediador.notificar('trocou-filtro-de-tipo', this.value);
        };

        Http.get(urlBase.obter() + "solicitacao/tipo").then((data) => {
            this.viewModel.tipo = data;
            document.querySelector('#select-tipo-da-solicitacao').addEventListener('change', funcaoChange);
            ko.applyBindings(this.viewModel, document.querySelector('select[data-js="select-do-filtro-de-tipo"]'));
        }).catch((erro) => {
            console.error(erro);
        });
    }
}
