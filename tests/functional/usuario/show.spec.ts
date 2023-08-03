import { test } from '@japa/runner'
import { doLogin } from '../utils'
import { Response } from '@adonisjs/core/build/standalone'

const urlCriarAluno = '/api/aluno'
const urlUsuario = 'api/usuario'

const bodyValido = {
  nome: 'aluno válido',
  matricula: '1234',
  email: 'aluno@gmail.com',
  password: 'Asda23123',
  data_de_nascimento: '2000-07-31',
}

test.group('Usuario show', () => {
  test('deveria retornar o usuário corretamente', async ({ client }) => {
    await client.post(urlCriarAluno).json(bodyValido)
    const Bearertoken = await doLogin(client, bodyValido.email, bodyValido.password)
    const response = await client.get(urlUsuario).header('Authorization', Bearertoken)
    response.assertStatus(200)
    response.assertBodyContains({
      nome: 'aluno válido',
      matricula: '1234',
      email: 'aluno@gmail.com',
      nascimento: '2000-07-31T00:00:00.000-03:00',
    })
  })
})
