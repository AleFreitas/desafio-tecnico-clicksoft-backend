import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'

export default class Aluno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public matricula: bigint

  @column()
  public email: string

  @column()
  public senha: string

  @column()
  public num_sala: number

  @column.date()
  public data_de_nascimento: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Sala, {
    foreignKey: 'num_sala',
  })
  public sala: BelongsTo<typeof Sala>
}
