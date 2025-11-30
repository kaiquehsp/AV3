import { Router } from 'express';
import { PecaController } from '../controllers/PecaController';

const router = Router();
const controller = new PecaController();

router.get('/', controller.listar);
router.post('/', controller.criar);


router.put('/:id', controller.atualizar);
router.get('/:id', controller.buscarPorId);

export default router;