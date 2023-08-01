import Usuario from 'App/Models/Usuario'
import { checkEmailUsuario, checkMatriculaUsuario } from 'App/utils/UsuarioUtils'

export async function updateUsuario(body, usuario: Usuario) {
  if (body.nome) {
    usuario.nome = body.nome
  }
  if (body.matricula) {
    await checkMatriculaUsuario(body.matricula)
    usuario.matricula = BigInt(body.matricula)
  }
  if (body.email) {
    await checkEmailUsuario(body.email)
    usuario.email = body.email
  }
  if (body.password) {
    usuario.password = body.password
  }
  if (body.data_de_nascimento) {
    usuario.data_de_nascimento = body.data_de_nascimento
  }

  await usuario.save()
  return usuario
}
