import type { NextApiRequest, NextApiResponse} from 'next';
import { db } from '../../../database';

type Data = {
    message: string;
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    if ( process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a este servicio'})
    }

    await db.connect();

    // aqui podemos hacer las consultas que necesitamos a la base de datos

    await db.disconnect();

    res.status(200).json({
        message: 'Proceso realizado correctamente'
    })
}

// http://localhost:3000/api/seed