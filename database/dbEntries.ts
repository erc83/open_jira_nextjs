import { isValidObjectId } from "mongoose"
import { EntryModel, IEntry } from "../models";
import { db } from "./";


export const getEntryById = async( id: string ): Promise<IEntry | null> => {
 
    // si esto no es valido voy hacer un return null
    if( !isValidObjectId(id) ) return null;

    // si es valido
    await db.connect();
    //lean() de mongoose trabaja con el minimo necesario, cuando sabemos que trabajamos con menos informacion
    // logramos menos volumen de data que carga en el entry
    const entry = await EntryModel.findById(id).lean()

    await db.disconnect()

    // 2 panoramas que el id tenga informacion y que no tenga informacion

    return entry;  // no funciona por la serializacion

}