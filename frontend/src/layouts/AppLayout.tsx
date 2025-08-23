import { type PropsWithChildren } from "react";
import { AppSidebar } from "../components/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { Separator } from "../components/ui/separator";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="h-14 flex items-center gap-3 px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-lg font-semibold">Cool Kit Hub</h1>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
