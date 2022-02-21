import moment from 'moment';
import { Request, Response } from 'express';

export async function baseFormula (req: Request, res: Response) {
    try{
        let id: number = req.body.id as number;
        res.status(200);
        res.json([{
            status: 'Processado',
            id
        }]);

    }catch(error){

        res.status(200);
        res.json({
            status: 'erro ao processar'
        })    
    }
    
}