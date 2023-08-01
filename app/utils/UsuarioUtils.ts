import { Exception } from '@adonisjs/core/build/standalone'
import Usuario from 'App/Models/Usuario'

export async function checkEmailUsuario(email) {
  const alunoByEmail = await Usuario.findBy('email', email)
  if (alunoByEmail) throw new Exception('email em uso', 409)
}

export async function checkMatriculaUsuario(matricula) {
  const alunoByMatricula = await Usuario.findBy('matricula', matricula)
  if (alunoByMatricula) throw new Exception('matrícula em uso', 409)
}
