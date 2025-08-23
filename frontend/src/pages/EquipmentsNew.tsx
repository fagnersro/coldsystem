import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SEO } from "../components/SEO";
import AppLayout from "../layouts/AppLayout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FileUploader } from "../components/FileUploader";
import { QRLinkCard } from "../components/QRLinkCard";
import { toast } from "../hooks/use-toast";

const NewEquipmentSchema = z.object({
  placa: z.string().min(1, "Obrigatório"),
  modelo: z.string().min(1, "Obrigatório"),
  marca: z.string().min(1, "Obrigatório"),
  loja: z.string().min(1, "Obrigatório"),
  setor: z.string().min(1, "Obrigatório"),
  gpsLat: z.string().optional(),
  gpsLng: z.string().optional(),
  capacidade: z.string().min(1, "Obrigatório"),
  voltagem: z.string().min(1, "Obrigatório"),
  refrigerante: z.string().min(1, "Obrigatório"),
  observacoes: z.string().optional(),
});

type NewEquipmentForm = z.infer<typeof NewEquipmentSchema>;

export default function EquipmentsNew() {
  const form = useForm<NewEquipmentForm>({
    resolver: zodResolver(NewEquipmentSchema),
    defaultValues: {
      placa: "",
      modelo: "",
      marca: "",
      loja: "",
      setor: "",
      gpsLat: "",
      gpsLng: "",
      capacidade: "",
      voltagem: "",
      refrigerante: "",
      observacoes: "",
    },
  });

  const [files, setFiles] = useState<File[]>([]);
  const [publicId, setPublicId] = useState<string>(() => Math.random().toString(36).slice(2, 10));

  useEffect(() => {
    const draft = localStorage.getItem("draft-equipment");
    if (draft) {
      try {
        const data = JSON.parse(draft);
        form.reset(data);
        toast({ title: "Rascunho carregado" });
      } catch {}
    }
  }, []);

  const onSubmit = (values: NewEquipmentForm) => {
    // Mock de criação. Aqui geraria o QR no servidor e salvaria no banco.
    toast({ title: "Equipamento cadastrado!", description: values.placa });
  };

  const saveDraft = () => {
    const data = form.getValues();
    localStorage.setItem("draft-equipment", JSON.stringify(data));
    toast({ title: "Rascunho salvo" });
  };

  const qrUrl = useMemo(() => `${window.location.origin}/equipments/${publicId}`, [publicId]);

  return (
    <AppLayout>
      <SEO
        title="Novo Equipamento | Gestão de Refrigeração"
        description="Cadastre equipamentos, faça upload de fotos e gere QR code."
        canonicalPath="/equipments/new"
      />

      <div className="space-y-6 animate-enter">
        <header>
          <h1 className="text-2xl font-semibold">Cadastro de Equipamento</h1>
          <p className="text-sm text-muted-foreground">Preencha os dados e visualize o QR gerado.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="placa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Placa/Patrimônio</FormLabel>
                          <FormControl>
                            <Input placeholder="RF-2024-001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="modelo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modelo</FormLabel>
                          <FormControl>
                            <Input placeholder="Freezer 500L" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="marca"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marca</FormLabel>
                          <FormControl>
                            <Input placeholder="CoolTech" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="loja"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loja</FormLabel>
                          <FormControl>
                            <Input placeholder="Loja Central" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="setor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Setor</FormLabel>
                          <FormControl>
                            <Input placeholder="Açougue" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="gpsLat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GPS Lat</FormLabel>
                            <FormControl>
                              <Input placeholder="-23.55" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gpsLng"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GPS Lng</FormLabel>
                            <FormControl>
                              <Input placeholder="-46.63" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="capacidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacidade</FormLabel>
                          <FormControl>
                            <Input placeholder="500 L" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="voltagem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Voltagem</FormLabel>
                          <FormControl>
                            <Input placeholder="220V" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="refrigerante"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Refrigerante</FormLabel>
                          <FormControl>
                            <Input placeholder="R-134a" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="observacoes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Notas importantes..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-wrap gap-3">
                    <Button type="button" variant="secondary" onClick={saveDraft}>Salvar rascunho</Button>
                    <Button type="submit">Cadastrar</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fotos</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUploader value={files} onChange={setFiles} />
              </CardContent>
            </Card>

            <QRLinkCard url={qrUrl} title="QR do Equipamento" instructions="Escaneie para acessar os detalhes" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
