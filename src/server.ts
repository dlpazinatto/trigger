import express, {Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import apiroutes from './routes/api';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));


var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use( express.json() );

app.use('/api', apiroutes);

app.use((req:Request, res:Response)=>{
    res.status(404);
    res.json({
        error: 'Endpoint não encontrado'
    })
})


console.log('Iniciando aplicação na porta '+ process.env.PORT);
app.listen(process.env.PORT);
