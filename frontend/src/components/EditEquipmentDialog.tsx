import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../hooks/use-toast";


const EditEquipmentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  numSerie: z.string().min(1, "Modelo é obrigatória"),
  modelo: z.string().min(1, "Modelo é obrigatório"),
  marca: z.string().min(1, "Marca é obrigatória"),
  loja: z.string().min(1, "Loja é obrigatória"),
  setor: z.string().min(1, "Setor é obrigatório"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  compressor: z.string().min(1, "Capacidade é obrigatória"),
  controlador: z.string().min(1, "Voltagem é obrigatória"),
  refrigerante: z.string().min(1, "Refrigerante é obrigatório"),
  //status: z.enum(["operacional", "manutencao", "critico"]),
  status: z.string()
});

type EditEquipmentData = z.infer<typeof EditEquipmentSchema>;

type EquipmentEdit = {
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

interface EditEquipmentDialogProps {
  equipment: EquipmentEdit;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: EditEquipmentData) => void;
}

export function EditEquipmentDialog({
  equipment,
  open,
  onOpenChange,
  onSave,
}: EditEquipmentDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditEquipmentData>({
    resolver: zodResolver(EditEquipmentSchema),
    defaultValues: {
      name: equipment.name,
      numSerie: equipment.numSerie,
      modelo: equipment.modelo,
      marca: equipment.marca,
      loja: equipment.loja,
      setor: equipment.setor,
      endereco: equipment.endereco,
      compressor: equipment.compressor,
      controlador: equipment.controlador,
      refrigerante: equipment.refrigerante,
      status: equipment.status,
    },
  });

  const handleSave = async (data: EditEquipmentData) => {
    setIsLoading(true);
    try {
      onSave(data);
      toast({
        title: "Equipamento atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const status = watch("status");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Equipamento</DialogTitle>
          <DialogDescription>
            Atualize as informações do equipamento abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                {...register("name")}
              />
              {errors.numSerie && (
                <p className="text-sm text-destructive">{errors.name?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="numSerie">Número de Série *</Label>
              <Input
                id="numSerie"
                {...register("numSerie")}
              />
              {errors.numSerie && (
                <p className="text-sm text-destructive">{errors.numSerie.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo *</Label>
              <Input
                id="modelo"
                {...register("modelo")}
              />
              {errors.modelo && (
                <p className="text-sm text-destructive">{errors.modelo.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="marca">Marca *</Label>
              <Input
                id="marca"
                {...register("marca")}
              />
              {errors.marca && (
                <p className="text-sm text-destructive">{errors.marca.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={status}
                onValueChange={(value: "operacional" | "manutencao" | "critico") =>
                  setValue("status", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operacional">Operacional</SelectItem>
                  <SelectItem value="manutencao">Manutenção</SelectItem>
                  <SelectItem value="critico">Crítico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loja">Loja *</Label>
              <Input
                id="loja"
                {...register("loja")}
              />
              {errors.loja && (
                <p className="text-sm text-destructive">{errors.loja.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="setor">Setor *</Label>
              <Input
                id="setor"
                {...register("setor")}
              />
              {errors.setor && (
                <p className="text-sm text-destructive">{errors.setor.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço *</Label>
              <Input
                id="endereco"
                {...register("endereco")}
              />
              {errors.setor && (
                <p className="text-sm text-destructive">{errors.endereco?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacidade">Compressor *</Label>
              <Input
                id="capacidade"
                {...register("compressor")}
              />
              {errors.compressor && (
                <p className="text-sm text-destructive">{errors.compressor.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="voltagem">Controlador *</Label>
              <Input
                id="voltagem"
                {...register("controlador")}
              />
              {errors.controlador && (
                <p className="text-sm text-destructive">{errors.controlador.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="refrigerante">Refrigerante *</Label>
              <Input
                id="refrigerante"
                {...register("refrigerante")}
              />
              {errors.refrigerante && (
                <p className="text-sm text-destructive">{errors.refrigerante.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}