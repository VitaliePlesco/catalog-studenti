import { db } from "../db/index.js";
import { discipline } from "../db/schema.js";
import { eq } from "drizzle-orm";
export const getDisciplines = async (req, res) => {
    try {
        const disciplines = await db.query.discipline.findMany();
        return res.status(200).json(disciplines);
    }
    catch (error) {
        return res.status(400).json({ message: "could not find disciplines", error: error });
    }
};
export const createDiscipline = async (req, res) => {
    const user = req.user;
    const { name } = req.body;
    try {
        const newDiscipline = await db.insert(discipline).values({
            name: name,
            userId: user[0]?.id,
        }).returning();
        return res.status(201).json(newDiscipline);
    }
    catch (error) {
        return res.status(400).json({ message: "could not create new student", error: error });
    }
};
export const deleteDiscipline = async (req, res) => {
    const disciplineId = req.params.id;
    const disciplineById = await db.select().from(discipline).where(eq(discipline.id, Number(disciplineId)));
    if (disciplineById.length === 0) {
        return res.status(404).json({ message: "discipline not found" });
    }
    try {
        const deletedDiscipline = await db.delete(discipline).where(eq(discipline.id, Number(disciplineId)));
        return res.status(200).json({ message: "discipline has been deleted" });
    }
    catch (error) {
        return res.status(400).json({ message: "could not delete discipline", error: error });
    }
};
export const updateDiscipline = async (req, res) => {
    const disciplineId = req.params.id;
    const { name } = req.body;
    const disciplineById = await db.select().from(discipline).where(eq(discipline.id, Number(disciplineId)));
    if (disciplineById.length === 0) {
        return res.status(404).json({ message: "discipline not found" });
    }
    try {
        const updatedDiscipline = await db.update(discipline).set({
            name: name
        }).where(eq(discipline.id, Number(disciplineId))).returning();
        return res.status(200).json(updatedDiscipline);
    }
    catch (error) {
        return res.status(400).json({ message: "could not update discipline", error: error });
    }
};
