import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import { newSalaSchema } from 'App/Schemas/SalaSchemas'
import { storeSala } from 'App/Services/SalasServices'

export default class SalasController {
  public async store({ auth, request, response }: HttpContextContract) {
    await request.validate({ schema: newSalaSchema })
    const usuario = await Usuario.findOrFail(auth.user?.id)
    const body = request.body()
    try {
      const sala = await storeSala(body, usuario.is_professor)
      response.status(201)
      return sala
    } catch (error) {
      response.status(error.status || 500).json({
        error: error.message || 'erro ao cadastrar sala',
      })
    }
  }
}
