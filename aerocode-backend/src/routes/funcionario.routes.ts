// aerocode-backend/src/routes/funcionario.routes.ts

import { Router } from 'express';
import { FuncionarioController } from '../controllers/FuncionarioController';

const router = Router();
const controller = new FuncionarioController();

router.get('/', controller.listar);
router.post('/', controller.criar);

// --- ROTA NECESSÁRIA PARA O BOTÃO VISUALIZAR ---
router.get('/:id', controller.buscarPorId);

export default router;