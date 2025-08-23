import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { SEO } from "../components/SEO";
import { getEquipmentById } from "../mocks/equipments";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { QRLinkCard } from "../components/QRLinkCard";
import { PhotoGallery } from "../components/PhotoGallery";
import { Edit, QrCode, Printer, Wrench } from "lucide-react";

export default function EquipmentDetails() {
  const { id } = useParams();
  const equipment = useMemo(() => (id ? getEquipmentById(id) : null), [id]);

  if (!equipment) {
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${equipment.identification.marca} ${equipment.identification.modelo}`,
    sku: equipment.identification.numSerie,
    brand: equipment.identification.marca,
    url,
  };

  return (
    <AppLayout>
      <SEO
        title={`${equipment.identification.modelo} | Detalhes do Equipamento`}
        description={`Veja identificação, localização, especificações e histórico de manutenção.`}
        canonicalPath={`/equipments/${equipment.id}`}
        jsonLd={jsonLd}
      />

      <div className="space-y-6 animate-enter">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{equipment.identification.nome}</h1>
            <p className="text-sm text-muted-foreground">Número de série {equipment.identification.numSerie} • {equipment.identification.marca}</p>
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
                <div><span className="text-muted-foreground">ID: </span>{equipment.id}</div>
                <div><span className="text-muted-foreground">Número de série: </span>{equipment.identification.numSerie}</div>
                <div><span className="text-muted-foreground">Modelo: </span>{equipment.identification.modelo}</div>
                <div><span className="text-muted-foreground">Marca: </span>{equipment.identification.marca}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Localização</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Loja: </span>{equipment.location.loja}</div>
                <div><span className="text-muted-foreground">Setor: </span>{equipment.location.setor}</div>

                <div className="md:col-span-2 text-sm">
                  <span className="text-muted-foreground">Endereço: </span>{equipment.location.endereco}
                </div>
  
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Especificações técnicas</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Compressor: </span>{equipment.specs.compressor}</div>
                <div><span className="text-muted-foreground">Controlador: </span>{equipment.specs.controlador}</div>
                <div><span className="text-muted-foreground">Refrigerante: </span>{equipment.specs.refrigerante}</div>
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
                  {equipment.history.map((h) => (
                    <li key={h.id} className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{new Date(h.date).toLocaleString()}</div>
                        <Badge variant="secondary">{h.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{h.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Fotos</CardTitle></CardHeader>
              <CardContent>
                <PhotoGallery images={equipment.photos} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <QRLinkCard url={url} title="QR + Link" instructions="Escaneie para ver histórico" />

            <Card>
              <CardHeader><CardTitle>Ações</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button variant="secondary" className="justify-start"><Edit className="mr-2" /> Editar</Button>
                <Button variant="secondary" className="justify-start"><QrCode className="mr-2" /> Gerar novo QR</Button>
                <Button variant="secondary" className="justify-start"><Printer className="mr-2" /> Imprimir etiqueta</Button>
                <Button className="justify-start"><Wrench className="mr-2" /> Registrar manutenção</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
