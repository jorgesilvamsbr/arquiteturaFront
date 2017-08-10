import ko from 'knockout';
import urlBase from './utils/urlBase';
let templateGrid = `
<table class="table table-striped">
    <thead>
        <tr>
            <td>Descricao</td>
            <td>Status</td>
            <td>Tipo</td>
        </tr>    
    </thead>
  <tbody data-bind="foreach:solicitacoes">
    <tr>
      <td data-bind="text: assunto"></td>
      <td data-bind="text: statusDaSolicitacao"></td>
      <td data-bind="text: tipoDeSolicitacao"></td>
    </tr>
  </tbody>
</table>
`
let url;

export default class GridFiltro {
    
    constructor(mediador) {
        this.mediador = mediador;
    }

    iniciar() {
        this.solicitacoes = ko.observableArray();
        this.obterSolicitacoesFiltradasPorStatus();

        document.querySelector('div[data-js="grid-de-solicitacoes"]').innerHTML = templateGrid;
        ko.applyBindings(this, document.querySelector('div[data-js="grid-de-solicitacoes"]'));

        this.mediador.registrar('trocou-filtro-de-status', (statusDaSolicitacao) => {
            let solicitacoesFiltradas = this.obterSolicitacoesFiltradasPorStatus(statusDaSolicitacao);
            this.solicitacoes(solicitacoesFiltradas);
        });

        this.mediador.registrar('trocou-filtro-de-tipo', (tipoDaSolicitacao) => {
            let solicitacoesFiltradas = this.obterSolicitacoesFiltradasPorTipo(tipoDaSolicitacao);
            this.solicitacoes(solicitacoesFiltradas);
        });
    }

    obterSolicitacoesFiltradasPorTipo(tipoDaSolicitacao) {
        if(tipoDaSolicitacao == null ||  tipoDaSolicitacao == ""){
            this.filtrar(urlBase.obter() + "solicitacao");
        }else{
            this.filtrar(urlBase.obter() + "solicitacao/tipo/" + tipoDaSolicitacao);
        }
    }

    obterSolicitacoesFiltradasPorStatus(statusDaSolicitacao) {
        if(statusDaSolicitacao == null || statusDaSolicitacao == ""){
            this.filtrar(urlBase.obter() + "solicitacao");
        }else{
            this.filtrar(urlBase.obter() + "solicitacao/status/" + statusDaSolicitacao);
        }
    }

    filtrar(url) {
        $.get(url).then((resposta) => {
            this.solicitacoes(resposta);
        });
    }
}