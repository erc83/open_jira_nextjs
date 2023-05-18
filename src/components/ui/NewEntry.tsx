import { ChangeEvent, useContext, useState } from 'react';

import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';   
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'; 

import { EntriesContext } from "../../../context/entries";
import { UIContext } from "../../../context/ui";

export const NewEntry = () => {
    const { addNewEntry } = useContext(EntriesContext)

    // const [isAdding, setIsAdding] = useState(false)  
    const { setIsAddingEntry, isAddingEntry, setClosingEntry } = useContext(UIContext)

    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState( true )

    const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {   
        setInputValue( event.target.value)
    }

    const onSave = () => {
        if( inputValue.length === 0) return;
        
        addNewEntry( inputValue );       

        setClosingEntry()

        setTouched( false );
        setInputValue('');

    }

  return (
    <Box sx={{ marginBottom:2 , paddingX: 2 }}>  

        {
            isAddingEntry ? (   
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
                            onClick={ setClosingEntry }
                            >
                            Cancelar
                        </Button>
                        <Button
                            variant='outlined'        
                            color='secondary'
                            endIcon={ <SaveOutlinedIcon /> }   
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
                        onClick={ setIsAddingEntry }
                    >
                        Agregar Tarea
                    </Button>
                </>
            )
        }
    </Box>
  )
}
function dispatch(arg0: void) {
    throw new Error('Function not implemented.');
}

