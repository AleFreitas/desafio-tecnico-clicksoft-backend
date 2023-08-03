import { Exception } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'
import Sala from 'App/Models/Sala'
import SalaUsuario from 'App/Models/SalaUsuario'
import Usuario from 'App/Models/Usuario'
import { checkNumeroSala, getAlunosNaSala, getProfessorNaSala } from 'App/utils/SalaUtils'

export async function storeSala(body: Partial<Sala>, usuario: Usuario) {
  await checkNumeroSala(body.numero)

  if (usuario.is_professor) {
    await Sala.create(body)
    const sala = await Sala.findBy('numero', body.numero)
    if (sala) {
      await SalaUsuario.create({
        id_sala: BigInt(sala.id),
        id_usuario: BigInt(usuario.id),
      })
      const { numero, capacidade } = sala
      return { numero, capacidade, disponibilidade: true, criador: usuario.nome }
    }
  } else {
    throw new Exception('Usuário não é um professor', 401)
  }
}

export async function showSala(num: number, professor: boolean) {
  const sala = await Sala.findBy('numero', num)
  if (!sala) throw new Exception('sala não existe', 400)

  if (professor) {
    const { numero, capacidade } = sala
    return { numero, capacidade, disponibilidade: true }
  } else {
    throw new Exception('Usuário não é um professor', 401)
  }
}

export async function updateSala(body, sala: Sala) {
  const numeroAlunos = await getAlunosNaSala(sala.id)
  if (numeroAlunos > body.capacidade) {
    throw new Exception('Impossivel Reduzir capacidade, remova alguns alunos!', 400)
  }
  if (body.capacidade) {
    sala.capacidade = body.capacidade
  }
  await sala.save()
  return sala
}

export async function alocaAlunoService(body, usuario: Usuario) {
  const sala = await Sala.findBy('numero', body.numero)
  const aluno = await Usuario.findBy('matricula', body.matricula)

  if (!sala) throw new Exception('sala não existe', 400)
  if (!aluno) throw new Exception('aluno não existe', 400)
  if (aluno.is_professor) throw new Exception('não é possivel alocar um professor', 401)
  const professor = await getProfessorNaSala(sala.id)
  if (professor.id !== usuario.id) {
    throw new Exception('apenas o criador da sala pode alocar alunos', 401)
  }
  const alunoSalaRepetida = await Database.from('sala_usuarios')
    .where('id_sala', sala.id)
    .where('id_usuario', aluno.id)

  const professorCriouSala = await Database.from('sala_usuarios')
    .where('id_sala', sala.id)
    .where('id_usuario', usuario.id)

  const numeroAlunos = await getAlunosNaSala(sala.id)

  if (!professorCriouSala) throw new Exception('somente o criador da sala pode alocar alunos', 400)
  if (alunoSalaRepetida.length !== 0) {
    throw new Exception('este aluno já esta inscrito nesta sala', 400)
  }
  if (numeroAlunos >= sala.capacidade) throw new Exception('esta sala está lotada', 400)

  await SalaUsuario.create({
    id_sala: BigInt(sala.id),
    id_usuario: BigInt(aluno.id),
  })
  return { sala: sala.numero, aluno: aluno.nome }
}

export async function desalocaAlunoService(body, usuario: Usuario) {
  console.log('oi')
  const sala = await Sala.findBy('numero', body.numero)
  const aluno = await Usuario.findBy('matricula', body.matricula)

  if (!sala) throw new Exception('sala não existe', 400)
  if (!aluno) throw new Exception('aluno não existe', 400)
  if (aluno.is_professor) throw new Exception('não é possivel desalocar um professor', 401)
  const professor = await getProfessorNaSala(sala.id)
  if (professor.id !== usuario.id) {
    throw new Exception('apenas o criador da sala pode desalocar alunos', 401)
  }
  const alunoNaSala = await Database.from('sala_usuarios')
    .where('id_sala', sala.id)
    .where('id_usuario', aluno.id)
  if (alunoNaSala.length === 0) throw new Exception('este aluno não esta inscrito nesta sala', 400)
  await Database.rawQuery(
    `
      DELETE FROM sala_usuarios
      WHERE id_sala = ? and id_usuario = ?
    `,
    [sala.id, aluno.id]
  )
}
