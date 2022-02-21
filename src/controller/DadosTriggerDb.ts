import moment from 'moment';
import { Request, Response } from 'express';
import legado from './EnviaDadosRest';
import fs from 'fs';

export async function baseFormula (req: Request, res: Response) {
    try{
        let id: number = req.body.id as number;
        console.log(id);
        console.log(req.body.cliente as string);
        console.log(req.body.acao as string);

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
        console.log( "Processado ID: "+id);
    } catch (error) {
        console.log('Erro: '+error)
    }
    
}

async function geraArquivo(id:number) {
    const dataatualm  = moment().format("YYYY-MM-DD").toString();
    const horaatualm  = moment().format("HH:MM:SS").toString();
    let arquivo = 'data'+'-'+dataatualm+'.log';
        
}