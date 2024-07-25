import Link from "next/link";
import { Button } from "@/components/Button";

export default function Login() {
  return (
    <form className="space-y-3 p-2 flex pt-32">
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
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border border-gray-200 py-[9px] pl-4  text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
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
        >
          {/* {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
        </div>
        <Button className="w-full">Intră în cont</Button>
        <div className="text-center pt-12 pb-2">
          <Link href="/signup">
            <span className=" text-blue-500 hover:underline">
              Creează cont nou
            </span>
          </Link>
        </div>
      </div>
    </form>
  );
}
