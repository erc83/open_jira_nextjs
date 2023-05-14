import { createContext } from 'react';

// aca puede tener funciones, metodos es diferente al UIProvider
interface ContextProps {
    sidemenuOpen: boolean;
}


export const UIContext = createContext({} as ContextProps);