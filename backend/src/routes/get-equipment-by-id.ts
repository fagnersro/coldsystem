import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { equipments } from '../database/schema.ts'
import z from 'zod'
import { eq } from 'drizzle-orm'

export const  getEquipmentsByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/equipments/:id', {
    schema: {
      tags: ['equipments'],
      summary: 'Get equipments by ID',
      params: z.object({
        id: z.string(),
      }),
      response: {
        200: z.object({
          equipment: z.object({
            id: z.uuid(),
            publicId: z.string(),
            name: z.string(),
            modelo: z.string(),
            numSerie: z.string().nullable(),
            marca: z.string(),
            loja: z.string(),
            setor: z.string(),
            endereco: z.string(),
            compressor: z.string(),
            controlador: z.string(),
            refrigerante: z.string(),
            status: z.string(),
            observacoes: z.string().nullable(),
          })
        }),
        404: z.null().describe('Equipments not found'),
      },
    },
}, async (request, reply) => {
  
  const equipmentId = request.params.id


  const result = await db
  .select()
  .from(equipments)
  .where(eq(equipments.publicId, equipmentId))

  if (result.length > 0) {
    return { equipment: result[0] }
  }

  return reply.status(404).send()
})
}