import { Router } from 'express';
import { TesteController } from '../controllers/TesteController';

const router = Router();
const controller = new TesteController();

router.get('/', controller.listar);
router.post('/', controller.criar);

router.get('/:id', controller.buscarPorId);

export default router;