import { useState } from "react";
import { Button } from "@/components/Button";
import { axiosPrivate } from "@/axios";
import { useDisciplineStore } from "@/store/disciplineStore";
import { Discipline } from "@/app/materii/page";

export default function DeleteDisciplineForm({
  discipline,
  setOpen,
}: {
  discipline: Discipline;
  setOpen: () => void;
}) {
  const [deleteStatus, setDeleteStatus] = useState("");

  const { deleteDiscipline } = useDisciplineStore();

  const handleDeleteStudent = async () => {
    try {
      const response = await axiosPrivate.delete(
        `/disciplines/discipline/${discipline.id}`
      );
      if (response.status === 200) {
        setDeleteStatus("Materia a fost ștearsă");
        deleteDiscipline(discipline.id);
        setOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full md:w-auto">
      <div className="py-6">
        <h4>{discipline.name} ?</h4>
        <h3 className="text-green-500">{deleteStatus}</h3>
      </div>
      <Button
        onClick={() => handleDeleteStudent()}
        className="w-full text-nowrap"
      >
        Șterge materia
      </Button>
    </div>
  );
}
