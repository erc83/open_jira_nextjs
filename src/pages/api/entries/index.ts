import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { EntryModel, IEntry } from '../../../../models'

type Data =                         // la definicion de tipo 
    |  { message: string }          // se ve de esta manera la respuesta
    |  IEntry[]                     // o se ve de esta manera la respuesta
    |  IEntry

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getEntries( res )
        
        case 'POST':
            return postEntry( req, res ); //req viene el body de la peticion

        
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

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { description = '' } = req.body;

    //const newEntry = new EntryModel( req.body )
    const newEntry = new EntryModel({
        description,
        createdAt: Date.now(),

    })
    // ahora creamos la conexion que puede fallar
    try {
        await db.connect();
        await newEntry.save();
        await db.disconnect();
        
        return res.status(201).json( newEntry );
    } catch (error) {
        await db.disconnect();

        console.log(error)  // para verlo desde el lado del servidor

        return res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' })

    }
}


