import { Exception } from '@adonisjs/core/build/standalone'
import Sala from 'App/Models/Sala'
import SalaUsuario from 'App/Models/SalaUsuario'
import Usuario from 'App/Models/Usuario'
import { checkNumeroSala } from 'App/utils/SalaUtils'

export async function storeSala(body: Partial<Sala>, usuario: Usuario) {
  await checkNumeroSala(body.numero)

  if (usuario.is_professor) {
    const sala = await Sala.create(body)
    await SalaUsuario.create({
      id_sala: sala.numero,
      id_professor: BigInt(usuario.id),
    })
    const { numero, capacidade } = sala
    return { numero, capacidade, disponibilidade: true, criador: usuario.nome }
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
