import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';   

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';


export interface EntriesState {
    entries: Entry[];
    children?: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: Lorem impsum',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'En-Progreso Lorem impsum in-progres',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: 'Terminadas: Lorem impsum finished',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
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

   return (
       <EntriesContext.Provider value={{
         ...state,

        //method
        addNewEntry     

       }}>
       { children }
       </EntriesContext.Provider>
   )
}