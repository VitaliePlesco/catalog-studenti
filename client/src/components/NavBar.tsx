import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex justify-between border-b-[1px] border-b-gray-200 px-2 py-6 shadow-sm">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="no-underline">
            <h3 className="text-nowrap text-xl font-bold">Catalog Studenti</h3>
          </Link>

          <div
            className="flex flex-col md:flex-row
           md:gap-4 align-middle justify-between gap-6 "
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
        </div>
      </div>
    </div>
  );
}
