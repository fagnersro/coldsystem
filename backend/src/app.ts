import fastify from "fastify"
import { createEquipmentRoute } from "./routes/create-equipments.ts"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
import { getEquipmentRoute } from "./routes/get-equipments.ts"

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)
server.register(createEquipmentRoute)
server.register(getEquipmentRoute)

export { server }