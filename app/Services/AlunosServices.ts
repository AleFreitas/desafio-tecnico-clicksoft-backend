import Usuario from 'App/Models/Usuario'
import { Exception } from '@adonisjs/core/build/standalone'

export async function storeAluno(body: Partial<Usuario>) {
  const alunoByEmail = await Usuario.findBy('email', body.email)
  if (alunoByEmail) {
    throw new Exception('já existe um aluno com esse email', 409)
  }
  const alunoByMatricula = await Usuario.findBy('matricula', body.matricula)
  if (alunoByMatricula) {
    throw new Exception('já existe um aluno com essa matrícula', 409)
  }

  body.is_professor = false
  const aluno = await Usuario.create(body)
  const { nome, matricula, email } = aluno
  return { nome, matricula, email, isProfessor: aluno.is_professor }
}
