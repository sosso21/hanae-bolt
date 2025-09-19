import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 justify-center items-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 w-8 h-8 animate-spin" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    </div>
  );
}
