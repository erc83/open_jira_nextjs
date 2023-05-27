import type { NextApiRequest, NextApiResponse} from 'next'

type Data = {
    ok: boolean;
    message: string | string[];
}

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    const { message = 'Bad Request'} = req.query  // si no me especifica el mensaje se agrega el Bad request


    res.status(400).json({
        ok: false,
        message
    })

}


