import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core"

export const equipments = pgTable("equipments", {
  id: uuid().primaryKey().defaultRandom(),
  publicId: varchar("public_id", { length: 50 }).notNull().unique(),
  name: text().notNull(),
  modelo: text().notNull(),
  numSerie: text().notNull().unique(),
  marca: text().notNull(),
  loja: text().notNull(),
  setor: text().notNull(),
  endereco: text().notNull(),
  compressor: text().notNull(),
  controlador: text().notNull(),
  refrigerante: text().notNull(),
  status: text().notNull(),
  observacoes: text(),
})