const template = `
<ul>
  <li>Transporte escolar</li>
  <li>FUNDEB</li>
</ul>
`;

class FiltroDeTipo {
    iniciar() {
        document.querySelector('div[data-js="filtro-de-tipo"]').innerHTML = template;
    }
}
