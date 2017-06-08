class FiltroController {
    iniciar() {
        new FiltroDeStatus().iniciar();
        new FiltroDeTipo().iniciar();
        new GridFiltro().iniciar();
    }

    finalizar() {

    }
}

new FiltroController().iniciar();
