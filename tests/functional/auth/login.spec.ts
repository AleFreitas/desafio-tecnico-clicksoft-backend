import { test } from '@japa/runner'
import Usuario from 'App/Models/Usuario'

const loginUrl = '/api/login'
const alunoUrl = '/api/aluno'

const bodyValido = {
  nome: 'aluno válido',
  matricula: '12342',
  email: 'aluno2@gmail.com',
  password: 'Asda23123',
  data_de_nascimento: '2000-07-31',
}

const loginBodyValido = {
  email: 'aluno2@gmail.com',
  password: 'Asda23123',
}

test.group('Auth login', () => {
  test('deveria retornar erro 401 para credenciais invalidas', async ({ client }) => {
    await client.post(alunoUrl).json(bodyValido)
    const loginBodyInvalido = { ...loginBodyValido }
    loginBodyInvalido.password = 'senha-errada'
    const response = await client.post(loginUrl).json(loginBodyInvalido)
    response.assertStatus(401)
  })

  test('deveria retornar 200 para credenciais validas', async ({ client }) => {
    await client.post(alunoUrl).json(bodyValido)
    const response = await client.post(loginUrl).json(loginBodyValido)
    response.assertStatus(200)
  })
})
