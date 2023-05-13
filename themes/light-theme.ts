import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const lightTheme = createTheme({
    palette:{
        mode:'light',
        background: {
            default: grey[300]
        },
        primary:{
            main: '#4a148c'
        },
        secondary:{
            main: '#19857b'
        },
        error:{
            main: red.A400
        },
    },
    // es otro objeto que puede cambiar el color de todos los componentes de material ui y se estandarizan
    components: {
        MuiAppBar:{
            defaultProps: {      // es otro objeto que se puede enviar, modificando elevation
                elevation: 0
            },    
            styleOverrides:{      // para cambiar el stylo
              root: {
                backgroundColor: '#4a148c',
              }
            }
          }
    }
}); 