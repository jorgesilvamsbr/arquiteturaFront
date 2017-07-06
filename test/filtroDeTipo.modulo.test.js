import expect from "expect.js";
import FiltroDeTipo from "../filtroDeTipo.modulo";
import Mediador from "../mediador";
import Http from "../utils/http";
import td from 'testdouble';
import FakePromise from './fakePromise';
import urlBase from '../utils/urlBase';

describe("Filtro de tipo de solicitação", () => {

    beforeEach(() => {
        document.body.innerHTML = '<div data-js="filtro-de-tipo"></div>';
    });

    it("deve exibir os tipos de solicitação", () => {
        let mediador = new Mediador();
        let filtroDeTipo = new FiltroDeTipo(mediador);
        let dataFake = ['FUNDEB'];
        
        let stub = td.function();
        td.when(stub(urlBase.obter() + "solicitacao/tipo")).thenReturn(new FakePromise(dataFake));
        Http.get = stub;

        filtroDeTipo.iniciar();
        let tiposNaTela = document.querySelectorAll('#select-tipo-da-solicitacao option');
        let optionPadrao = 1;
        let optionsEsperados = 1 + optionPadrao;
        
        expect(tiposNaTela.length).to.be.equal(optionsEsperados);
    })
})