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
