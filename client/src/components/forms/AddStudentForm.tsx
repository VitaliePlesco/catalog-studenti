import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { axiosPrivate } from "@/axios";
import { useStudentStore } from "@/store/studentStore";

export default function AddStudentForm({ setOpen }: { setOpen: () => void }) {
  const [studentName, setStudentName] = useState({
    firstName: "",
    lastName: "",
  });

  const { createStudent } = useStudentStore();

  const handleChange = (e: any) => {
    setStudentName({
      ...studentName,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post("/students", studentName);
      if (response.status === 201) {
        setStudentName({
          firstName: "",
          lastName: "",
        });
        createStudent(response.data);
        setOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full py-6">
      <div className="w-full flex flex-col  md:items-end gap-4">
        <div className="w-full">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="firstName"
          >
            Prenume
          </label>
          <div className="relative">
            <input
              className="block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
              id="firstName"
              type="text"
              name="firstName"
              placeholder="ex. Ion"
              autoComplete="given name"
              value={studentName.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="w-full">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="lastName"
          >
            Nume
          </label>
          <div className="relative">
            <input
              className="block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
              id="lastName"
              type="text"
              name="lastName"
              placeholder="ex. Popescu"
              autoComplete="family name"
              value={studentName.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="w-full md:w-auto">
          <Button className="w-full text-nowrap">Adaugă student</Button>
        </div>
      </div>
    </form>
  );
}
