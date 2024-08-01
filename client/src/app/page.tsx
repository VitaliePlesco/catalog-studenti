"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-0">
      <div className="flex flex-col items-center justify-center">
        <div className="px-2">
          <h1 className="text-2xl text-center font-semibold py-10">
            Intră în cont sau crează cont nou
          </h1>
        </div>
        <div className="flex flex-col gap-4 md:flex-row ">
          <Link href="/login">
            <div className="border-[2px] text-center border-gray-100 hover:bg-gray-100 py-2 px-4 rounded-lg">
              <h5>Intră în cont</h5>
            </div>
          </Link>

          <Link href="/register">
            <div className="border-[2px] text-center border-gray-100 hover:bg-gray-100 py-2 px-4 rounded-lg">
              <h5>Cont nou</h5>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
