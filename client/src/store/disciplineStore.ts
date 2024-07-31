import { Discipline } from "@/app/materii/page";
import { create } from "zustand";




type DisciplineState = {
  disciplines: Discipline[];
}

type DisciplineActions = {
  setDisciplines: (student: Discipline[]) => void;
  createDiscipline: (data: Discipline) => void;
  deleteDiscipline: (id: number) => void;
  updateDiscipline: (id: number, data: Omit<Discipline, "id" | "userID">) => void;
}


export const useDisciplineStore = create<DisciplineState & DisciplineActions>()((set) => ({
  disciplines: [],
  setDisciplines: (discipline: Discipline[]) => {
    set({ disciplines: [...discipline] });
  },
  createDiscipline: (data: Discipline) => {
    set((state) => ({
      disciplines: [...state.disciplines, data]
    }))
  },
  updateDiscipline: (id: number, data: Omit<Discipline, "id" | "userID">) => {
    set((state) => ({
      disciplines: state.disciplines.map(discipline => {
        if (discipline.id === id) {
          return { ...discipline, data };
        } else {
          return discipline;
        }
      })
    }))
  },
  deleteDiscipline: (id: number) => {
    set((state) => ({
      disciplines: state.disciplines.filter(discipline => discipline.id !== id)
    }))
  }


}))

