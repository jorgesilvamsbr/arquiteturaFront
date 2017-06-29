import FiltroDeStatus from './filtroDeStatus.modulo';
import FiltroDeTipo from './filtroDeTipo.modulo';
import GridFiltro from './gridFiltro.modulo';
import Mediador from './mediador';

export default class FiltroController {
    iniciar() {
        const mediador = new Mediador();
        new FiltroDeStatus(mediador).iniciar();
        new FiltroDeTipo(mediador).iniciar();
        new GridFiltro(mediador).iniciar();
    }

    finalizar() {

    }
}