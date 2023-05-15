import { createContext } from 'react';
import { Entry } from '../../interfaces';

// ahora se que las entradas son un arreglo y que necesitan las entradas del interface
interface ContextProps {
    entries: Entry[];    // aun no sabemos que tipo de dato es // todo: falta el tipo de dato del arreglo
}


export const EntriesContext = createContext({} as ContextProps);