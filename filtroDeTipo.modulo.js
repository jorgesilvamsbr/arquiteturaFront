const template = `
<select id="select-tipo-da-solicitacao" class="form-control" name="" data-js="select-do-filtro-de-tipo" data-bind=" options: tipo, optionsCaption: 'Selecione o tipo'">
</select>
`;

class FiltroDeTipo {
    iniciar() {
        $.ajax({
            url: urlBase.obter() + "solicitacao/tipo"
        }).then(function (data) {
            this.tipo = data;
            document.querySelector('div[data-js="filtro-de-tipo"]').innerHTML = template;
            document.querySelector('#select-tipo-da-solicitacao').addEventListener('change', function () {
                window.mediador.notificar('trocou-filtro-de-tipo', this.value);
            });
            ko.applyBindings(this, document.querySelector('select[data-js="select-do-filtro-de-tipo"]'));
        });
    }
}
