// routes/update-equipment-by-id.ts
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { equipments } from '../database/schema.ts'
import z from 'zod'
import { eq } from 'drizzle-orm'

export const updateEquipmentByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.put('/equipments/:id', {
    schema: {
      tags: ['equipments'],
      summary: 'Update equipment by ID',
      params: z.object({
        id: z.string(),
      }),
      body: z.object({
        name: z.string().optional(),
        modelo: z.string().optional(),
        numSerie: z.string().optional(),
        marca: z.string().optional(),
        loja: z.string().optional(),
        setor: z.string().optional(),
        endereco: z.string().optional(),
        compressor: z.string().optional(),
        controlador: z.string().optional(),
        refrigerante: z.string().optional(),
        status: z.string().optional(),
        observacoes: z.string().nullable().optional(),
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
          }),
        }),
        404: z.null().describe('Equipment not found'),
      },
    },
  }, async (request, reply) => {
    const equipmentId = request.params.id
    const body = request.body

    const updated = await db
      .update(equipments)
      .set(body)
      .where(eq(equipments.publicId, equipmentId))
      .returning()

    if (updated.length === 0) {
      return reply.status(404).send()
    }

    return { equipment: updated[0] }
  })
}
