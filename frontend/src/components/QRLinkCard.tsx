import QRCode from "react-qr-code";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { buttonVariants } from "./ui/button";
import { cn } from "../lib/utils";

interface QRLinkCardProps {
  url: string;
  title?: string;
  instructions?: string;
}

export function QRLinkCard({ url, title = "QR + Link", instructions = "Escaneie para ver histórico" }: QRLinkCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center gap-4">
        <div className="bg-white p-3 rounded-md border" aria-label="Código QR do equipamento">
          <QRCode value={url} size={144} viewBox={`0 0 256 256`} />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <p className="text-sm text-muted-foreground">{instructions}</p>
          <a href={url} className={cn(buttonVariants({ variant: "link" }))}>
            {url}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
