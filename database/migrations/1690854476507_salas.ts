import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'salas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('numero').notNullable().unique()
      table.integer('capacidade').notNullable().unsigned()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
