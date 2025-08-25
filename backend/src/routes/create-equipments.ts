import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { db } from '../database/client.ts'
import { equipments } from '../database/schema.ts'

import z from 'zod'

export const createEquipmentRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/equipments', {
    schema: {
      body: z.object({
        id: z.string(),
        publicId: z.string(),
        identification: z.object({
          nome: z.string(),
          numSerie: z.string(),
          modelo: z.string(),
          marca: z.string(),
        }),
        location: z.object({
          loja: z.string(),
          setor: z.string(),
          endereco: z.string(),
        }),
        specs: z.object({
          compressor: z.string(),
          controlador: z.string(),
          refrigerante: z.string(),
        }),
        status: z.string(),
        photos: z.string().array(),
        history: z.string().array(),
        observacoes: z.string(),
      }),
    }
  }, async (request, reply) => {
    const newEquipment = request.body
    
    const result = await db
    .insert(equipments).values({
      id: newEquipment.id,
      publicId: newEquipment.publicId,
      identification: {
        nome: newEquipment.identification.nome,
        numSerie: newEquipment.identification.numSerie,
        modelo: newEquipment.identification.modelo,
        marca: newEquipment.identification.marca
      },
      location: {
        loja: newEquipment.location.loja,
        setor: newEquipment.location.setor,
        endereco: newEquipment.location.endereco
      },
      specs: {
        compressor: newEquipment.specs.compressor,
        controlador: newEquipment.specs.controlador,
        refrigerante: newEquipment.specs.refrigerante
      },
      status: newEquipment.status,
      observacoes: newEquipment.observacoes
    })
  })
}