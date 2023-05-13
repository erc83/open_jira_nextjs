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
// es otro objeto que puede cambiar el color de todos los componentes de material ui y se estandarizan
components: {
    
}
}); 