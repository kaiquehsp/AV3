// src/controllers/AeronaveController.ts

import { Request, Response } from 'express';
import prisma from '../prisma'; // Importa a conexão que criamos

export class AeronaveController {
  
  // LISTAR todas as aeronaves (GET)
  async listar(req: Request, res: Response) {
    try {
      const aeronaves = await prisma.aeronave.findMany();
      return res.json(aeronaves);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar aeronaves' });
    }
  }

  // CRIAR uma nova aeronave (POST)
  async criar(req: Request, res: Response) {
    try {
      const { codigo, modelo, tipo, capacidade, alcance } = req.body;

      // Validação simples
      if (!codigo || !modelo) {
        return res.status(400).json({ error: 'Código e Modelo são obrigatórios' });
      }

      const novaAeronave = await prisma.aeronave.create({
        data: {
          codigo,
          modelo,
          tipo,        
          capacidade: Number(capacidade),
          alcance: Number(alcance)
        }
      });

      return res.status(201).json(novaAeronave);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar aeronave' });
    }
  }

  // --- NOVO MÉTODO: BUSCAR POR ID (GET /:id) ---
  // Este é o método que o botão "Visualizar" chama
  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const aeronave = await prisma.aeronave.findUnique({
        where: { id },
        include: { 
          pecas: true, 
          testes: true,
          // MUDANÇA AQUI: Trazemos as etapas E os funcionários delas
          etapas: {
            include: {
              funcionarios: true
            }
          }
        }
      });

      if (!aeronave) {
        return res.status(404).json({ error: 'Aeronave não encontrada' });
      }

      return res.json(aeronave);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar detalhes da aeronave' });
    }
  }
}