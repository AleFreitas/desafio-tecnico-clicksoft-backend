import { Exception } from '@adonisjs/core/build/standalone'
import Sala from 'App/Models/Sala'

export async function checkNumeroSala(numero) {
  const sala = await Sala.findBy('numero', numero)
  if (sala) throw new Exception('sala já existe', 409)
}
