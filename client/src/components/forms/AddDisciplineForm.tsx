import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { axiosPrivate } from "@/axios";
import { useDisciplineStore } from "@/store/disciplineStore";

export default function AddDisciplineForm({
  setOpen,
}: {
  setOpen: () => void;
}) {
  const [name, setName] = useState({
    name: "",
  });

  const { createDiscipline } = useDisciplineStore();

  const handleChange = (e: any) => {
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post("/disciplines", name);
      if (response.status === 201) {
        setName({
          name: "",
        });
        createDiscipline(response.data);
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
            htmlFor="name"
          >
            Denumire
          </label>
          <div className="relative">
            <input
              className="block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="denumire"
              autoComplete="name"
              value={name.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="w-full md:w-auto">
          <Button className="w-full text-nowrap">Adaugă materie</Button>
        </div>
      </div>
    </form>
  );
}
