const templateStatus = `
<select id="select-status" class="" name="">
  <option value="">Selecione</option>
  <option value="Em Analise">Em Analise</option>
  <option value="Com pendencia">Com pendencia</option>
</select>
`;

class FiltroDeStatus {
    iniciar() {
        document.querySelector('div[data-js="filtro-de-status"]').innerHTML = templateStatus;
        document.querySelector('#select-status').addEventListener('change', function() {
            window.mediador.notificar('trocou-filtro-de-status', this.value);
        });
    }
}
