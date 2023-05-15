import { createContext } from 'react';


interface ContextProps {
    entries: [];    // aun no sabemos que tipo de dato es // todo: falta el tipo de dato del arreglo
}


export const EntriesContext = createContext({} as ContextProps);