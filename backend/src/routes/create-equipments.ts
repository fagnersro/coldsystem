import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { db } from '../database/client.ts'
import { equipments } from '../database/schema.ts'

import z from 'zod'

export const createEquipmentRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/equipments', {
    schema: {
      body: z.object({
        publicId: z.string(),
        name: z.string().min(5),
        modelo: z.string(),
        numSerie: z.string(),
        marca: z.string(),
        loja: z.string(),
        setor: z.string(),
        endereco: z.string(),
        compressor: z.string(),
        controlador: z.string(),
        refrigerante: z.string(),
        status: z.string(),
        observacoes: z.string(),
      }),
      response: {
        201: z.object({ id: z.uuid() }).describe('Equipamento cadastrado com sucesso!')
      }
    }
  }, async (request, reply) => {
    const { ...newEquipment } = request.body
  
    const result = await db
    .insert(equipments)
    .values(newEquipment)
    .returning()

    return reply.status(201).send({ id: result[0].id })
  })
}