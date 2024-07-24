import { db } from "../db/index.js";
import { student } from "../db/schema.js";
import { eq } from "drizzle-orm";
export const getStudents = async (req, res) => {
    try {
        const students = await db.query.student.findMany();
        return res.status(200).json(students);
    }
    catch (error) {
        return res.status(400).json({ message: "could not find students", error: error });
    }
};
export const getStudentById = async (req, res) => {
    const studentId = req.params.id;
    try {
        const studentById = await db.select().from(student).where(eq(student.id, Number(studentId)));
        if (studentById.length === 0) {
            return res.status(404).json({ message: "student doesn't exist" });
        }
        return res.status(200).json(studentById);
    }
    catch (error) {
        return res.status(400).json({ message: "could not find student", error: error });
    }
};
export const createStudent = async (req, res) => {
    const user = req.user;
    const { firstName, lastName } = req.body;
    try {
        const newStudent = await db.insert(student).values({
            firstName: firstName,
            lastName: lastName,
            userId: user[0]?.id,
        }).returning({ id: student.id, email: student.firstName });
        return res.status(201).json({ message: "new student succes" }).end();
    }
    catch (error) {
        return res.status(400).json({ message: "could not create new student", error: error });
    }
};
export const deleteStudent = async (req, res) => {
    const studentId = req.params.id;
    const studentById = await db.select().from(student).where(eq(student.id, Number(studentId)));
    if (studentById.length === 0) {
        return res.status(404).json({ message: "student doesn't exist" });
    }
    try {
        await db.delete(student).where(eq(student.id, Number(studentId)));
        return res.status(200).json({ message: "student has been deleted" });
    }
    catch (error) {
        return res.status(400).json({ message: "could not delete student", error: error });
    }
};
export const updateStudent = async (req, res) => {
    const studentId = req.params.id;
    const { firstName, lastName } = req.body;
    const studentById = await db.select().from(student).where(eq(student.id, Number(studentId)));
    if (studentById.length === 0) {
        return res.status(404).json({ message: "student doesn't exist" });
    }
    try {
        const updatedStudent = await db.update(student).set({
            firstName: firstName,
            lastName: lastName
        }).where(eq(student.id, Number(studentId))).returning();
        return res.status(200).json(updatedStudent);
    }
    catch (error) {
        return res.status(400).json({ message: "could not update student", error: error });
    }
};
