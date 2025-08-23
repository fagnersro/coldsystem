import { type Equipment } from "../schemas/equipment";

export const equipments: Equipment[] = [
  {
    id: "eq-001",
    publicId: "pub-001",
    identification: {
      placa: "RF-2024-001",
      modelo: "Freezer 500L",
      marca: "CoolTech",
    },
    location: {
      loja: "Loja Central",
      setor: "Açougue",
      gpsLat: -23.5505,
      gpsLng: -46.6333,
    },
    specs: {
      capacidade: "500 L",
      voltagem: "220V",
      refrigerante: "R-134a",
    },
    status: "operacional",
    photos: [
      "https://images.unsplash.com/photo-1556909114-6e38017b0c49?q=80&w=1200&auto=format&fit=crop",
    ],
    history: [
      {
        id: "mnt-01",
        date: new Date().toISOString(),
        type: "inspecao",
        description: "Inspeção de rotina, tudo ok.",
        photos: [],
      },
    ],
  },
];

export function getEquipmentById(id: string) {
  return equipments.find((e) => e.id === id) || null;
}

export function getEquipmentByPublicId(publicId: string) {
  return equipments.find((e) => e.publicId === publicId) || null;
}
