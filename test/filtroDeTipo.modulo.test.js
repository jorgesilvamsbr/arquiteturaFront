import expect from "expect.js";
import FiltroDeTipo from "../filtroDeTipo.modulo";
import $ from "jquery";
import Mediador from "../mediador";

describe("Filtro de tipo de solicitação", () => {
    it("deve exibir os tipos de solicitação", () => {
        let mediador = new Mediador();
        let filtroDeTipo = new FiltroDeTipo(mediador);
        $.ajax = () => {return new Promise((resolve, reject)=>{
            resolve.apply(filtroDeTipo, [[{tipo:""}]]);
        })};
        filtroDeTipo.iniciar();

        expect($('#select-tipo-da-solicitacao option').length).to.be.equal(5);
    })
})