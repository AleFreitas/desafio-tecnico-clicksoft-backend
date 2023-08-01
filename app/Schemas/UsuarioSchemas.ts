import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const newUsuarioSchema = schema.create({
  nome: schema.string(),
  matricula: schema.number(),
  email: schema.string({}, [rules.email()]),
  password: schema.string(),
  data_de_nascimento: schema.date(),
})
