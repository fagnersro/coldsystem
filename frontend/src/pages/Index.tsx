import { Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { SEO } from "../components/SEO";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useEffect, useState } from "react";


interface Equipment {
  publicId: string;
  numSerie: string;
  modelo: string;
  status: string;
}

interface EquipmentResponse {
  equipments: Equipment[]
}

export default function Index() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/equipments`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro na requisição");
        return res.json();
      })
      .then((data: EquipmentResponse) => {
        setEquipments(data.equipments);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [])

  if (loading) return <p>Carregando...</p>
  console.log(equipments)
  
  return (
    <AppLayout>
      <SEO title="Gestão de Equipamentos de Refrigeração" description="Cadastre, gere QR e acompanhe manutenções." canonicalPath="/" />
      <div className="space-y-8 animate-enter">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Gestão de Equipamentos de Refrigeração</h1>
          <p className="text-muted-foreground">Cadastre equipamentos, gere QR codes e controle o histórico de manutenção.</p>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/equipments/new">Novo equipamento</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/settings">Configurações</Link>
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader><CardTitle>Equipamentos recentes</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b">
                      <th className="py-2 pr-4">Número de Série</th>
                      <th className="py-2 pr-4">Modelo</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipments.map((e: Equipment) => (
                      <tr key={e.publicId} className="border-b last:border-0">
                        <td className="py-2 pr-4">{e.numSerie}</td>
                        <td className="py-2 pr-4">{e.modelo}</td>
                        <td className="py-2 pr-4 capitalize">{e.status}</td>
                        <td className="py-2 pr-4">
                          <Button asChild variant="link" size="sm"><Link to={`/equipments/${e.publicId}`}>Ver detalhes</Link></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader><CardTitle>Dicas</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Use o QR para acessar as informações do equipamento diretamente no local.</p>
              <p>• Registre manutenções com fotos para manter o histórico completo.</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}
