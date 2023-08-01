import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const newUsuarioSchema = schema.create({
  nome: schema.string(),
  matricula: schema.number(),
  email: schema.string({}, [rules.email()]),
  password: schema.string(),
  data_de_nascimento: schema.date(),
})

export const patchUsuarioSchema = schema.create({
  nome: schema.string.optional(),
  matricula: schema.number.optional(),
  email: schema.string.optional({}, [rules.email()]),
  password: schema.string.optional(),
  data_de_nascimento: schema.date.optional(),
})
