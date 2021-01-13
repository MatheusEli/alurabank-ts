import { Igualavel } from "./Igualavel";
import { Imprimivel } from "./Imprimivel";

export interface MeuObjeto<T> extends Imprimivel, Igualavel<T>{}