import moment from 'moment';
import { Request, Response } from 'express';
import legado from './EnviaDadosRest';


const tz = moment().utcOffset(-180);

export async function baseFormula (req: Request, res: Response) {
    try{
        let id: number = req.body.id as number;
        let id_processo = Math.floor((new Date().getTime() / 1000));
        let chave: string = (id_processo.toString() + id.toString().padStart(10,'0'));
        
        let inicio = tz.format("YYYY-MM-DD HH:mm:ss").toString();
        
        console.log(`${inicio} ID: ${id}. Cliente: ${req.body.cliente as string}. Ação: ${req.body.acao as string} ID processo: ${chave}\n`);
        
        res.status(200);
        res.json([{
            status: 'Processado',
            id,
            chave
        }]);
        await enviaDados(id, chave, inicio);
    }catch(error){

        res.status(200);
        res.json([{
            status: 'erro ao processar'+error,
        }])    
    }
    
}

async function enviaDados(id:number, id_processo: string, inicio:string) {
    try {
        const resp = await legado.post('api/motor/recalc/indicator/'+id, ({
            id: id,
            status: 'processado'
        }))
        console.log( `${tz.format("YYYY-MM-DD HH:mm:ss").toString()} Processado ID: ${id} Processo: ${id_processo} que foi iniciado as ${inicio}` );
        
    } catch (error) {
        console.log(`${tz.format("YYYY-MM-DD HH:mm:ss").toString()} Erro:  ${error}`)
    }
    
}
