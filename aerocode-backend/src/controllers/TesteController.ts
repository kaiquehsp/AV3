// aerocode-backend/src/controllers/TesteController.ts

import { Request, Response } from 'express';
import prisma from '../prisma';

export class TesteController {
  
  // Listar todos
  async listar(req: Request, res: Response) {
    // --- MUDANÇA AQUI ---
    // Adicionamos o 'include' para trazer os dados da aeronave
    const testes = await prisma.teste.findMany({
      include: { aeronave: true } 
    });
    return res.json(testes);
  }

  // Criar novo
  async criar(req: Request, res: Response) {
    const { tipo, resultado, data, aeronaveId } = req.body;
    try {
      const novoTeste = await prisma.teste.create({
        data: { 
          tipo, 
          resultado, 
          data: new Date(data), 
          aeronaveId 
        }
      });
      return res.status(201).json(novoTeste);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar teste' });
    }
  }

  // --- NOVO: BUSCAR POR ID (Para o botão Visualizar) ---
  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const teste = await prisma.teste.findUnique({
        where: { id },
        // Inclui a aeronave para mostrar qual avião foi testado
        include: { aeronave: true } 
      });

      if (!teste) {
        return res.status(404).json({ error: 'Teste não encontrado' });
      }

      return res.json(teste);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar teste' });
    }
  }
}