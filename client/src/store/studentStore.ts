import { Student } from "@/app/studenti/page";
import { create } from "zustand";

type StudentData = Omit<Student, "id" | "userId">;


type StudentState = {
  students: Student[];
}

type StudentActions = {
  setStudents: (student: Student[]) => void;
  createStudent: (data: Student) => void;
  updateStudent: (id: number, data: Omit<Student, "id" | "userID">) => void;
  deleteStudent: (id: number) => void;
}


export const useStudentStore = create<StudentState & StudentActions>()((set) => ({
  students: [],
  setStudents: (student: Student[]) => {
    set({ students: [...student] });
  },
  createStudent: (data: Student) => {
    set((state) => ({
      students: [...state.students, data]
    }))
  },
  updateStudent: (id: number, data: Omit<Student, "id" | "userID">) => {
    set((state) => ({
      students: state.students.map(student => {
        if (student.id === id) {
          return { ...student, data };
        } else {
          return student;
        }
      })
    }))
  },
  deleteStudent: (id: number) => {
    set((state) => ({
      students: state.students.filter(student => student.id !== id)
    }))
  }


}))

