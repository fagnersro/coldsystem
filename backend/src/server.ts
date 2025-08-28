import { server } from "./app.ts"
import cors from '@fastify/cors'

server.register(cors, {
  //origin: ["http://localhost:8080", "http://192.168.1.17:8080"],
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflight: true // força habilitar preflight
})

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log('HTTP coldsystem server running!')
})