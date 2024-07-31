"use client";
import { Button } from "@/components/Button";
import Link from "next/link";
import axios from "@/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("/users", credentials);

      if (response.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-2 flex pt-32">
      <div className="container mx-auto lg:w-[45%] xl:w-[40%] md:flex-col md:items-center  rounded-lg bg-gray-100 px-4 pb-4 pt-8">
        <h1 className={`mb-3 text-xl font-bold`}>Creează un cont nou</h1>
        <div className="w-full">
          <div>
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
                value={credentials.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
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
                value={credentials.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="ion.popescu@gmail.com"
                autoComplete="your email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Parolă
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border border-gray-200 py-[9px] pl-4  text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="parolă"
                autoComplete="your password"
                value={credentials.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
          </div>
        </div>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        ></div>
        <Button type="submit" className="w-full">
          Creează cont
        </Button>
        <div className="text-center pt-12 pb-2">
          <Link href="/login">
            <span className=" text-blue-500 hover:underline">
              Accesează contul
            </span>
          </Link>
        </div>
      </div>
    </form>
  );
}
