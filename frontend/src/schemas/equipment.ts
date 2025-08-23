import { z } from "zod";

export const MaintenanceEntrySchema = z.object({
  id: z.string(),
  date: z.string(), // ISO date
  type: z.enum(["preventiva", "corretiva", "inspecao"]).default("inspecao"),
  description: z.string().min(1),
  photos: z.array(z.string().url()).optional().default([]),
});

export const EquipmentSchema = z.object({
  id: z.string(),
  publicId: z.string(),
  identification: z.object({
    nome: z.string().min(1),
    modelo: z.string().min(1),
    numSerie: z.string().min(1),
    marca: z.string().min(1),
  }),
  location: z.object({
    loja: z.string().min(1),
    setor: z.string().min(1),
    endereco: z.string().min(1)
  }),
  specs: z.object({
    compressor: z.string().min(1),
    controlador: z.string().min(1),
    refrigerante: z.string().min(1),
  }),
  status: z.enum(["operacional", "manutencao", "critico"]).default("operacional"),
  photos: z.array(z.string().url()).default([]),
  history: z.array(MaintenanceEntrySchema).default([]),
});

export type Equipment = z.infer<typeof EquipmentSchema>;
export type MaintenanceEntry = z.infer<typeof MaintenanceEntrySchema>;
