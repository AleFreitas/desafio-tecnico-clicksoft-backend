import Usuario from 'App/Models/Usuario'
import { checkEmailUsuario, checkMatriculaUsuario } from 'App/utils/UsuarioUtils'

export async function storeAluno(body: Partial<Usuario>) {
  await checkEmailUsuario(body.email)
  await checkMatriculaUsuario(body.matricula)

  body.is_professor = false
  const aluno = await Usuario.create(body)
  const { nome, matricula, email } = aluno
  return { nome, matricula, email, isProfessor: aluno.is_professor }
}

export async function updateAluno(body, usuario: Usuario) {
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
