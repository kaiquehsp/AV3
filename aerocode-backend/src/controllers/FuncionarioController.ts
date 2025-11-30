// aerocode-backend/src/controllers/FuncionarioController.ts

import { Request, Response } from 'express';
import prisma from '../prisma';

export class FuncionarioController {
  
  async listar(req: Request, res: Response) {
    const funcionarios = await prisma.funcionario.findMany();
    return res.json(funcionarios);
  }

  async criar(req: Request, res: Response) {
    const { nome, telefone, endereco, usuario, senha, nivelPermissao } = req.body;
    try {
      const novoFuncionario = await prisma.funcionario.create({
        data: { nome, telefone, endereco, usuario, senha, nivelPermissao }
      });
      return res.status(201).json(novoFuncionario);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar funcionário' });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const funcionario = await prisma.funcionario.findUnique({
        where: { id },
        include: { etapas: true } 
      });

      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      return res.json(funcionario);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar funcionário' });
    }
  }
}