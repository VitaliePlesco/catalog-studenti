"use client";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NavBar() {
  const { isLoggedIn, logout, user } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const redirect = isLoggedIn ? "/studenti" : "/";
  return (
    <div className="flex justify-between border-b-[1px] border-b-gray-200 px-2 py-6 shadow-sm">
      <div className="container mx-auto px-0 ">
        <div className="flex justify-between items-center">
          <Link href={`${redirect}`} className="no-underline">
            <h3 className="text-nowrap text-lg md:text-xl font-bold uppercase">
              Catalog Studenti
            </h3>
          </Link>

          <div className="md:hidden">
            <MobileNav />
          </div>

          {isLoggedIn ? (
            <div
              className="hidden md:flex 
             justify-between gap-6 "
            >
              <Link
                href="/studenti"
                className="hover:bg-gray-100 py-2 px-4 rounded-lg "
              >
                <h5>Studenți</h5>
              </Link>

              <Link
                href="/materii"
                className="hover:bg-gray-100 py-2 px-4 rounded-lg"
              >
                <h5>Materii</h5>
              </Link>
            </div>
          ) : (
            <></>
          )}

          {isLoggedIn ? (
            <div
              className="hidden md:flex flex-col md:flex-row
              md:gap-4 align-middle justify-between gap-6 cursor-pointer"
            >
              <div className="hover:bg-gray-100 py-2 px-4 rounded-lg">
                <h5>{user?.name} logat</h5>
              </div>

              <div
                onClick={handleLogout}
                className="hover:bg-gray-100 py-2 px-4 rounded-lg"
              >
                <h5>Ieși din cont</h5>
              </div>
            </div>
          ) : (
            <div
              className="hidden md:flex flex-col md:flex-row
              md:gap-4 align-middle justify-between gap-6 cursor-pointer"
            >
              <Link
                href="/login"
                className="hover:bg-gray-100 py-2 px-4 rounded-lg"
              >
                <h5>Intră în cont</h5>
              </Link>

              <Link
                href="/register"
                className="hover:bg-gray-100 py-2 px-4 rounded-lg"
              >
                <h5>Cont nou</h5>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
