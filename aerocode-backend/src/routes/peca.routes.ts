// aerocode-backend/src/routes/peca.routes.ts

import { Router } from 'express';
import { PecaController } from '../controllers/PecaController';

const router = Router();
const controller = new PecaController();

router.get('/', controller.listar);
router.post('/', controller.criar);

// --- NOVA ROTA ---
router.put('/:id', controller.atualizar);
router.get('/:id', controller.buscarPorId);

export default router;