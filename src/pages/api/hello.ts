import type { NextApiRequest, NextApiResponse} from 'next'

type Data = {
    ok: boolean;
    mesage: string;
    method: string;
}

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    res.status(200).json({
        ok: true,
        mesage: 'Todo correcto',
        method: req.method || 'no hay methodo' 
    })

}


