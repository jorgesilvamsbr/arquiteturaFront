const templateStatus = `
<select id="select-status" class="form-control" name="" data-js="select-do-status-da-empresa" data-bind=" options: ramos, optionsCaption: 'Selecione o ramo'">
</select>
`;

class FiltroDeStatus {
    iniciar() {
        $.ajax({
            url: "http://soelogios.herokuapp.com/empresas/ramoDeNegocio"
        }).then(function (data) {
            this.ramos = data;
            document.querySelector('div[data-js="filtro-de-status"]').innerHTML = templateStatus;
            document.querySelector('#select-status').addEventListener('change', function () {
                window.mediador.notificar('trocou-filtro-de-status', this.value);
            });
            ko.applyBindings(this, document.querySelector('select[data-js="select-do-status-da-empresa"]'));
        });
    }
}