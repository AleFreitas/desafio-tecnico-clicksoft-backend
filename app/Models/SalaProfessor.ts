import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'
import Professor from './Professor'

export default class SalaProfessor extends BaseModel {
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
    foreignKey: 'id_sala', // Chave estrangeira referenciando a tabela "salas"
  })
  public sala: BelongsTo<typeof Sala>

  @belongsTo(() => Professor, {
    foreignKey: 'id_professor', // Chave estrangeira referenciando a tabela "professors"
  })
  public professor: BelongsTo<typeof Professor>
}
