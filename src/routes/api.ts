import { Router } from 'express';
import * as dadosTrigger from '../controller/DadosTriggerDb';

const router = Router();

router.post('/dados', dadosTrigger.baseFormula);


export default router;
