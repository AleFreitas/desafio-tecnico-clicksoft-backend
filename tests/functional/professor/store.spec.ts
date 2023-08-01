import { test } from '@japa/runner'
import Usuario from 'App/Models/Usuario'

const url = '/api/professor'

const bodyValido = {
  nome: 'professor válido',
  matricula: '12345',
  email: 'professor@gmail.com',
  password: 'Asda23123',
  data_de_nascimento: '2000-07-31',
}

test.group('Professor store', () => {
  test('deveria criar o usuário corretamente', async ({ client }) => {
    const response = await client.post(url).json(bodyValido)
    let professor = await Usuario.findBy('email', bodyValido.email)
    let criadoNoBd = false
    if (professor) criadoNoBd = true
    response.assertStatus(201)
    response.assertBodyContains({ message: 'professor cadastrado' })
    response.assert?.equal(criadoNoBd, true)
  })

  test('deveria retornar erro 422 ao receber matricula não numerica', async ({ client }) => {
    const bodyInvalido = { ...bodyValido }
    bodyInvalido.matricula = '1234saa'
    const response = await client.post(url).json(bodyInvalido)
    response.assertStatus(422)
  })

  test('deveria retornar erro 422 ao receber email inválido', async ({ client }) => {
    const bodyInvalido = { ...bodyValido }
    bodyInvalido.email = 'email'
    const response = await client.post(url).json(bodyInvalido)
    response.assertStatus(422)
  })

  test('deveria retornar erro 409 ao tentar inserir email já existente', async ({ client }) => {
    const bodyInvalido = { ...bodyValido }
    bodyInvalido.matricula = '4321'
    const response = await client.post(url).json(bodyInvalido)
    response.assertStatus(409)
  })

  test('deveria retornar erro 409 ao tentar inserir matricula já existente', async ({ client }) => {
    const bodyInvalido = { ...bodyValido }
    bodyInvalido.email = 'professor1@gmail.com'
    const response = await client.post(url).json(bodyInvalido)
    response.assertStatus(409)
  })
})
