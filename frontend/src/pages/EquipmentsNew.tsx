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
  name: z.string().min(1, "Obrigatório"),
  modelo: z.string().min(1, "Obrigatório"),
  numSerie: z.string().min(1, "Obrigatório"),
  marca: z.string().min(1, "Obrigatório"),
  loja: z.string().min(1, "Obrigatório"),
  setor: z.string().min(1, "Obrigatório"),
  endereco: z.string().min(1, "Obrigatório"),
  status: z.string(),
  compressor: z.string().min(1, "Obrigatório"),
  controlador: z.string().min(1, "Obrigatório"),
  refrigerante: z.string().min(1, "Obrigatório"),
  observacoes: z.string().optional(),
});

type NewEquipmentForm = z.infer<typeof NewEquipmentSchema>;

export default function EquipmentsNew() {
  const form = useForm<NewEquipmentForm>({
    resolver: zodResolver(NewEquipmentSchema),
    defaultValues: {
      name: "",
      modelo: "",
      numSerie: "",
      marca: "",
      loja: "",
      setor: "",
      endereco: "",
      status: "",
      compressor: "",
      controlador: "",
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

  const onSubmit = async (values: NewEquipmentForm) => {
    // Mock de criação. Aqui geraria o QR no servidor e salvaria no banco.
    try {
      const payload = {
        publicId,
        name: values.name,
        modelo: values.modelo,
        numSerie: values.numSerie,
        marca: values.marca,
        loja: values.loja,
        setor: values.setor,
        endereco: values.endereco,
        status: "ativo",
        compressor: values.compressor,
        controlador: values.controlador,
        refrigerante: values.refrigerante,
        observacoes: values.observacoes
      }

      const res = await fetch("http://192.168.1.17:3333/equipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Erro ao cadastrar equipamento")
      }

      const data = await res.json();

      toast({
        title: "Equipamento cadastrado!",
        description: `ID: ${data.id} - ${values.name}`
      })

      form.reset();
      setPublicId(Math.random().toString(36).slice(2, 10));
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Falha no cadastro",
        variant: "destructive",
      });
    }
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Expositor/Freezer" {...field} />
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
                            <Input placeholder="GS1520-2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="numSerie"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Série</FormLabel>
                          <FormControl>
                            <Input placeholder="RF-2024-001" {...field} />
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

                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="endereco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Descreva o endereço" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="compressor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Compressor</FormLabel>
                          <FormControl>
                            <Input placeholder="Danffos - MT60" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="controlador"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Controlador</FormLabel>
                          <FormControl>
                            <Input placeholder="TC-900E POWER" {...field} />
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
