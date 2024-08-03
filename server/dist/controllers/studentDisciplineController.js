import { db } from "../db/index.js";
import { studentDiscipline } from "../db/schema.js";
import { and, eq } from "drizzle-orm";
export const getStudentDisciplines = async (req, res) => {
    const { studentId } = req.params;
    try {
        const studentDisciplines = await db.select().from(studentDiscipline).where(eq(studentDiscipline.studentId, Number(studentId)));
        return res.status(200).json(studentDisciplines);
    }
    catch (error) {
        return res.status(400).json({ message: "could not find disciplines student is enrolled in", error: error });
    }
};
export const createStudentDiscipline = async (req, res) => {
    const user = req.user;
    const { studentId, disciplineId } = req.body;
    const assignedDiscipline = await db.select().from(studentDiscipline).where(and(eq(studentDiscipline.studentId, Number(studentId)), eq(studentDiscipline.disciplineId, Number(disciplineId))));
    if (assignedDiscipline.length > 0) {
        return res.status(400).json({ message: "student is already enrolled in this discipline" });
    }
    try {
        const assignDiscipline = await db.insert(studentDiscipline).values({
            studentId: Number(studentId),
            disciplineId: Number(disciplineId),
            userId: user[0]?.id,
        }).returning();
        return res.status(201).json(assignDiscipline);
    }
    catch (error) {
        return res.status(400).json({ message: "could not assigne discipline", error: error });
    }
};
export const deleteStudentDiscipline = async (req, res) => {
    const { studentId, disciplineId } = req.params;
    const assignedDiscipline = await db.select().from(studentDiscipline).where(and(eq(studentDiscipline.studentId, Number(studentId)), eq(studentDiscipline.disciplineId, Number(disciplineId))));
    if (assignedDiscipline.length === 0) {
        return res.status(404).json({ message: "student is not enrolled in this discipline" });
    }
    try {
        await db.delete(studentDiscipline).where(and(eq(studentDiscipline.studentId, Number(studentId)), eq(studentDiscipline.disciplineId, Number(disciplineId))));
        return res.status(200).json({ message: "student has been excluded" });
    }
    catch (error) {
        return res.status(400).json({ message: "could not exclude student from discipline", error: error });
    }
};
