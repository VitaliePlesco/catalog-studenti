"use client";
import { useEffect } from "react";
import { axiosPrivate } from "@/axios";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDisciplineStore } from "@/store/disciplineStore";
import { AddDisciplineModal } from "@/components/AddDisciplineModal";
import { EditDisciplineModal } from "@/components/EditDisciplineModal";
import { DeleteDisciplineModal } from "@/components/DeleteDisciplineModal";
import { useAuthContext } from "@/context/AuthContext";
import Loading from "@/components/Loading";

export type Discipline = {
  id: number;
  name: string;
  userId: string;
};

export default function Materii() {
  const { disciplines, setDisciplines } = useDisciplineStore();
  const { user, isLoading, isLoggedIn } = useAuthContext();

  useEffect(() => {
    const getDisciplines = async () => {
      const response = await axiosPrivate.get(`/disciplines/${user?.userId}`);
      if (response.status === 200) {
        setDisciplines(response.data);
      } else {
        console.log(response.data.message);
      }
    };
    if (isLoggedIn) {
      getDisciplines();
    }
  }, [user?.userId, setDisciplines, disciplines, isLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="container mx-auto px-0">
      <div className="flex flex-col justify-between items-center px-2">
        <h1 className="text-2xl font-semibold py-10">Materii</h1>
      </div>

      <div className="container mx-auto px-0 pb-1 bg-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-3 p-1  ">
          <div className="py-4 px-2 md:p-4">
            <h2 className="text-xl font-bold">Denumire</h2>
          </div>
          <div className="py-4 px-2 md:p-4">
            <h2 className="text-xl font-bold"></h2>
          </div>
        </div>
        <div className="p-1">
          <div className="flex items-center justify-end gap-4 py-4 px-2 bg-white">
            <AddDisciplineModal
              icon={<PlusIcon className="w-4 md:w-5" />}
              dialogTitle="Adaugă materie"
              openButtonTitle="Adaugă materie"
            />
          </div>
        </div>
        <>
          {disciplines.map((discipline: Discipline) => (
            <div
              key={discipline.id}
              className="grid grid-cols-2 md:grid-cols-3 p-1"
            >
              <div className="col-span-2 bg-white py-4 px-2 md:p-4">
                <p className="text-lg md:text-xl">{discipline.name}</p>
              </div>

              <div className="col-span-2 md:col-auto flex justify-start md:justify-end bg-white">
                <div className="bg-white py-4 px-2 md:p-4">
                  <EditDisciplineModal
                    discipline={discipline}
                    icon={<PencilIcon className="w-4 md:w-5" />}
                    dialogTitle="Editează student"
                  />
                </div>
                <div className="bg-white py-4 px-2 md:p-4">
                  <DeleteDisciplineModal
                    discipline={discipline}
                    icon={<TrashIcon className="w-4 md:w-5" />}
                    dialogTitle="Șterge materie"
                    description="Ești sigur că vreai să ștergi materia:"
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
    </main>
  );
}
