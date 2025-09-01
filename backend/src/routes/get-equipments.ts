import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { equipments } from '../database/schema.ts'
import { ilike, asc, type SQL, and, eq } from 'drizzle-orm'
import z from 'zod'
import { count } from 'drizzle-orm'

export const  getEquipmentRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/equipments', {
    schema: {
      tags: ['equipments'],
      summary: 'Get all equipments',
      querystring: z.object({
        search: z.string().optional(),
        orderBy: z.enum(['id','name']).optional().default('id'),
        page: z.coerce.number().optional().default(1),
      }),
      response: {
        200: z.object({
          equipments: z.array(z.object({
            publicId: z.string(),
            name: z.string(),
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
            observacoes: z.string().nullable(),
          })
         ),
         total: z.number()
        })
      }
    }
  }, async (request, reply) => {
    const { search, orderBy, page } = request.query

    const conditions: SQL[] = []

    if (search) {
      conditions.push(ilike(equipments.name, `%${search}%`))
    }

    const [result, total] = await Promise.all([
        db
        .select({
          publicId: equipments.publicId,
          name: equipments.name,
          modelo: equipments.modelo,
          numSerie: equipments.numSerie,
          marca: equipments.marca,
          loja: equipments.loja,
          setor: equipments.setor,
          endereco: equipments.endereco,
          compressor: equipments.compressor,
          controlador: equipments.controlador,
          refrigerante: equipments.refrigerante,
          status: equipments.status,
          observacoes: equipments.observacoes
      })
        .from(equipments)
        .orderBy(asc(equipments[orderBy]))
        .offset((page - 1) * 2)
        .limit(10)
        .where(and(...conditions))
        .groupBy(equipments.id),

        db.$count(equipments, and(...conditions))
      ])
        
  return reply.send({ equipments: result, total })
  })
}