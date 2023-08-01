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
}
