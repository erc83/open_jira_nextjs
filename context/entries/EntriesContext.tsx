import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
    entries: Entry[];    
    
    //methods
    addNewEntry: (description: string) => void;

    // method para hacer el drag
    updateEntryDrag: (entry: Entry, showSnackbar?: boolean) => void ;
}


export const EntriesContext = createContext({} as ContextProps);