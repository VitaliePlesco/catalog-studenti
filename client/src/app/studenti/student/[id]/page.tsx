"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { axiosPrivate } from "@/axios";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
};

export default function Student() {
  const [student, setStudent] = useState<Student[]>([]);

  const { id } = useParams();
  const getStudent = async () => {
    const response = await axiosPrivate.get(`/students/student/${id}`);
    if (response.status === 200) {
      setStudent(response.data);
    }
  };

  useEffect(() => {
    getStudent();
  });
  if (student?.length === 0 || undefined) {
    return <div>Student not found!</div>;
  }
  return (
    <div>
      <h1>Student</h1>
      <h1>{student[0].firstName}</h1>
      <h1>{student[0].lastName}</h1>
    </div>
  );
}
