import { Exception } from '@adonisjs/core/build/standalone'
import Sala from 'App/Models/Sala'

export async function checkNumeroSala(numero) {
  const alunoByEmail = await Sala.findBy('numero', numero)
  if (alunoByEmail) throw new Exception('sala já existe', 409)
}
