import { Exception } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'
import Sala from 'App/Models/Sala'

export async function checkNumeroSala(numero) {
  const sala = await Sala.findBy('numero', numero)
  if (sala) throw new Exception('sala já existe', 409)
}

export async function getAlunosNaSala(sala_id) {
  const numeroUsuariosNaSala = await Database.rawQuery(
    `
      SELECT u.*
      FROM usuarios u
      JOIN sala_usuarios su ON u.id = su.id_usuario
      WHERE su.id_sala = ? AND u.is_professor = false;
    `,
    [sala_id]
  )
  return numeroUsuariosNaSala.rows.length
}

export async function getProfessorNaSala(sala_id) {
  const professorNaSala = await Database.rawQuery(
    `
      SELECT u.*
      FROM usuarios u
      JOIN sala_usuarios su ON u.id = su.id_usuario
      WHERE su.id_sala = ? AND u.is_professor = true;
    `,
    [sala_id]
  )
  const professor = professorNaSala.rows
  return professor[0]
}
