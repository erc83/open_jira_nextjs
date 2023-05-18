import { createContext } from 'react';

// aca puede tener funciones, metodos es diferente al UIProvider
interface ContextProps {
    sidemenuOpen: boolean;

    // methods 
    openSideMenu: () => void; 
    closeSideMenu: () => void;

    isAddingEntry: boolean;
    setIsAddingEntry: (isAdding: boolean) => void;

    isDragging: boolean;
    startDragging: () => void;
    endDragging: () => void;
}


export const UIContext = createContext({} as ContextProps);