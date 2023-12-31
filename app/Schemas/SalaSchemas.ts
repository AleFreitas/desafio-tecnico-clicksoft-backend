import { schema } from '@ioc:Adonis/Core/Validator'

export const newSalaSchema = schema.create({
  numero: schema.number(),
  capacidade: schema.number(),
})

export const patchSalaSchema = schema.create({
  capacidade: schema.number(),
})

export const alocaAlunoSchema = schema.create({
  matricula: schema.number(),
  numero: schema.number(),
})
