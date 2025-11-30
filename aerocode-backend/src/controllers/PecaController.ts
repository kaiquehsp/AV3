// aerocode-backend/src/controllers/PecaController.ts

import { Request, Response } from 'express';
import prisma from '../prisma';

export class PecaController {
  
  // LISTAR todas as peças
  async listar(req: Request, res: Response) {
    // Inclui a aeronave na resposta para saber se a peça já está vinculada
    const pecas = await prisma.peca.findMany({
      include: { aeronave: true }
    });
    return res.json(pecas);
  }

  // CRIAR uma nova peça
  async criar(req: Request, res: Response) {
    const { nome, tipo, fornecedor, status } = req.body;
    try {
      const novaPeca = await prisma.peca.create({
        data: { nome, tipo, fornecedor, status }
      });
      return res.status(201).json(novaPeca);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar peça' });
    }
  }

  // ATUALIZAR (VINCULAR) uma peça a uma aeronave
  async atualizar(req: Request, res: Response) {
    const { id } = req.params; // ID da peça
    const { aeronaveId } = req.body; // ID da aeronave para vincular

    try {
      const pecaAtualizada = await prisma.peca.update({
        where: { id },
        data: { aeronaveId }
      });
      return res.json(pecaAtualizada);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao vincular peça' });
    }
  }

  // --- NOVO: BUSCAR POR ID (Para o botão Visualizar) ---
  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const peca = await prisma.peca.findUnique({
        where: { id },
        include: { aeronave: true } // Traz a aeronave vinculada para exibir no modal
      });

      if (!peca) {
        return res.status(404).json({ error: 'Peça não encontrada' });
      }

      return res.json(peca);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar detalhes da peça' });
    }
  }
}