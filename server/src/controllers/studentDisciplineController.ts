import { Request, Response, } from "express";
import { db } from "../db/index.js";
import { studentDiscipline } from "../db/schema.js";
import { and, eq } from "drizzle-orm";


export const getStudentDisciplines = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  try {
    const studentDisciplines = await db.select().from(studentDiscipline).where(eq(studentDiscipline.studentId, Number(studentId)));
    return res.status(200).json(studentDisciplines);
  } catch (error) {
    return res.status(400).json({ message: "could not find disciplines student is enrolled in", error: error });
  }
}

export const createStudentDiscipline = async (req: Request, res: Response) => {
  const { studentId, disciplineId } = req.body;
  try {
    const assignDiscipline = await db.insert(studentDiscipline).values({
      studentId: Number(studentId),
      disciplineId: Number(disciplineId)
    }).returning();
    return res.status(201).json({ message: "new discipline assigned successfully" }).end();
  } catch (error) {
    return res.status(400).json({ message: "could not assigne discipline", error: error });
  }
}

export const deleteStudentDiscipline = async (req: Request, res: Response) => {
  const { studentId, disciplineId } = req.params;
  const assignedDiscipline = await db.select().from(studentDiscipline).where(and(
    eq(studentDiscipline.studentId, Number(studentId)),
    eq(studentDiscipline.disciplineId, Number(disciplineId)
    )));
  if (assignedDiscipline.length === 0) {
    return res.status(404).json({ message: "student is not enrolled in this discipline" })
  }
  try {
    await db.delete(studentDiscipline).where(and(
      eq(studentDiscipline.studentId, Number(studentId)),
      eq(studentDiscipline.disciplineId, Number(disciplineId)
      )));
    return res.status(200).json({ message: "student has been excluded" });
  } catch (error) {
    return res.status(400).json({ message: "could not exclude student from discipline", error: error });
  }
}

