import { pgTable, varchar, text, jsonb } from "drizzle-orm/pg-core"

export const equipments = pgTable("equipments", {
  id: varchar("id", { length: 50 }).primaryKey(),
  publicId: varchar("public_id", { length: 50 }).notNull(),

  identification: jsonb("identification").$type<{
    nome: string;
    numSerie: string;
    modelo: string;
    marca: string;
  }>().notNull(),

  location: jsonb("location").$type<{
    loja: string;
    setor: string;
    endereco: string;
  }>().notNull(),

  specs: jsonb("specs").$type<{
    compressor: string;
    controlador: string;
    refrigerante: string;
  }>().notNull(),

  status: text("status").notNull(),

  photos: jsonb("photos").$type<string[]>().notNull().default([]),

  history: jsonb("history").$type<{
    id: string;
    date: string;
    type: string;
    description: string;
    photos: string[];
  }[]>().notNull().default([]),

  observacoes: text("observacoes"),
})
