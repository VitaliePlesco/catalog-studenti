"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { axiosPrivate } from "@/axios";
import Loading from "@/components/Loading";
import { useAuthContext } from "@/context/AuthContext";
import DisciplineAssignSelect from "@/components/DisciplineAssignSelect";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
};

export default function Student() {
  const [student, setStudent] = useState<Student[]>([]);
  const { user, isLoading, isLoggedIn } = useAuthContext();

  const { id } = useParams();

  useEffect(() => {
    const getStudent = async () => {
      const response = await axiosPrivate.get(`/students/student/${id}`);
      if (response.status === 200) {
        setStudent(response.data);
      }
    };
    if (isLoggedIn) {
      getStudent();
    }
  }, [id, isLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-0">
      <div className="flex flex-col justify-between items-start px-2">
        <h1 className="text-2xl font-semibold py-10">
          {student[0]?.firstName} {student[0]?.lastName}
        </h1>
      </div>
      <DisciplineAssignSelect studentId={student[0]?.id} />

      <div className="container mx-auto px-0 pb-1 bg-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-3 p-1">
          <div className="py-4 px-2 md:p-4 w-full flex items-center">
            <h2 className="text-xl font-bold">Note</h2>
          </div>
          <div className="py-4 px-2 md:p-4">
            <h2 className="text-xl font-bold"></h2>
          </div>
        </div>
        <div className="p-1">
          {/* <div className="flex items-center justify-end gap-4 py-4 px-2 bg-white">
            <AddDisciplineModal
              icon={<PlusIcon className="w-4 md:w-5" />}
              dialogTitle="Adaugă materie"
              openButtonTitle="Adaugă materie"
            />
          </div> */}
        </div>
        {/* <>
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
        </> */}
      </div>
    </div>
  );
}
