import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';


const menuItems: string[] = ['Inbox','Starred','Send Email', 'Drafts' ]

export const Sidebar = () => {
  return (
    <Drawer
        anchor="left"
        open={ true }
        onClose={ () => console.log('cerrando')}
    >
        <Box sx={{ width: 250}}>

            <Box sx={{ padding: '5px 10px' }}>
                <Typography variant="h4">Menú</Typography>
            </Box>

            <List>
                {
                    menuItems.map(( text, index ) => (
                        <ListItem button key={ text }>
                            <ListItemIcon>
                                { index %2 ? <InboxOutlinedIcon/> : <EmailOutlinedIcon/> }
                            </ListItemIcon>
                            <ListItemText  primary={ text } />

                        </ListItem>
                    ))
                }
            </List>
            <Divider />
            <List>
                {
                    menuItems.map(( text, index ) => (
                        <ListItem button key={ text }>
                            <ListItemIcon>
                                { index %2 ? <InboxOutlinedIcon/> : <EmailOutlinedIcon/> }
                            </ListItemIcon>
                            <ListItemText  primary={ text } />

                        </ListItem>
                    ))
                }
            </List>

        </Box>
    </Drawer>
  )
}



