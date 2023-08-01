import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const newAlunoSchema = schema.create({
  nome: schema.string(),
  matricula: schema.number(),
  email: schema.string({}, [rules.email()]),
  senha: schema.string(),
  data_de_nascimento: schema.date(),
})
