
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../../database';
import { EntryModel, IEntry } from '../../../../../models';

type Data = 
| { message: string }
| IEntry
| null

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    // console.log(req.query) // del lado del servidor   // { id: '6470305d02dfabf6834372fa' }
    const { id } = req.query; // siempre son string

    // validaciones cuando no me envian un id correcto a mongo DB

    if( !mongoose.isValidObjectId( id )){
        return res.status(400).json({ message: 'El id no es válido ' + id })        
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry( req, res );

        default:
            return res.status(400).json({ message: 'Método no existe' })
    }
}



const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect()

    const entryToUpdate = await EntryModel.findById( id );
                            //console.log(entryToUpdate) // lado del servidor
    if( !entryToUpdate ) {
        await db.disconnect()
        return res.status(400).json({ message: 'No hay entrada con ese Id ' + id })
    }


    // usare si viene la description que es opcional y el id para actualizar
    // si viene la description usara esa description si no usa la entryToUpdate.description
    // si viene el status utiliza ese status si no utiliza entryToUpdate.status
    const { 
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body
         // runValidation para que revise que estado sea uno de los estados de nuestra numeracion
           // new en true para que nos mande y no regrese la informacion actualizada
    
    try {
        const updatedEntry = await EntryModel.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });
        // opcional
        // entryToUpdate.description = description;
        // entryToUpdate.status = status;
        // await entryToUpdate.save()
        await db.disconnect()
        res.status(200).json( updatedEntry! );   // con el ! le decimos que siempre va a tener un valor porque lo revisamos

    } catch (error: any) {
        console.log({ error })
        await db.disconnect()
       //  res.status(400).json({ message: JSON.stringify( error )})

       // hay que especificar bien para ayudara al desarrollador de front-end en que se esta equivocando
        res.status(400).json({ message: JSON.stringify( error.errors.status.message )})


    }





    // res.status(200).json( updatedEntry ); // me muestra el error que puede ser nulo

}
