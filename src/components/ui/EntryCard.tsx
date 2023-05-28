import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../../interfaces';
import { UIContext } from '../../../context/ui';

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext( UIContext )
    // useRouter?    ya tengo las tarjetas cargadas y se tiene que hacer la navegacion cuando el cliente hace click en ellas
    const router = useRouter();



    const onDragStart = ( event: DragEvent ) => {
        console.log(event)
        event.dataTransfer.setData('text', entry._id)    // solo acepta string setData

        // todo: modificar el estado, para indicar que estoy haciendo drag
        startDragging()
    }

    const onDragEnd = () => {
        // todo: cancelar el drag
        endDragging()
    }
    const onClickUpdateEntry = () => {
        router.push(`/entries/${ entry._id }`);
    }

  return (
    <Card
        onClick={ onClickUpdateEntry  }
        sx={{ marginBottom: 1 }}
        draggable
        onDragStart={ onDragStart}
        onDragEnd={ onDragEnd } 
    >

        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line'}}>{ entry.description }</Typography>
            </CardContent>

            <CardActions sx={{ display:'flex', justifyContent:'end', paddingRight:2  }}>
                <Typography variant='body2'>hace 30 minutos</Typography>
            </CardActions>

        </CardActionArea>

    </Card>
  )
}



