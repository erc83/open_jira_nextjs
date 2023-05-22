import mongoose from 'mongoose';  

// primero establecer la conexxion

/**
 *  0 = disconnected
 *  1 = connected
 *  2 = connecting
 *  3 = disconnecting
 */

const mongooConnection = {
    isConnected: 0 
}

export const connect = async () => {

    if( mongooConnection.isConnected ) {    // si la coneccion es distinta a 0
        console.log('Ya estabamos conectados');
        return
    }


    if( mongoose.connections.length > 0 ) {
        mongooConnection.isConnected = mongoose.connections[0].readyState; 

        if( mongooConnection.isConnected === 1 ) {
            console.log('Usando conexión anterior');
            return;
        }
        // aqui tambien se puede llamar la funcion disconnect
        await mongoose.disconnect();    // para desconectarme y evitar tener varias conecciones simultaneas

    } 

    await mongoose.connect( process.env.MONGO_URL || '');
    mongooConnection.isConnected = 1;
    console.log('Conectado a MongoDB', process.env.MONGO_URL)   // seria bueno colocar el url de mongo
}

export const disconnect = async () => {
    // esto se tiene que llamar solo si isConected !== 0
    if ( mongooConnection.isConnected === 0 ) return;   // voy a salirme, no tengo que salirme si ya estoy desconextado

    await mongoose.disconnect();
    console.log('Desconectado de MongoDB')
}







