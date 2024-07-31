import { relations } from 'drizzle-orm';
import { serial, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
export const user = pgTable('user', {
    id: uuid('id').defaultRandom().primaryKey(),
    firstName: text('firstName').notNull(),
    lastName: text('lastName').notNull(),
    email: text('email').notNull().unique(),
    password: text("password").notNull()
});
export const discipline = pgTable("discipline", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    userId: uuid("userId").notNull().references(() => user.id, { onDelete: 'cascade' }),
});
export const student = pgTable("student", {
    id: serial("id").primaryKey(),
    firstName: text("firstName").notNull(),
    lastName: text('lastName').notNull(),
    userId: uuid("userId").notNull().references(() => user.id, { onDelete: 'cascade' }),
});
export const mark = pgTable("mark", {
    id: serial("id").primaryKey(),
    mark: integer("mark").notNull(),
    studentId: integer("studentId").notNull().references(() => student.id, { onDelete: "cascade" }),
    disciplineId: integer("disciplineId").notNull().references(() => discipline.id, { onDelete: "cascade" }),
    userId: uuid("userId").notNull().references(() => user.id, { onDelete: 'cascade' }),
});
export const studentDiscipline = pgTable("student_discipline", {
    studentId: integer("studentId").notNull().references(() => student.id, { onDelete: "cascade" }),
    disciplineId: integer("disciplineId").notNull().references(() => discipline.id, { onDelete: "cascade" }),
    userId: uuid("userId").notNull().references(() => user.id, { onDelete: 'cascade' }),
});
export const userRelations = relations(user, ({ many }) => ({
    students: many(student),
    disciplines: many(discipline),
    marks: many(mark),
    studentDisciplines: many(studentDiscipline)
}));
export const studentRelations = relations(student, ({ many }) => ({
    marks: many(mark),
    disciplines: many(studentDiscipline),
}));
export const markRelations = relations(mark, (({ one }) => ({
    student: one(student, {
        fields: [mark.studentId],
        references: [student.id]
    }),
    discipline: one(discipline, {
        fields: [mark.disciplineId],
        references: [discipline.id]
    })
})));
export const disciplineRelations = relations(discipline, ({ one, many }) => ({
    studentDisciplines: many(studentDiscipline),
}));
