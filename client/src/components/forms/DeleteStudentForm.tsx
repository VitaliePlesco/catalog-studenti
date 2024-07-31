import { useState } from "react";
import { Button } from "@/components/Button";
import { axiosPrivate } from "@/axios";
import { Student } from "@/app/studenti/page";
import { useStudentStore } from "@/store/studentStore";

export default function DeleteStudentForm({
  student,
  setOpen,
}: {
  student: Student;
  setOpen: () => void;
}) {
  const [deleteStatus, setDeleteStatus] = useState("");

  const { deleteStudent } = useStudentStore();

  const handleDeleteStudent = async () => {
    try {
      const response = await axiosPrivate.delete(
        `/students/student/${student.id}`
      );
      if (response.status === 200) {
        setDeleteStatus("Studentul a fost șters");
        deleteStudent(student.id);
        setOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full md:w-auto">
      <div className="py-6">
        <h4>
          {student.firstName} {student.lastName}?
        </h4>
        <h3 className="text-green-500">{deleteStatus}</h3>
      </div>
      <Button
        onClick={() => handleDeleteStudent()}
        className="w-full text-nowrap"
      >
        Șterge student
      </Button>
    </div>
  );
}
