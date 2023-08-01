import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { newUsuarioSchema, patchUsuarioSchema } from '../../Schemas/UsuarioSchemas'
import { storeAluno, updateAluno } from 'App/Services/AlunosServices'
import Usuario from 'App/Models/Usuario'

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

  public async update({ auth, request, response }: HttpContextContract) {
    const body = await request.validate({ schema: patchUsuarioSchema })
    const usuario = await Usuario.findOrFail(auth.user?.id)
    return await updateAluno(body, usuario)
  }
}
