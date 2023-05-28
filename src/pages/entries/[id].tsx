import { ChangeEvent, FC, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'   // del snipper nextss y es solo la definicion de la interfaz//
import mongoose from 'mongoose';   // puedo desestructurar isValidObjectId de mongoose 
// import { isValidObjectId } from 'mongoose';   para validar el id de mongo

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, 
    FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, 
    TextField, IconButton 
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Layout } from "@/components/layouts"
import { EntryStatus } from "../../../interfaces";

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    age: number;
}

export const EntryPage:FC<Props> = (props) => {
 
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStatus>('pending');
    //cuando alguien toda el formulario
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])


    //cuando el campo cambie llamaremos al setInputChange con el valor que tenga el formulario
    const onTextFieldInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
       setInputValue(event.target.value)
    }

    //
    const onStatusChangeRadioGroup = (event: ChangeEvent<HTMLInputElement>) => {                                                                                                  
        console.log(event.target.value)
        
        //setStatus(event.target.value)             // no lo toma
        // setStatus(event.target.value as any)     // con el any pasa pero no ayuda mucho
        setStatus( event.target.value as EntryStatus ); // utiliza la interfaz
    }

    const onSaveUpdate = () => {
        console.log({ inputValue, status })
    }

    return (
        <Layout title="... ... ...">
            <Grid 
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                    <Card>
                        <CardHeader
                            title={`Entrada: ${ inputValue }`}
                            subheader={`Creada hace: .... minutos`}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    //const { data } = await  entriesApi // se puede hacer pero es como preguntarse a nosotros mismo Eric como te llamas, 
    // no tiene sentido porque estamos en el mismo backend 

    // lo primero tratar de obtener el id que viene por la URL, si el id no es valido tengo que sacar al cliente de hay
    // del context sacamos la informacion 
    // http://localhost:3000/entries/123    //  http://localhost:3000/entries/:param


   // console.log(ctx.params)   // el context que tengo aqui es distinto al del store // tambien se puede desestructurar
   // const { id } = ctx.params   // me algea porque no sabe que tipo de dato es
    const { id } = ctx.params as { id: string }  // solucionado


    // aplicando mongoID si no es valido no es necesario renderizar el componente
    if( !mongoose.isValidObjectId(id)) {
        return {
            redirect:{
                destination: '/',
                permanent: false 
            }
        }
    }
 
    return {
        props: {
           id
        }
    }
}

export default EntryPage

