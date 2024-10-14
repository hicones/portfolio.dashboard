import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface DialogComponentProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  type?: any | "destructive";
}

export const DialogComponent = ({
  trigger,
  title,
  children,
  description,
  type,
}: DialogComponentProps) => (
  <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      {children}

      {type === "destructive" && (
        <DialogFooter className="flex gap-2 justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button variant="destructive">Excluir</Button>
        </DialogFooter>
      )}
    </DialogContent>
  </Dialog>
);
