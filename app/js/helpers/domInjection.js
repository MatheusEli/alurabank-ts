System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function domInjection(seletor) {
        return function (target, propertyKey) {
            let elemento;
            const getter = function () {
                if (!elemento) {
                    console.log(`buscando  ${seletor} para injetar em ${propertyKey}`);
                    elemento = $(seletor);
                }
                return elemento;
            };
            Object.defineProperty(target, propertyKey, {
                get: getter
            });
        };
    }
    exports_1("domInjection", domInjection);
    return {
        setters: [],
        execute: function () {
        }
    };
});
