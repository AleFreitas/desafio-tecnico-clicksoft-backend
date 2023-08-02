import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sala from 'App/Models/Sala'
import Usuario from 'App/Models/Usuario'
import { newSalaSchema, patchSalaSchema } from 'App/Schemas/SalaSchemas'
import { showSala, storeSala, updateSala } from 'App/Services/SalasServices'

export default class SalasController {
  public async store({ auth, request, response }: HttpContextContract) {
    await request.validate({ schema: newSalaSchema })
    const usuario = await Usuario.findOrFail(auth.user?.id)
    const body = request.body()
    try {
      const sala = await storeSala(body, usuario)
      response.status(201)
      return sala
    } catch (error) {
      response.status(error.status || 500).json({
        error: error.message || 'erro ao cadastrar sala',
      })
    }
  }

  public async show({ auth, response, params }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(auth.user?.id)
    try {
      const sala = await showSala(params.id, usuario.is_professor)
      response.status(201)
      return sala
    } catch (error) {
      response.status(error.status || 500).json({
        error: error.message || 'erro ao cadastrar sala',
      })
    }
  }

  public async destroy({ auth, response, params }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(auth.user?.id)
    const sala = await Sala.findBy('numero', params.id)
    if (!sala) throw new Exception('sala não existe', 400)
    if (!usuario.is_professor) throw new Exception('Usuário não é um professor', 401)
    await sala.delete()
    response.status(205)
  }

  public async update({ auth, request, response, params }: HttpContextContract) {
    const body = await request.validate({ schema: patchSalaSchema })
    const usuario = await Usuario.findOrFail(auth.user?.id)
    const sala = await Sala.findBy('numero', params.id)
    if (!sala) throw new Exception('sala não existe', 400)
    if (!usuario.is_professor) throw new Exception('Usuário não é um professor', 401)
    return await updateSala(body, sala)
  }
}
