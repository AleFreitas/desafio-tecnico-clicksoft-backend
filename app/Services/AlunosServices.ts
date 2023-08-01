import Usuario from 'App/Models/Usuario'
import { Exception } from '@adonisjs/core/build/standalone'
import Hash from '@ioc:Adonis/Core/Hash'

export async function storeAluno(body: Partial<Usuario>) {
  const alunoByEmail = await Usuario.findBy('email', body.email)
  if (alunoByEmail) {
    throw new Exception('já existe um aluno com esse email', 409)
  }
  const alunoByMatricula = await Usuario.findBy('matricula', body.matricula)
  if (alunoByMatricula) {
    throw new Exception('já existe um aluno com essa matrícula', 409)
  }
  if (body.senha) {
    const hashedPassword = await Hash.make(body.senha)
    body.senha = hashedPassword
  }
  body.is_professor = false
  await Usuario.create(body)
}
