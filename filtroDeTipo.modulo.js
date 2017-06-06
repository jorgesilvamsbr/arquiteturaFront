const template = `
<select id="select-tipo-da-solicitacao" class="form-control" name="" data-js="filtro-de-tipo">
    <option>Transporte Escolar</option>
    <option>FUNDEB</option>
</select>
`;

class FiltroDeTipo {
    iniciar() {
        document.querySelector('div[data-js="filtro-de-tipo"]').innerHTML = template;
    }
}
