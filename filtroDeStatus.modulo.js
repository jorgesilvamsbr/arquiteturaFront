const templateStatus = `
<select id="select-status" class="form-control" name="" data-js="select-do-status-da-empresa" data-bind=" options: status, optionsCaption: 'Selecione o status'">
</select>
`;

let $ = require("jquery");

class FiltroDeStatus {
    iniciar() {
        $.ajax({
            url: urlBase.obter() + "solicitacao/status"
        }).then(function (data) {
            this.status = data;
            document.querySelector('div[data-js="filtro-de-status"]').innerHTML = templateStatus;
            document.querySelector('#select-status').addEventListener('change', function () {
                window.mediador.notificar('trocou-filtro-de-status', this.value);
            });
            ko.applyBindings(this, document.querySelector('select[data-js="select-do-status-da-empresa"]'));
        });
    }
}

module.exports = FiltroDeStatus;