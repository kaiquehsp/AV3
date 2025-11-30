import { Request, Response } from 'express';
import prisma from '../prisma';

export class EtapaController {
  
  
  async listar(req: Request, res: Response) {
    const etapas = await prisma.etapa.findMany({
      include: { aeronave: true, funcionarios: true }
    });
    return res.json(etapas);
  }

  
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

  
  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const etapa = await prisma.etapa.findUnique({
        where: { id },
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

  
  async alocarFuncionario(req: Request, res: Response) {
    const { id } = req.params; 
    const { funcionarioId } = req.body; 

    try {
      const etapaAtualizada = await prisma.etapa.update({
        where: { id },
        data: {
          
          funcionarios: {
            connect: { id: funcionarioId }
          }
        },
        include: { funcionarios: true } 
      });
      
      return res.json(etapaAtualizada);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao alocar funcionário' });
    }
  }
}