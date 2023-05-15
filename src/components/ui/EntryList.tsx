import { Paper, List } from '@mui/material';
import { EntryCard } from './';


export const EntryList = () => {
  return (
    // TODO: aqui haremos drop
    <div>
        <Paper sx={{ 
            height: 'calc(100vh - 150px)', 
            overflow: 'scroll',
           /*  overflowY: 'hidden', */
            overflowX: 'hidden',
            backgroundColor: 'transparent', 
            padding: '3px 5px' 
        }}>

            {/* Todo: cambiará dependiendo si estoy haciendo drag o no */}
            <List sx={{ opacity: 1}}>
                <EntryCard />
                <EntryCard />
                <EntryCard />
                <EntryCard />
                <EntryCard />
                <EntryCard />
                <EntryCard />
                <EntryCard />
                <EntryCard />
                <EntryCard />
                <EntryCard />
            </List>

        </Paper>
    </div>
  )
}
