// hooks/useUpdateEquipment.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UpdateEquipmentBody {
  name?: string
  modelo?: string
  numSerie?: string | null
  marca?: string
  loja?: string
  setor?: string
  endereco?: string
  compressor?: string
  controlador?: string
  refrigerante?: string
  status?: string
  observacoes?: string | null
}

export function useUpdateEquipment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: UpdateEquipmentBody
    }) => {
      const response = await fetch(`http://192.168.1.12:3333/equipments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar equipamento")
      }

      return response.json()
    },
    onSuccess: (result, variables) => {
      // invalida cache do equipamento atualizado
      queryClient.invalidateQueries({
        queryKey: ["equipment", variables.id],
      })
      queryClient.invalidateQueries({
        queryKey: ["equipments"], // se você tiver lista de equipamentos
      })
    },
  })
}
