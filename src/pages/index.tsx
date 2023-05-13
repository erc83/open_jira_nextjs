import { Typography } from "@mui/material"
import { CssBaseline, ThemeProvider} from '@mui/material'
import { darkTheme, lightTheme } from '../../themes'


export default function HomePage() {
  return (
    <ThemeProvider theme={ darkTheme }>
      <CssBaseline />
      <Typography variant="h1" color='primary'>Hola Home Page</Typography>
          
    </ThemeProvider> 
  )
}
