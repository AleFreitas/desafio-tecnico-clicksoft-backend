import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { newUsuarioSchema } from '../../Schemas/UsuarioSchemas'
import { storeAluno } from 'App/Services/AlunosServices'

export default class AlunosController {
  public async store({ request, response }: HttpContextContract) {
    await request.validate({ schema: newUsuarioSchema })
    const body = request.body()
    try {
      const aluno = await storeAluno(body)
      response.status(201)
      return {
        message: 'aluno cadastrado',
        aluno,
      }
    } catch (error) {
      response.status(error.status || 500).json({
        error: error.message || 'erro ao cadastrar aluno',
      })
    }
  }
}
