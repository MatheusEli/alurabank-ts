System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoDeExecucao(emSegundos = false) {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                let unidade = 'ms';
                let divisor = 1;
                if (emSegundos) {
                    divisor = 1000;
                    unidade = 'segundos';
                }
                console.log('---------------------------------');
                let t1 = performance.now();
                const retorno = metodoOriginal.apply(this, args);
                let t2 = performance.now();
                console.log(`Tempo de execução do método ${propertyKey}: ${(t2 - t1) / divisor}${unidade}`);
                console.log('---------------------------------');
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("logarTempoDeExecucao", logarTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
