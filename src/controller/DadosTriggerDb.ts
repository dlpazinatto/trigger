import moment from 'moment';
import tz from 'moment-timezone';
import { Request, Response } from 'express';
import legado from './EnviaDadosRest';



export async function baseFormula (req: Request, res: Response) {
    try{
        let id: number = req.body.id as number;
        
        console.log(`${moment().utcOffset(-180).format("YYYY-MM-DD HH:mm:ss").toString()} ID: ${id}. Cliente: ${req.body.cliente as string}. Ação: ${req.body.acao as string}\n`);
        //.tz('America/Sao_paulo')
        
        res.status(200);
        res.json([{
            status: 'Processado',
            id
        }]);
        await enviaDados(id);
    }catch(error){

        res.status(200);
        res.json([{
            status: 'erro ao processar'+error,
        }])    
    }
    
}

async function enviaDados(id:number) {
    try {
        const resp = await legado.post('api/motor/recalc/indicator/'+id, ({
            id: id,
            status: 'processado'
        }))
        console.log( `${moment().utcOffset(-180).format("YYYY-MM-DD HH:mm:ss").toString()} Processado ID: ${id}` );
        //.tz('America/Sao_paulo')
    } catch (error) {
        console.log(`${moment().utcOffset(-180).format("YYYY-MM-DD HH:mm:ss").toString()} Erro:  ${error}`)
    }
    
}
