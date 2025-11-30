import { Router } from 'express';
import { EtapaController } from '../controllers/EtapaController';

const router = Router();
const controller = new EtapaController();

router.get('/', controller.listar);
router.post('/', controller.criar);


router.get('/:id', controller.buscarPorId);

export default router;