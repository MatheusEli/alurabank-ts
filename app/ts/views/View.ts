import { logarTempoDeExecucao } from '../helpers/index';
export abstract class View<T>{
    
    private _elemento:JQuery;
    private _escapar:boolean;

    constructor(seletor:string, escapar:boolean = false){
        this._escapar = escapar;
        this._elemento = $(seletor);
    }

    @logarTempoDeExecucao()
    update(model:T):void{

        let template = this.template(model);
        if(this._escapar){
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this._elemento.html(template);
    }

    abstract template(model:T):string;
}