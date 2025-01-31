import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import EditDisciplineForm from "../forms/EditDisciplineForm";
import { Discipline } from "@/app/materii/page";

export function EditDisciplineModal({
  openButtonTitle,
  description,
  dialogTitle,
  icon,
  discipline,
}: {
  openButtonTitle?: string;
  description?: string;
  discipline: Discipline;
  icon: React.ReactNode;
  dialogTitle: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-md border p-2 hover:bg-gray-100 flex items-center gap-4">
          {openButtonTitle}
          {icon}
        </button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="add student form"
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <EditDisciplineForm
          discipline={discipline}
          setOpen={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
