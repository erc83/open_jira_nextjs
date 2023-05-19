import { DragEvent, FC, useContext, useMemo } from "react";
import { Paper, List } from '@mui/material';

import { EntryCard } from './';
import { EntryStatus } from '../../../interfaces';
import { EntriesContext } from "../../../context/entries";
import { UIContext } from "../../../context/ui";

import styles from './EntryList.module.css'  // ya viene en next

// recibe una propiedad de tipo status y va a ser igual a mi EntryStatus de las interfaces 
interface Props {
  status: EntryStatus
}


export const EntryList:FC<Props> = ( { status } ) => { // el status no se tiene que memorizar porque siempre va a se el mismo
  //console.log(status)
  const { entries, updateEntryDrag } = useContext(EntriesContext);

  const { isDragging, endDragging } = useContext(UIContext)  // importar el context cuando isDragging y cuando tiene el endDragging
  // const entriesByStatus = entries.filter( entry => entry.status === status );
  // usando el useMemo
  // con esto ya tenemos definido el useMemo 
  const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [entries] )   // cuando las entries cambien tiene que volver a memorizar
  
  const allowDropEntry = (event:DragEvent<HTMLDivElement> ) => {
    event.preventDefault()
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    console.log(id)

    // se puede hacer una condicion que si la entry no existe no haga nada
    const entry = entries.find( e => e._id === id ) ! ;  // recibe Entry | undefined con el signo ! recibe Entry

    // lamar la accion  const { entries, updateEntryDrag } = useContext(EntriesContext);
    // hacemos el dispatch de la accion respectiva 

    entry.status = status;   // cambiamos el nuevo status

    updateEntryDrag( entry )  // pide la entrada que tengo aqui entry que es el objeto

    endDragging()    // aqui finalizamos el estado del cambio del draggin 

  }
  
  return (
    // TODO: aqui haremos drop
    <div
      onDrop={ onDropEntry }
      onDragOver={ allowDropEntry }    // para dejar caer algun objeto
      className={ isDragging ? styles.dragging : '' }
    >
        <Paper sx={{ 
            height: 'calc(100vh - 150px)', 
            overflow: 'scroll',
           /*  overflowY: 'hidden', */
            overflowX: 'hidden',
            backgroundColor: 'transparent', 
            padding: '3px 5px' 
        }}>
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>

              {
                entriesByStatus.map(entry =>(
                  <EntryCard key={ entry._id }  entry={ entry } />  
                ))
              }
            </List>

        </Paper>
    </div>
  )
}
