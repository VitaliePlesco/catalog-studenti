"use client";
import { useEffect } from "react";
import { axiosPrivate } from "@/axios";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { AddStudentModal } from "@/components/AddStudentModal";
import { EditStudentModal } from "@/components/EditStudentModal";
import { DeleteStudentModal } from "@/components/DeleteStudentModal";
import { useAuthStore } from "@/store/authStore";
import { useStudentStore } from "@/store/studentStore";

export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  userId: string;
};

export default function Studenti() {
  const { students, setStudents } = useStudentStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const getStudents = async () => {
      const response = await axiosPrivate.get(`/students/${user.userId}`);
      if (response.status === 200) {
        setStudents(response.data);
      } else {
        console.log(response.data.message);
      }
    };
    getStudents();
  }, [user.userId, setStudents, students]);

  return (
    <main className="container mx-auto px-0">
      <div className="flex flex-col justify-between items-center px-2">
        <h1 className="text-2xl font-semibold py-10">Studenti</h1>
      </div>

      <div className="container mx-auto px-0 pb-1 bg-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-3 p-1  ">
          <div className="py-4 px-2 md:p-4">
            <h2 className="text-xl font-bold">Prenume</h2>
          </div>
          <div className="py-4 px-2 md:p-4">
            <h2 className="text-xl font-bold">Nume</h2>
          </div>
        </div>
        <div className="p-1">
          <div className="flex items-center justify-end gap-4 py-4 px-2 bg-white">
            <AddStudentModal
              icon={<PlusIcon className="w-4 md:w-5" />}
              dialogTitle="Adaugă student"
              openButtonTitle="Adaugă student"
            />
          </div>
        </div>
        <>
          {students.map((student: Student) => (
            <div
              key={student.id}
              className="grid grid-cols-2 md:grid-cols-3 p-1"
            >
              <div className="bg-white py-4 px-2 md:p-4">
                <Link href={`/studenti/student/${student.id}`}>
                  <p className="text-lg md:text-xl">{student.firstName}</p>
                </Link>
              </div>
              <div className="bg-white py-4 px-2 md:p-4">
                <Link href={`/studenti/student/${student.id}`}>
                  <p className="text-lg md:text-xl">{student.lastName}</p>
                </Link>
              </div>
              <div className="col-span-2 md:col-auto flex justify-start md:justify-end bg-white">
                <div className="bg-white py-4 px-2 md:p-4">
                  <EditStudentModal
                    student={student}
                    icon={<PencilIcon className="w-4 md:w-5" />}
                    dialogTitle="Editează student"
                  />
                </div>
                <div className="bg-white py-4 px-2 md:p-4">
                  <DeleteStudentModal
                    student={student}
                    icon={<TrashIcon className="w-4 md:w-5" />}
                    dialogTitle="Șterge student"
                    description="Ești sigur că vreai să ștergi studentul:"
                  />

                  {/* <button className="rounded-md border p-2 hover:bg-gray-100">
                    <TrashIcon className="w-4 md:w-5" />
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
    </main>
  );
}
