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
import { useAuthContext } from "@/context/AuthContext";
import Loading from "./Loading";
import { axiosPrivate } from "@/axios";
import { useEffect, useState } from "react";
import { Discipline } from "@/app/materii/page";

export default function DisciplineAssignSelect() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selectează o materie" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Materii</SelectLabel>
          {disciplines?.map((discipline: Discipline) => (
            <SelectItem key={discipline.id} value={discipline.name}>
              {discipline.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
