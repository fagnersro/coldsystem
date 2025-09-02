import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"

interface Equipment {
  publicId: string;
  name: string;
  numSerie: string;
  modelo: string;
  status: string;
}

interface EquipmentResponse {
  equipments: Equipment[]
}

async function fetchEquipments(): Promise<Equipment[]> {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/equipments`)
  if (!result.ok) throw new Error("Erro ao buscar equipamentos")
  
  const data: EquipmentResponse = await result.json()
  return data.equipments
}

export default function TbodyEquipmentList () {
  const { data, isLoading, error } = useQuery({
    queryKey: ["equipments"],
    queryFn: fetchEquipments,
  })

    if (isLoading) {
    return (
      <tbody>
        {Array.from({ length: 5 }).map((_, idx) => (
          <tr key={idx} className="border-b last:border-0">
            <td className="py-2 pr-4">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td className="py-2 pr-4">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td className="py-2 pr-4">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td className="py-2 pr-4">
              <div className="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
            </td>
          </tr>
        ))}
      </tbody>
    )
  }

  if (error) return <p>Erro ao carregar</p>

  return (
    <tbody>
      {data?.map((e: Equipment) => (
        <tr key={e.publicId} className="border-b last:border-0">
        <td className="py-2 pr-4">{e.name}</td>
        <td className="py-2 pr-4">{e.modelo}</td>
        <td className="py-2 pr-4 capitalize">{e.status}</td>
        <td className="py-2 pr-4">
          <Button asChild variant="link" size="sm"><Link to={`/equipments/${e.publicId}`}>Ver detalhes</Link></Button>
        </td>
      </tr>
    ))}
   </tbody>
  )
  
}