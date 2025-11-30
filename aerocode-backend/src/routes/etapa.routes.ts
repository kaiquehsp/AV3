// aerocode-backend/src/routes/etapa.routes.ts

import { Router } from 'express';
import { EtapaController } from '../controllers/EtapaController';

const router = Router();
const controller = new EtapaController();

router.get('/', controller.listar);
router.post('/', controller.criar);

// --- ROTA NECESSÁRIA PARA O BOTÃO VISUALIZAR ---
router.get('/:id', controller.buscarPorId);

export default router;