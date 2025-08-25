import { server } from "./app.ts"


server.listen({ port: 3333 }).then(() => {
  console.log('HTTP coldsystem server running!')
})