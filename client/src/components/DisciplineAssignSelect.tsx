"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import Loading from "./Loading";
import axios, { axiosPrivate } from "@/axios";
import { FormEvent, useEffect, useState } from "react";
import { Discipline } from "@/app/materii/page";
import { useStudentMarksStore } from "@/store/studentMarksStore";

export default function DisciplineAssignSelect({
  studentId,
}: {
  studentId: number;
}) {
  const [selectDiscipline, setSelectDiscipline] = useState("");
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { assignDiscipline } = useStudentMarksStore();
  const { isLoggedIn, isLoading, user } = useAuthContext();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectDiscipline, typeof selectDiscipline);
    try {
      const response = await axios.post("/student-discipline", {
        studentId: String(studentId),
        disciplineId: String(selectDiscipline),
      });
      if (response.status === 201) {
        assignDiscipline(response.data);
      } else if (response.status === 400) {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <form onSubmit={handleSubmit} className="w-full pb-6">
      <div className="w-full flex justify-between gap-4">
        <Select onValueChange={setSelectDiscipline}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selectează o materie" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Materii</SelectLabel>
              {disciplines?.map((discipline: Discipline) => (
                <SelectItem key={discipline.id} value={String(discipline.id)}>
                  {discipline.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errorMessage}
        <div>
          <Button type="submit" className="text-nowrap">
            Atribuie materie
          </Button>
        </div>
      </div>
    </form>
  );
}
