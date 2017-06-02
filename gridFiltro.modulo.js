let templateGrid = `
<table>
  <tbody data-bind="foreach:solicitacoes">
    <tr>
      <td data-bind="text: status"></td>
      <td data-bind="text: tipo"></td>
    </tr>
  </tbody>
</table>
`
class GridFiltro {
    constructor() {
        this.solicitacoes = ko.observableArray([{
                status: "Em Analise",
                tipo: "FUNDEB"
            },
            {
                status: "Em Analise",
                tipo: "Emenda Parlamentar"
            },
            {
                status: "Celebrada",
                tipo: "Cessao de Pessoal"
            },
            {
                status: "Com pendencia",
                tipo: "Transporte Escolar"
            }
        ]);
    }

    iniciar() {
        document.querySelector('div[data-js="grid-de-solicitacoes"]').innerHTML = templateGrid;
        ko.applyBindings(this, document.querySelector('div[data-js="grid-de-solicitacoes"]'));
        window.mediador.registrar('trocou-filtro-de-status', (status) => {
            let solicitacoesFiltradas = this.solicitacoes().filter((solicitacao) => {
                return solicitacao.status === status;
            });
            this.solicitacoes(solicitacoesFiltradas);
        });
    }
}
