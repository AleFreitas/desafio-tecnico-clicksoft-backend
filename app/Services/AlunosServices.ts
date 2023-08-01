import Aluno from 'App/Models/Aluno'
import { Exception } from '@adonisjs/core/build/standalone'
import Hash from '@ioc:Adonis/Core/Hash'

export async function storeAluno(body: Partial<Aluno>) {
  const alunoByEmail = await Aluno.findBy('email', body.email)
  if (alunoByEmail) {
    throw new Exception('já existe um aluno com esse email', 409)
  }
  const alunoByMatricula = await Aluno.findBy('matricula', body.matricula)
  if (alunoByMatricula) {
    throw new Exception('já existe um aluno com essa matrícula', 409)
  }
  if (body.senha) {
    const hashedPassword = await Hash.make(body.senha)
    body.senha = hashedPassword
  }
  await Aluno.create(body)
}
