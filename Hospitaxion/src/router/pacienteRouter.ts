import express from 'express';
import * as pacienteController from '../controller/PacienteController';

const router = express.Router();

router.get('/', pacienteController.getPaciente);
router.post('/', pacienteController.criarPaciente);

export default router;