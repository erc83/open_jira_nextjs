import { ChangeEvent, useMemo, useState } from 'react';

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, 
    FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, 
    TextField, IconButton 
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Layout } from "@/components/layouts"
import { EntryStatus } from "../../../interfaces";


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

export const EntryPage = () => {

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

export default EntryPage

