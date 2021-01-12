import { logarTempoDeExecucao } from '../helpers/index';
import { Negociacao } from './Negociacao';
import { Imprimivel } from './Imprimivel';

export class Negociacoes implements Imprimivel{

    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao:Negociacao):void{
        this._negociacoes.push(negociacao);
    }

    @logarTempoDeExecucao(true)
    paraArray():Negociacao[]{
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {

        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes));
    }
}