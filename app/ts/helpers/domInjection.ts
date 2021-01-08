export function domInjection(seletor:string){

    return function(target:any, propertyKey:string){
        let elemento: JQuery;

        const getter = function() {

            if(!elemento) {
                console.log(`buscando  ${seletor} para injetar em ${propertyKey}`);
                elemento = $(seletor);
            }

            return elemento;
        }
        Object.defineProperty(target, propertyKey, {
            get: getter
        });
    } 
}