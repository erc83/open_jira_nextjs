import { ChangeEvent, useState } from "react";

import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';   /* importamos el Icono */
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'; /* El nombre de lo puedo cambiar este es por defecto */

export const NewEntry = () => {

    const [isAdding, setIsAdding] = useState(false)  // estoy agregando

    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState( true )

    const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {   // event.  tradicional en javascript podemos ver el evento  
        setInputValue( event.target.value)
    }

    const onSave = () => {
        if( inputValue.length === 0) return;

        console.log({ inputValue }) // estructurando el objeto
    }


  return (
    <Box sx={{ marginBottom:2 , paddingX: 2 }}>  

        {
            isAdding ? (   // aqui puedo tranformar en un componente porque no se va a expandir mas
                <>
                    <TextField 
                        fullWidth
                        sx={{ marginTop:2, marginBottom: 1 }}
                        placeholder="Nueva entrada"
                        autoFocus
                        multiline
                        label='Nueva entrada'
                        helperText={ inputValue.length <= 0 && touched && 'Ingrese un Valor' }
                        error= { inputValue.length <= 0 && touched }
                        value={ inputValue }
                        onChange={ onTextFieldChanges }
                        onBlur={ () => setTouched( true ) }
                    />
                    <Box display='flex' justifyContent='space-between'>
                        <Button
                            variant='text'
                            onClick={() => setIsAdding( false )}
                            >
                            Cancelar
                        </Button>
                        <Button
                            variant='outlined'        
                            color='secondary'
                            endIcon={ <SaveOutlinedIcon /> }   /* Usamos unicono */
                            onClick={ onSave }
                            >
                            Guardar
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Button
                        startIcon={<AddCircleOutlinedIcon /> }
                        fullWidth
                        variant="outlined"
                        onClick={ ()  => setIsAdding( true )}
                    >
                        Agregar Tarea
                    </Button>
                </>
            )
        }
       


        


        



    </Box>
  )
}
