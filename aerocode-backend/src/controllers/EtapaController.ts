// aerocode-backend/src/controllers/EtapaController.ts

import { Request, Response } from 'express';
import prisma from '../prisma';

export class EtapaController {
  
  // Listar todas
  async listar(req: Request, res: Response) {
    const etapas = await prisma.etapa.findMany({
      include: { aeronave: true, funcionarios: true }
    });
    return res.json(etapas);
  }

  // Criar nova
  async criar(req: Request, res: Response) {
    const { nome, prazo, status, aeronaveId } = req.body;
    try {
      const novaEtapa = await prisma.etapa.create({
        data: { 
          nome, 
          prazo: new Date(prazo), 
          status, 
          aeronaveId 
        }
      });
      return res.status(201).json(novaEtapa);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar etapa' });
    }
  }

  // --- NOVO: BUSCAR POR ID (Visualizar) ---
  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const etapa = await prisma.etapa.findUnique({
        where: { id },
        // Inclui detalhes da aeronave e da equipe
        include: { 
          aeronave: true, 
          funcionarios: true 
        }
      });

      if (!etapa) {
        return res.status(404).json({ error: 'Etapa não encontrada' });
      }

      return res.json(etapa);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar etapa' });
    }
  }
}