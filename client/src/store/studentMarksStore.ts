import { create } from "zustand";


type StudentDiscipline = {
  userId: string;
  studentId: number;
  disciplineId: number;
}

type Mark = {
  userId: string;
  mark: number;
  studentId: number;
  disciplineId: number;
  id: number | undefined;
}


type MarksAndDisciplinesState = {
  assignedDisciplines: StudentDiscipline[];
  marks: Mark[];
}

type MarksAndDisciplinesActions = {
  setAssignedDisciplines: (disciplines: StudentDiscipline[]) => void;
  assignDiscipline: (newDiscipline: StudentDiscipline) => void;
  removeDiscipline: (studentId: number, disciplineId: number) => void;
  setMarks: (mark: Mark[]) => void;
  createMark: (newMark: Mark) => void;
  updateMark: (id: number, updatedMark: number) => void;
  deleteMark: (id: number) => void;
}


export const useStudentMarksStore = create<MarksAndDisciplinesState & MarksAndDisciplinesActions>()((set) => ({
  assignedDisciplines: [],
  marks: [],
  setAssignedDisciplines: (disciplines: StudentDiscipline[]) => {
    set({ assignedDisciplines: [...disciplines] });
  },
  assignDiscipline: (newDiscipline: StudentDiscipline) => {
    set((state) => ({
      assignedDisciplines: [...state.assignedDisciplines, newDiscipline]
    }))
  },
  removeDiscipline: (studentId: number, disciplineId: number) => {
    set((state) => ({
      assignedDisciplines: state.assignedDisciplines.filter(discipline => (discipline.disciplineId && discipline.disciplineId) !== (studentId && disciplineId))
    }))
  },
  setMarks: (mark: Mark[]) => {
    set({ marks: [...mark] });
  },
  createMark: (newMark: Mark) => {
    set((state) => ({
      marks: [...state.marks, newMark]
    }))
  },
  updateMark: (id: number, updatedMark: number) => {
    set((state) => ({
      marks: state.marks.map(mark => {
        if (mark.id === id) {
          return { ...mark, updatedMark };
        } else {
          return mark;
        }
      })
    }))
  },
  deleteMark: (id: number) => {
    set((state) => ({
      marks: state.marks.filter(mark => mark.id !== id)
    }))
  },


}))

