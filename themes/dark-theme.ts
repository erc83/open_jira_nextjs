import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette:{
    mode:'dark',
    primary:{
      main: grey[100]
    },
    secondary:{
        main: '#19857b'
    },
    error:{
        main: red.A400
    },
  },
  // para modificar el AppBar se tiene que llamar el MuiAppBar y solo para este tema en especifico
  components: {
    MuiAppBar:{
      defaultProps: {
        elevation: 0
      },     // es otro objeto que se puede enviar,
      styleOverrides:{      // para cambiar el stylo
        root: {
          backgroundColor: '#4a148c',
          elevation: 0
        }
      }
    }
  }
}); 