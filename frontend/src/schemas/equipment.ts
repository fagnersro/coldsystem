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
    placa: z.string().min(1),
    modelo: z.string().min(1),
    marca: z.string().min(1),
  }),
  location: z.object({
    loja: z.string().min(1),
    setor: z.string().min(1),
    gpsLat: z.number().optional(),
    gpsLng: z.number().optional(),
  }),
  specs: z.object({
    capacidade: z.string().min(1),
    voltagem: z.string().min(1),
    refrigerante: z.string().min(1),
  }),
  status: z.enum(["operacional", "manutencao", "critico"]).default("operacional"),
  photos: z.array(z.string().url()).default([]),
  history: z.array(MaintenanceEntrySchema).default([]),
});

export type Equipment = z.infer<typeof EquipmentSchema>;
export type MaintenanceEntry = z.infer<typeof MaintenanceEntrySchema>;
