import { Negociacao, Negociacoes } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { domInjection, imprime, throttle } from '../helpers/index';
import { NegociacaoParcial } from '../models/index';
import { NegociacaoService } from '../services/index';

export class NegociacaoController {

    @domInjection('#data')
    private _inputData: JQuery;

    @domInjection('#quantidade')
    private _inputQuantidade: JQuery;

    @domInjection('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView("#negociacoesView");
    private _mensagemView = new MensagemView("#mensagemView");

    private _service = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona(event: Event) {

        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update("Somente negociações em dias úteis, por favor!");
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociacao adicionada com sucesso!");

        imprime(negociacao, this._negociacoes);
    }

    private _ehDiaUtil(data: Date) {
        return (data.getDay() != DiaDaSemana.Domingo) && (data.getDay() != DiaDaSemana.Sabado);
    }


    @throttle()
    importarDados() {

        this._service.obterNegociacoes(res => {
            if(res.ok) return res;
            throw new Error(res.statusText);
        })
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
            this._negociacoesView.update(this._negociacoes);
        })

    }
}

enum DiaDaSemana {

    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado

}