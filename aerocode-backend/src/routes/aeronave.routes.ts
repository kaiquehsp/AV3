// src/routes/aeronave.routes.ts

import { Router } from 'express';
import { AeronaveController } from '../controllers/AeronaveController';

const router = Router();
const controller = new AeronaveController();

// Rota para listar todas (GET /aeronaves)
router.get('/', controller.listar);

// Rota para criar nova (POST /aeronaves)
router.post('/', controller.criar);

// Rota para buscar uma específica pelo ID (GET /aeronaves/:id)
// (Esta é a rota que estava faltando antes)
router.get('/:id', controller.buscarPorId);

export default router;