import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'  

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, 
    FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, 
    TextField, IconButton 
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { EntriesContext } from '../../../context/entries';
import { dbEntries } from '../../../database';
import { Layout } from "@/components/layouts"
import { Entry, EntryStatus } from "../../../interfaces";






const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}

export const EntryPage:FC<Props>  = ({ entry }) => {
    //console.log(props.entry)


    const { updateEntryDrag } = useContext( EntriesContext );

 
    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false); //siempre en false

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])


    //cuando el campo cambie llamaremos al setInputChange con el valor que tenga el formulario
    const onTextFieldInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
       setInputValue(event.target.value)
    }

    //
    const onStatusChangeRadioGroup = (event: ChangeEvent<HTMLInputElement>) => {                                                                                                  
        // console.log(event.target.value)
        
        //setStatus(event.target.value)             // no lo toma
        // setStatus(event.target.value as any)     // con el any pasa pero no ayuda mucho
        setStatus( event.target.value as EntryStatus ); // utiliza la interfaz
    }

    const onSaveUpdate = async () => {
        //console.log({ inputValue, status })
        if( inputValue.trim().length === 0 ) return; // no hace nada retorna

        const updatedEntry: Entry = {   
            ...entry,                       // para no sobreescribir las entradas
                status, 
                description: inputValue
        } 

        // console.log(updatedEntry)
        // updateEntryDrag( updatedEntry ); // NO ES UNA FUNCTION ALGO PASA AQUI

        updateEntryDrag(updatedEntry, true)    // el true es para snackBar

       /*  const getentryprueba =  await dbEntries.getEntryById( updatedEntry._id )

        console.log(getentryprueba)
 */
    }

    return (
        <Layout title={ inputValue.substring(0,7) + '...' }>
            <Grid 
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={`Creada hace: ${entry.createdAt} minutos`}
                        >
                        </CardHeader>
                        <CardContent>
                            <TextField 
                                sx={{ marginTop:2 , marginBottom:1 }}
                                fullWidth
                                placeholder="Nueva entrada"
                                autoFocus
                                multiline
                                label='Nueva Entrada'
                                value={ inputValue }
                                onChange={ onTextFieldInputChange }
                                onBlur={ () => setTouched( true )}
                                /*  helperText={ inputValue.length <=0 && touched  && "Ingrese un valor" }
                                 error={ inputValue.length <= 0 && touched } */
                                helperText={ isNotValid  && "Ingrese un valor" }
                                error={ isNotValid && touched }
                            />
                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row={ true }
                                    value={status }
                                    onChange={ onStatusChangeRadioGroup }
                                >
                                    {
                                        validStatus.map( option => (
                                            <FormControlLabel
                                                key={ option }
                                                value={ option }
                                                control={ <Radio/> }
                                                label={ capitalize(option) }
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                variant='contained'
                                fullWidth
                                onClick={ onSaveUpdate }
                                /* aqui esta en el state el inputValue */
                                disabled={ inputValue.length <= 0  }
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton sx={{
                position:'fixed',
                bottom: 80,
                right: 80,
                backgroundColor: 'error.dark'
            }}>
                <DeleteOutlinedIcon/>
            </IconButton>

        </Layout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time 
// cuando el usuario hace la peticion, cuando la persona hce el request
// el srvidor lo genera cuando se hace una request y no se almacena en filesystem
// next recomienda hasta donde mas sea posible trabajar con path staticos o propiedades estaticas
// funcion asyncrona donde podemos fetch a otro lugar y corre por el lado del servidor
// podemos agregar secret key, tokens

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };  // solucionado

    const entry =  await dbEntries.getEntryById(id) // no importa que no tenga el id la funcion se encarga de validarlo

    if( !entry ) {
        return {
            redirect:{
                destination: '/',
                permanent: false,
            }
        }
    }
    


    return {
        props: {
           entry
        }
    }
}

export default EntryPage;

