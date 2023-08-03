import { test } from '@japa/runner'
import { doLogin } from '../utils'
import Usuario from 'App/Models/Usuario'
import { assert } from '@japa/preset-adonis'

const urlCriarAluno = '/api/aluno'
const urlUsuario = 'api/usuario'

const bodyValido = {
  nome: 'aluno válido',
  matricula: '1234',
  email: 'aluno@gmail.com',
  password: 'Asda23123',
  data_de_nascimento: '2000-07-31',
}

test.group('Usuario delete', () => {
  test('deveria deletar o usuário corretamente', async ({ client }) => {
    await client.post(urlCriarAluno).json(bodyValido)
    const Bearertoken = await doLogin(client, bodyValido.email, bodyValido.password)
    const response = await client.delete(urlUsuario).header('Authorization', Bearertoken)
    const usuario = await Usuario.findBy('email', bodyValido.email)
    response.assert?.equal(usuario, null)
    response.assertStatus(205)
  })
  test('deveria retornar erro 401 para token invalido', async ({ client }) => {
    await client.post(urlCriarAluno).json(bodyValido)
    await doLogin(client, bodyValido.email, bodyValido.password)
    const response = await client.delete(urlUsuario).header('Authorization', 'Bearer 1234')
    response.assertStatus(401)
  })
})
