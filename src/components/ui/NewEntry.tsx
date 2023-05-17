import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';   /* importamos el Icono */
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'; /* El nombre de lo puedo cambiar este es por defecto */

export const NewEntry = () => {
  return (
    <Box sx={{ marginBottom:2 , paddingX: 2 }}>  

        {/* button para desplegar el TextField */}

        <Button
            startIcon={<AddCircleOutlinedIcon /> }
            fullWidth
            variant="outlined"

        >
            Agregar Tarea
        </Button>


        <TextField 
            fullWidth
            sx={{ marginTop:2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label='Nueva entrada'
            helperText='Ingrese un valor'
        />


        <Box display='flex' justifyContent='space-between'>
            <Button
                variant='text'
                >
                Cancelar
            </Button>
            <Button
                variant='outlined'        
                color='secondary'
                endIcon={ <SaveOutlinedIcon /> }   /* Usamos unicono */
                >
                Guardar
            </Button>
        </Box>
    </Box>
  )
}
