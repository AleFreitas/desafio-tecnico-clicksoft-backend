import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { newUsuarioSchema } from '../../Schemas/UsuarioSchemas'
import { storeProfessor } from 'App/Services/ProfessoresServices'

export default class ProfessoresController {
  public async store({ request, response }: HttpContextContract) {
    await request.validate({ schema: newUsuarioSchema })
    const body = request.body()
    try {
      const professor = await storeProfessor(body)
      response.status(201)
      return {
        message: 'professor cadastrado',
        professor,
      }
    } catch (error) {
      response.status(error.status || 500).json({
        error: error.message || 'erro ao cadastrar professor',
      })
    }
  }
}
