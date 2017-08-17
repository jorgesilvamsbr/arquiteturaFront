import expect from "expect.js";
import FiltroDeTipo from "../filtroDeTipo.modulo";
import Mediador from "../mediador";
import Http from "../utils/http";
import td from 'testdouble';
import FakePromise from './fakePromise';
import urlBase from '../utils/urlBase';
import $ from 'jquery';

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
    });

    it("deve emitir evento quando trocar o valor do filtro de tipo de solicitação", () => {
        let mediador = new Mediador();
        mediador.notificar = td.function();
        let dataFake = ['Teste','FUNDEB'];
        let stub = td.function();
        td.when(stub(urlBase.obter() + "solicitacao/tipo")).thenReturn(new FakePromise(dataFake));
        Http.get = stub;
        let filtroDeTipo = new FiltroDeTipo(mediador);
        filtroDeTipo.iniciar();
        
        let seletor = document.getElementById("select-tipo-da-solicitacao");
        seletor.value = 'FUNDEB';
        let eventoDeChange = document.createEvent("HTMLEvents");
        eventoDeChange.initEvent("change", true, true);
        seletor.dispatchEvent(eventoDeChange);

        
        let variavel = td.explain(mediador.notificar);
        console.log(variavel);
        td.verify(mediador.notificar('trocou-filtro-de-tipo', 'FUNDEB'))
    });

    it("deve esconder o alerta quando selecionar o tipo de solicitacao igual a EMENDA", () => {
        let mediador = new Mediador();
        mediador.notificar = td.function();
        let dataFake = ['TRANSPORTE_ESCOLAR','EMENDA'];
        let stub = td.function();
        td.when(stub(urlBase.obter() + "solicitacao/tipo")).thenReturn(new FakePromise(dataFake));
        Http.get = stub;
        let filtroDeTipo = new FiltroDeTipo(mediador);
        filtroDeTipo.iniciar();
        
        let seletor = document.getElementById("select-tipo-da-solicitacao");
        seletor.value = 'EMENDA';
        let eventoDeChange = document.createEvent("HTMLEvents");
        eventoDeChange.initEvent("change", true, true);
        seletor.dispatchEvent(eventoDeChange);

        expect(document.querySelector(".js-caixa-de-alerta").style.display).to.be.equal("none");
    });
});