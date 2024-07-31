import { db } from "../db/index.js";
import { mark } from "../db/schema.js";
import { and, eq } from "drizzle-orm";
export const getStudentMarksByDiscipline = async (req, res) => {
    const { studentId, disciplineId } = req.params;
    try {
        const marks = await db.select().from(mark).where(and(eq(mark.studentId, Number(studentId)), eq(mark.disciplineId, Number(disciplineId))));
        return res.status(200).json(marks);
    }
    catch (error) {
        return res.status(400).json({ message: "could not find students", error: error });
    }
};
export const createMark = async (req, res) => {
    const user = req.user;
    const newMark = req.body;
    try {
        const createdMark = await db.insert(mark).values({
            mark: Number(newMark.mark),
            studentId: Number(newMark.studentId),
            disciplineId: Number(newMark.disciplineId),
            userId: user[0]?.id,
        }).returning();
        return res.status(201).json(newMark).end();
    }
    catch (error) {
        return res.status(400).json({ message: "could not create new mark", error: error });
    }
};
export const deleteMark = async (req, res) => {
    const markId = req.params.id;
    const markById = await db.select().from(mark).where(eq(mark.id, Number(markId)));
    if (markById.length === 0) {
        return res.status(401).json({ message: "mark doesn't exist" });
    }
    try {
        await db.delete(mark).where(eq(mark.id, Number(markId)));
        return res.status(200).json({ message: "mark has been deleted" });
    }
    catch (error) {
        return res.status(401).json({ message: "could not delete mark", error: error });
    }
};
export const updateMark = async (req, res) => {
    const markId = req.params.id;
    const newMark = req.body;
    const markById = await db.select().from(mark).where(eq(mark.id, Number(markId)));
    if (markById.length === 0) {
        return res.status(400).json({ message: "mark doesn't exist" });
    }
    try {
        const updatedMark = await db.update(mark).set({
            mark: newMark.mark
        }).where(eq(mark.id, Number(markId))).returning();
        return res.status(200).json(updatedMark);
    }
    catch (error) {
        return res.status(400).json({ message: "could not update mark", error: error });
    }
};
