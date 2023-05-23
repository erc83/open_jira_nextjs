import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';   

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';


export interface EntriesState {
    entries: Entry[];
    children?: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider:FC<EntriesState> = ({ children }) => {

   const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = ( description : string )=> {

        const newEntry: Entry = { 
            _id: uuidv4() ,
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type:'[Entry] - Add-Entry', payload: newEntry })

    }

    // podemos recibir lo que pensemos que necesitamos en este caso una entrada de typo Entry 
    // recibimos toda la entrada
    const updateEntryDrag = ( entry: Entry ) => {

        // despues tenemo que hacerlo con la base de datos que tiene un cuerpo
        dispatch( { type: '[Entry] - Update-Drag-Entry', payload: entry })

    }


   return (
       <EntriesContext.Provider value={{
         ...state,

        //method
        addNewEntry,
        
        // pasamos updateEntryDrag para que sepa que tiene una nueva funcion
        updateEntryDrag
       }}>
       { children }
       </EntriesContext.Provider>
   )
}