"use client";
import { Spinner } from "./Spinner";

export default function Loading() {
  return (
    <div className="container mx-auto px-0">
      <div className="flex flex-col justify-between items-center px-2">
        <h1 className="text-2xl font-semibold py-10"></h1>
        <div>
          <Spinner className="h-16" />
        </div>
      </div>
    </div>
  );
}
