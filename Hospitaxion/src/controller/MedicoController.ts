import { Request, Response } from 'express';
import * as MedicoModel from '../modelos/medicoModelo';

// Função para obter os alunos
export async function getMedicos(req: Request, res: Response) {
  try {
    const medico = await MedicoModel.getMedicos();
    res.json(medico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar paciente' });
  }
}