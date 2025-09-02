import { useParams, Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { SEO } from "../components/SEO";
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { QRLinkCard } from "../components/QRLinkCard";
import { PhotoGallery } from "../components/PhotoGallery";
import { Edit, QrCode, Printer, Wrench } from "lucide-react";
import { useState } from "react";
import { EditEquipmentDialog } from "../components/EditEquipmentDialog";
import { useUpdateEquipment } from "../hooks/use-update-equipment";

 interface EquipmentDetails {
  id: string;
  publicId: string;
  name: string;
  modelo: string;
  numSerie: string;
  marca: string;
  loja: string;
  setor: string;
  endereco: string;
  compressor: string;
  controlador: string;
  refrigerante: string;
  status: string;
  observacoes: string;
}

async function getEquipmentById(id: string): Promise<EquipmentDetails> {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/equipments/${id}`);
  if (!result.ok) throw new Error("Erro ao buscar  equipamento");
  

  const data = await result.json();
  console.log(data)
  return data.equipment
}

export default function EquipmentDetails() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const updateEquipment = useUpdateEquipment()
  const { 
    data: equipment, 
    isLoading, 
    error 
  } = useQuery<EquipmentDetails>({
    queryKey: ["equipment", id],
    queryFn: () => getEquipmentById(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <AppLayout>
        <SEO title="Carregando equipamento..." description="Carregando os detalhes" canonicalPath={`/equipments/${id ?? ''}`} />
        <p>Carregando...</p>
      </AppLayout>
    );
  }

  if (error || !equipment) {
    return (
      <AppLayout>
        <SEO title="Equipamento não encontrado" description="O recurso não foi localizado" canonicalPath={`/equipments/${id ?? ''}`} />
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Equipamento não encontrado</h1>
          <Button asChild variant="link"><Link to="/">Voltar</Link></Button>
        </div>
      </AppLayout>
    );
  }

  const url = `${window.location.origin}/equipments/${equipment.publicId}`;

  const handleEditSave = (data: any) => {
    updateEquipment.mutate({
      id: equipment.publicId,
      data: data
    })
    console.log('Edit data:', data);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${equipment.marca} ${equipment.modelo}`,
    sku: equipment.numSerie,
    brand: equipment.marca,
    url,
  };

  return (
    <AppLayout>
      <SEO
        title={`${equipment.modelo} | Detalhes do Equipamento`}
        description={`Veja identificação, localização, especificações e histórico de manutenção.`}
        canonicalPath={`/equipments/${equipment.publicId}`}
        jsonLd={jsonLd}
      />

      <div className="space-y-6 animate-enter">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{equipment.name}</h1>
            <p className="text-sm text-muted-foreground">Número de série {equipment.numSerie} • {equipment.marca}</p>
          </div>
          <Badge variant={equipment.status === 'operacional' ? 'secondary' : equipment.status === 'manutencao' ? 'default' : 'destructive'}>
            {equipment.status}
          </Badge>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Identificação</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">ID: </span>{equipment.publicId}</div>
                <div><span className="text-muted-foreground">Número de série: </span>{equipment.numSerie}</div>
                <div><span className="text-muted-foreground">Modelo: </span>{equipment.modelo}</div>
                <div><span className="text-muted-foreground">Marca: </span>{equipment.marca}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Localização</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Loja: </span>{equipment.loja}</div>
                <div><span className="text-muted-foreground">Setor: </span>{equipment.setor}</div>

                <div className="md:col-span-2 text-sm">
                  <span className="text-muted-foreground">Endereço: </span>{equipment.endereco}
                </div>
  
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Especificações técnicas</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Compressor: </span>{equipment.compressor}</div>
                <div><span className="text-muted-foreground">Controlador: </span>{equipment.controlador}</div>
                <div><span className="text-muted-foreground">Refrigerante: </span>{equipment.refrigerante}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Histórico / manutenção</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {/* Filtros simples (mock) */}
                <div className="flex flex-wrap gap-2 text-sm">
                  <Button variant="secondary" size="sm">Todos</Button>
                  <Button variant="ghost" size="sm">Últimos 30 dias</Button>
                  <Button variant="ghost" size="sm">Com fotos</Button>
                </div>
                <ul className="space-y-3">
                  <p>Histórico dados</p>
                  {/* {equipment.history.map((h) => (
                    <li key={h.id} className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{new Date(h.date).toLocaleString()}</div>
                        <Badge variant="secondary">{h.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{h.description}</p>
                    </li>
                  ))} */}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Fotos</CardTitle></CardHeader>
              <CardContent>
                <p>Galeria de fotos</p>
                {/* <PhotoGallery images={equipment.photos} /> */}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <QRLinkCard url={url} title="QR + Link" instructions="Escaneie para ver histórico" />

            <Card>
              <CardHeader><CardTitle>Ações</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button 
                  variant="secondary" 
                  className="justify-start"
                  onClick={() => setIsEditOpen(true)}
                  >
                  <Edit className="mr-2" /> Editar
                </Button>
                <Button variant="secondary" className="justify-start"><QrCode className="mr-2" /> Gerar novo QR</Button>
                <Button variant="secondary" className="justify-start"><Printer className="mr-2" /> Imprimir etiqueta</Button>
                <Button className="justify-start"><Wrench className="mr-2" /> Registrar manutenção</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Action Dialogs */}
      <EditEquipmentDialog
        equipment={equipment}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSave={handleEditSave}
      />
    </AppLayout>
  );
}
