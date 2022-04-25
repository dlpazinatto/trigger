import moment from 'moment';
import { Request, Response } from 'express';
import legado from './EnviaDadosRest';



const tz = moment().utcOffset(-180);

export async function baseFormula (req: Request, res: Response) {
    try{
        let id: number = req.body.id as number;
        let id_processo = Math.floor((new Date().getTime() / 1000));
        let chave: string = (id_processo.toString() + id.toString().padStart(10,'0'));
        
        let inicio = moment().utcOffset(-180).format("YYYY-MM-DD HH:mm:ss").toString();
        
        console.log(`${inicio} ID: ${id}. Cliente: ${req.body.cliente as string}. Ação: ${req.body.acao as string} ID processo: ${chave}\n`);
        console.log('Jenkins');
        res.status(200);
        res.json([{
            status: 'Processado',
            id,
            chave
        }]);
        //await enviaDados(id, chave, inicio);
        //testeTempo(inicio);
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
        let depois = moment().utcOffset(-180).format("YYYY-MM-DD HH:mm:ss").toString();

        console.log( `${depois} Legado retornou 200 calculo ID: ${id} Processo: ${id_processo} que foi iniciado as ${inicio}` );
        console.log(`Tempo total: ${moment(depois).diff(inicio, 'seconds')} segundos.`)
        
    } catch (error) {
        console.log(`${moment().utcOffset(-180).format("YYYY-MM-DD HH:mm:ss").toString()} Erro:  ${error}`)
    }
    
}

async function testeTempo(inicio: string){
    let antes = moment(inicio);
    await sleep(5000);   
    let depois = moment().utcOffset(-180).format("YYYY-MM-DD HH:mm:ss");
    let diferenca = moment(depois).diff(inicio, 'seconds');
    console.log(`Diferença: ${diferenca} segundos`)   

}

function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }