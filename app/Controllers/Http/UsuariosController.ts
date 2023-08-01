import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import { patchUsuarioSchema } from 'App/Schemas/UsuarioSchemas'
import { updateUsuario } from 'App/Services/UsuariosServices'

export default class UsuariosController {
  public async update({ auth, request, response }: HttpContextContract) {
    const body = await request.validate({ schema: patchUsuarioSchema })
    const usuario = await Usuario.findOrFail(auth.user?.id)
    return await updateUsuario(body, usuario)
  }

  public async show({ auth, request, response }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(auth.user?.id)
    const { nome, matricula, email } = usuario
    return {
      nome,
      matricula,
      email,
      nascimento: usuario.data_de_nascimento,
    }
  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(auth.user?.id)
    await usuario.delete()
    response.status(205)
  }
}
