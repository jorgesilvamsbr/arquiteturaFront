import urlBase from './utils/urlBase';
import ko from 'knockout';
import Http from './utils/http';


const template = `
<div class="js-caixa-de-alerta" style="background-color: #fff000; font-size:12px;">Este é meu alerta!</div>
<select id="select-tipo-da-solicitacao" class="form-control" name="" 
    data-js="select-do-filtro-de-tipo" 
    data-bind="value: tipoSelecionado, options: tipos, optionsCaption: 'Selecione o tipo', event:{change:funcaoChange}">
</select>
`;

export default class FiltroDeTipo {
    constructor(mediador) {
        this.mediador = mediador;
        this.viewModel = {
            tipos: [],
            tipoSelecionado: ko.observable(),
            funcaoChange: () => this.funcaoChange()
        };
    }

    iniciar() {
        document.querySelector('div[data-js="filtro-de-tipo"]').innerHTML = template;
        Http.get(urlBase.obter() + "solicitacao/tipo").then((data) => {
            this.viewModel.tipos = data;
            ko.applyBindings(this.viewModel, document.querySelector('select[data-js="select-do-filtro-de-tipo"]'));
        }).catch((erro) => {
            console.error(erro);
        });
    }

    funcaoChange() {
        if(this.viewModel.tipoSelecionado() == "EMENDA"){
            document.querySelector(".js-caixa-de-alerta").style.display = 'none';
        }
        this.mediador.notificar('trocou-filtro-de-tipo', this.viewModel.tipoSelecionado());
    };
}