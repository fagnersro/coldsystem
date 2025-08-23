import AppLayout from "../layouts/AppLayout";
import { SEO } from "../components/SEO";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";

interface SettingsForm {
  name: string;
  email: string;
  notifEmail: boolean;
  notifSms: boolean;
  themeDark: boolean;
}

export default function Settings() {
  const form = useForm<SettingsForm>({
    defaultValues: {
      name: "",
      email: "",
      notifEmail: true,
      notifSms: false,
      themeDark: false,
    },
  });

  const onSubmit = (v: SettingsForm) => {
    if (v.themeDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    alert('Preferências salvas!');
  };

  return (
    <AppLayout>
      <SEO title="Configurações" description="Perfil, notificações e tema" canonicalPath="/settings" />
      <div className="space-y-6 animate-enter">
        <header>
          <h1 className="text-2xl font-semibold">Configurações</h1>
          <p className="text-sm text-muted-foreground">Perfil, notificações e tema</p>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="voce@exemplo.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="notifEmail"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <FormLabel>Notificações por e-mail</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notifSms"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <FormLabel>Notificações por SMS</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="themeDark"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <FormLabel>Tema escuro</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Salvar</Button>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}
