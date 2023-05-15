
import { Layout } from "@/components/layouts"

import { Card, CardContent, CardHeader, Grid  } from "@mui/material"
import { EntryList } from '../components/ui';


export default function HomePage() {
  return (
    <Layout title='Home - Open Jira'>

      <Grid container spacing={ 2 }>
        
        {/* xs en tamño pequeño usa los doce espacios */}
        <Grid item xs={ 12 } sm={ 4 } > 
          {/* sx extended style */}
          <Card sx={{ height: 'calc(100vh - 100px )'}}>
            <CardHeader title="Pendientes" />

              {/* Agregar una nueva entrada */}
              {/* Listado de las entradas  */}
              <EntryList/>

          </Card>
        
        </Grid>
        <Grid item xs={ 12 } sm={ 4 } > 
          <Card sx={{ height: 'calc(100vh - 100px )'}}>
            <CardHeader title="En Progreso" />
          
            <EntryList/>
          </Card>
        
        </Grid>
        <Grid item xs={ 12 } sm={ 4 } > 
          <Card sx={{ height: 'calc(100vh - 100px )'}}>
            <CardHeader title="Completadas" />
          
            <EntryList/>
          </Card>
        
        </Grid>
      </Grid>
    </Layout>
  )
}
