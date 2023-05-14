import { FC } from 'react';
import Head from 'next/head';   // especifico cierta propiedaddes a mostrar en el el head

import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import { darkTheme, lightTheme } from '../../../themes';

import { Nabvar, Sidebar } from '../ui';
import { UIProvider } from '../../../context/ui';


interface Props {
    title?: string;
    //children: JSX.Element
}

export const Layout: FC<Props> = ({ title = 'Open Jira', children }) => {
  return (
    <UIProvider>
      <ThemeProvider theme={ darkTheme }>
        <CssBaseline />
            
          <Box sx={{ flexFlow:1,  }}>
              <Head>
                  <title>{ title }</title>
              </Head>

              <Nabvar />
                
              <Sidebar />

              <Box sx={{ padding: '10px 20px'}}>
                  { children }
              </Box>
      
          </Box>
      </ThemeProvider> 
    </UIProvider>
  )
}

