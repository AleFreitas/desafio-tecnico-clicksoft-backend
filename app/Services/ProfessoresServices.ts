import Usuario from 'App/Models/Usuario'
import { Exception } from '@adonisjs/core/build/standalone'

export async function storeProfessor(body: Partial<Usuario>) {
  const professorByEmail = await Usuario.findBy('email', body.email)
  if (professorByEmail) {
    throw new Exception('já existe um professor com esse email', 409)
  }
  const professorByMatricula = await Usuario.findBy('matricula', body.matricula)
  if (professorByMatricula) {
    throw new Exception('já existe um professor com essa matrícula', 409)
  }

  body.is_professor = true
  await Usuario.create(body)
}
