import mysql from 'mysql2/promise'; // Usando a versão promise do mysql2
import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';

dotenv.config();

// Criação da conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

// Função para obter todos os alunos
export async function getPaciente() {
  try {
    const [rows] = await pool.execute('SELECT * FROM paciente');
    return rows;
  } catch (error) {
    console.error('Erro ao obter paciente:', error);
    throw new Error('Erro ao obter dados dos paciente');
  }
}

// Função para criar aluno
export async function criarPaciente(
  nome: string,
  idade:number,
  telefone:string
) {
  // Verifique se algum valor é inválido antes de tentar inserir no banco
  if (!nome || !idade || !telefone) {
    throw new Error('Campos obrigatórios não preenchidos');
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO paciente (nome,idade,telefone) VALUES (?, ?, ?)',
      [nome, idade,telefone]
    );

    const insertId = (result as ResultSetHeader).insertId;
    return { insertId }; // Retorna o ID do aluno inserido
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    throw new Error('Erro ao inserir dados do paciente');
  }
}