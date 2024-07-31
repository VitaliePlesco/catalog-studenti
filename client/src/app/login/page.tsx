"use client";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import axios from "@/axios";
import { useAuthStore } from "@/store/authStore";
import { useStringContext } from "@/context/StringContext";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { setWorld } = useStringContext();
  const { login } = useAuthStore();
  const router = useRouter();

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("/users/auth", credentials);
      if (response.status === 200) {
        login(response.data, true);
        setWorld({ hello: "everyone" });
        router.push("/studenti");
      } else {
        setErrorMessage("Wrong email or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-2 flex pt-32">
      <div className="container mx-auto lg:w-[45%] xl:w-[40%] md:flex-col md:items-center  rounded-lg bg-gray-100 px-4 pb-4 pt-8">
        <h1 className={`mb-3 text-xl font-bold`}>Intră în contul tău</h1>
        <div className="w-full">
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
                required
                value={credentials.email}
                onChange={handleChange}
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
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="parolă"
                autoComplete="your password"
                required
                value={credentials.password}
                onChange={handleChange}
                minLength={6}
              />

              <EyeIcon
                onClick={handleClickShowPassword}
                className=" absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
              />
            </div>
          </div>
        </div>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <Button type="submit" className="w-full">
          Intră în cont
        </Button>
        <div className="text-center pt-12 pb-2">
          <Link href="/register">
            <span className=" text-blue-500 hover:underline">
              Creează cont nou
            </span>
          </Link>
        </div>
      </div>
    </form>
  );
}
