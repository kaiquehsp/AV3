import { Router } from 'express';
import { AeronaveController } from '../controllers/AeronaveController';

const router = Router();
const controller = new AeronaveController();


router.get('/', controller.listar);


router.post('/', controller.criar);


router.get('/:id', controller.buscarPorId);

export default router;