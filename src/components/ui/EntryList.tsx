import { FC, useContext, useMemo } from "react";
import { Paper, List } from '@mui/material';

import { EntryCard } from './';
import { EntryStatus } from '../../../interfaces';
import { EntriesContext } from "../../../context/entries";


// recibe una propiedad de tipo status y va a ser igual a mi EntryStatus de las interfaces 
interface Props {
  status: EntryStatus
}


export const EntryList:FC<Props> = ( { status } ) => { // el status no se tiene que memorizar porque siempre va a se el mismo
  //console.log(status)
  const { entries } = useContext(EntriesContext);

  // const entriesByStatus = entries.filter( entry => entry.status === status );
  
  // usando el useMemo
  
  // con esto ya tenemos definido el useMemo 
  const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [entries] )   // cuando las entries cambien tiene que volver a memorizar
  

  

  return (
    // TODO: aqui haremos drop
    <div>
        <Paper sx={{ 
            height: 'calc(100vh - 150px)', 
            overflow: 'scroll',
           /*  overflowY: 'hidden', */
            overflowX: 'hidden',
            backgroundColor: 'transparent', 
            padding: '3px 5px' 
        }}>

            {/* Todo: cambiará dependiendo si estoy haciendo drag o no */}
            <List sx={{ opacity: 1}}>

              {
                entriesByStatus.map(entry =>(
                  <EntryCard key={ entry._id }  entry={ entry } />   // se queja typescript necesita una props el EntryCard
                ))
              }
            </List>

        </Paper>
    </div>
  )
}
