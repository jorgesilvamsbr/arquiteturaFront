let templateGrid = `
<table class="table table-striped">
    <thead>
        <tr>
            <td>Id</td>
            <td>Nome</td>
        </tr>    
    </thead>
  <tbody data-bind="foreach:solicitacoes">
    <tr>
      <td data-bind="text: id"></td>
      <td data-bind="text: nome"></td>
    </tr>
  </tbody>
</table>
`
class GridFiltro {
    constructor() {
    }

    iniciar() {
        this.solicitacoes = ko.observableArray();
        this.obterEmpresas();

        document.querySelector('div[data-js="grid-de-solicitacoes"]').innerHTML = templateGrid;
        ko.applyBindings(this, document.querySelector('div[data-js="grid-de-solicitacoes"]'));

        window.mediador.registrar('trocou-filtro-de-status', (ramoDeNegocio) => {
            let solicitacoesFiltradas = this.obterEmpresas(ramoDeNegocio);
            this.solicitacoes(solicitacoesFiltradas);
        });
    }

    obterEmpresas(ramoDeNegocio) {
        $.get("http://localhost:8080/empresas/filtrarPor/" + ramoDeNegocio)
            .then((resposta) => {
                this.solicitacoes(resposta);
            });
    }
}
