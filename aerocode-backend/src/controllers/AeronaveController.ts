import { Request, Response } from 'express';
import prisma from '../prisma'; 

export class AeronaveController {
  
  
  async listar(req: Request, res: Response) {
    try {
      const aeronaves = await prisma.aeronave.findMany();
      return res.json(aeronaves);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar aeronaves' });
    }
  }

  
  async criar(req: Request, res: Response) {
    try {
      const { codigo, modelo, tipo, capacidade, alcance } = req.body;

     
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

  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const aeronave = await prisma.aeronave.findUnique({
        where: { id },
        include: { 
          pecas: true, 
          testes: true,
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