import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditStudentForm from "./forms/EditStudentForm";
import { Student } from "@/app/studenti/page";
import DeleteStudentForm from "./forms/DeleteStudentForm";
import { useState } from "react";

export function DeleteStudentModal({
  openButtonTitle,
  description,
  dialogTitle,
  icon,
  student,
}: {
  openButtonTitle?: string;
  description?: string;
  student: Student;
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
        <DeleteStudentForm student={student} setOpen={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
