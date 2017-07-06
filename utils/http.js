import $ from "jquery";

export default class Http{
    static post(){
        console.log('Http Post');
    }

    static get(url){
        return $.get(url);
    }
}