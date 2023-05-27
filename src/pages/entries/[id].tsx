import { ChangeEvent, useState } from 'react';

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

    //cuando el campo cambie llamaremos al setInputChange con el valor que tenga el formulario
    const onTextFieldInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
       setInputValue(event.target.value)
    }

    //
    const onStatusChange = () => {                                                                                                  

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
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row={ true }
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

