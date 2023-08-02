import { Exception } from '@adonisjs/core/build/standalone'
import Sala from 'App/Models/Sala'
import { checkNumeroSala } from 'App/utils/SalaUtils'

export async function storeSala(body: Partial<Sala>, professor: boolean) {
  await checkNumeroSala(body.numero)

  if (professor) {
    const sala = await Sala.create(body)
    const { numero, capacidade } = sala
    return { numero, capacidade, disponibilidade: true }
  } else {
    throw new Exception('Usuário não é um professor', 401)
  }
}
