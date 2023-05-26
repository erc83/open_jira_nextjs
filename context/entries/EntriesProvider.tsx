import { FC, useEffect, useReducer } from 'react';
// import { v4 as uuidv4 } from 'uuid';   

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';



export interface EntriesState {
    entries: Entry[];
    children?: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider:FC<EntriesState> = ({ children }) => {

   const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = async( description : string )=> {

        /* const newEntry: Entry = { 
            _id: uuidv4() ,
            description,
            createdAt: Date.now(),
            status: 'pending'
        } */

        // la entrada la tomamos desde el endpont

        // const resp = await entriesApi.post<Entry>('/entries')  // espera un Entry de la interfaz
        //const resp = await entriesApi.post<Entry>('/entries', { description: description })  // necesita en el body la description
        const resp = await entriesApi.post<Entry>('/entries', { description }) 




        // El dispatch esta esperando una entrada nuevamente
        dispatch({ type:'[Entry] - Add-Entry', payload: resp.data })

    }

    // podemos recibir lo que pensemos que necesitamos en este caso una entrada de typo Entry 
    // recibimos toda la entrada
    const updateEntryDrag = ( entry: Entry ) => {

        // despues tenemo que hacerlo con la base de datos que tiene un cuerpo
        dispatch( { type: '[Entry] - Update-Drag-Entry', payload: entry })

    }

    //la ejecutamos la primera vez que la app es cargada
    const refreshEntry = async() => {
        // const resp = await entriesApi.get('/entries')
        const { data } = await entriesApi.get<Entry[]>('/entries') //Entry[] arreglo de entradas
        console.log(data)
        dispatch({ type: '[Entry] - Refresh-Entry', payload: data }) 
    }


    // para disparar efectos secundarios, llama la funcion 
    useEffect(() => {
        refreshEntry();
    },[]);
    


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