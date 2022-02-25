import moment from 'moment';
import { Request, Response } from 'express';
import legado from './EnviaDadosRest';


export async function baseFormula (req: Request, res: Response) {
    try{
        let id: number = req.body.id as number;
        
        console.log(`${moment().format("YYYY-MM-DD hh:mm:ss").toString()} ID: ${id}. Cliente: ${req.body.cliente as string}. Ação: ${req.body.acao as string}\n`);
        
        res.status(200);
        res.json([{
            status: 'Processado',
            id
        }]);
        await enviaDados(id);
    }catch(error){

        res.status(200);
        res.json([{
            status: 'erro ao processar'
        }])    
    }
    
}

async function enviaDados(id:number) {
    try {
        const resp = await legado.post('api/motor/recalc/indicator/'+id, ({
            id: id,
            status: 'processado'
        }))
        console.log( `${moment().format("YYYY-MM-DD hh:mm:ss").toString()} Processado ID: ${id}` );
    } catch (error) {
        console.log(`${moment().format("YYYY-MM-DD HH:MM:SS").toString()} Erro:  ${error}`)
    }
    
}
