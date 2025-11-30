// aerocode-backend/src/routes/teste.routes.ts

import { Router } from 'express';
import { TesteController } from '../controllers/TesteController';

const router = Router();
const controller = new TesteController();

router.get('/', controller.listar);
router.post('/', controller.criar);

// --- ROTA NECESSÁRIA PARA O BOTÃO VISUALIZAR ---
router.get('/:id', controller.buscarPorId);

export default router;