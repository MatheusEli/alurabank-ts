export function logarTempoDeExecucao(emSegundos:boolean = false) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {

            let unidade = 'ms';
            let divisor = 1;

            if(emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }

            console.log('---------------------------------');
            let t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            let t2 = performance.now();
            console.log(`Tempo de execução do método ${propertyKey}: ${(t2-t1)/divisor}${unidade}`);
            console.log('---------------------------------');
            return retorno;
        }

        return descriptor;
    }
}