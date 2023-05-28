import { useContext } from "react";
import NextLink from "next/link";

import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { UIContext } from "../../../context/ui";

export const Nabvar = () => {

  // tenemos que tomar el contexto la funcion
  const { openSideMenu } = useContext( UIContext )

  return (
    <AppBar position='sticky' /* elevation={ 0 }  */>
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                onClick={ openSideMenu }   // ejecutamos la funcion que ya esta en el contexto
            >
                <MenuOutlinedIcon />
            </IconButton>

            <NextLink href='/' passHref>
              <Link underline="none" color={ 'white' }>
                <Typography variant="h5">OpenJira</Typography>
              </Link>
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}
