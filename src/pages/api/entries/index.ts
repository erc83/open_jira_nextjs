import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { EntryModel, IEntry } from '../../../../models'

type Data =                         // la definicion de tipo 
    |  { message: string }          // se ve de esta manera la respuesta
    |  IEntry[]                     // o se ve de esta manera la respuesta

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getEntries( res )
        
            default:
                return res.status(400).json({ message: 'No existe enpoint' }) // bad request, enpoint no existe
    }
}   

// solicitud de toda la data de la base de datos
const getEntries =  async ( res: NextApiResponse<Data> ) => {
    // nos conectamos a la base de datos
    await db.connect()
    const entries = await EntryModel.find().sort({ createdAt: 'ascending' })
    await db.disconnect()  // no olvidar la desconexion

    return res.status(200).json( entries )  // regresamos la entradas, el return esta de mas porque lo tiene el switch
}

