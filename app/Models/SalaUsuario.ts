import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'
import Usuario from './Usuario'

export default class SalaUsuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_sala: bigint

  @column()
  public id_professor: bigint

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Sala, {
    foreignKey: 'id_sala',
  })
  public sala: BelongsTo<typeof Sala>

  @belongsTo(() => Usuario, {
    foreignKey: 'id_professor',
  })
  public professor: BelongsTo<typeof Usuario>
}
