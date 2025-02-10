import { Request, Response } from 'express';
import * as PacienteModel from '../modelos/pacienteModelo';

// Função para obter os alunos
export async function getPaciente(req: Request, res: Response) {
  try {
    const paciente = await PacienteModel.getPaciente();
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar paciente' });
  }
}

export async function criarPaciente(req: Request, res: Response): Promise<any> {
  const { nome, idade,telefone } = req.body;

  // Verifica se todos os campos obrigatórios estão presentes
  if (!nome || !idade || !telefone) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' }); // Adiciona 'return'
  }

  try {
    const result = await PacienteModel.criarPaciente(nome, idade,telefone);
    return res.status(201).json({ id: result.insertId }); // Adiciona 'return' aqui também
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar paciente' }); // 'return' aqui também
  }
}