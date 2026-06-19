import Link from "next/link";

export default function UserNavigation() {
  return (
    <nav className="flex justify-center items-center mt-5 md:mt-8">
      <Link
        href={"/dashboard"}
        className="font-semibold text-sm bg-violet-600 hover:bg-violet-800 p-2 rounded text-white w-full text-center"
      >
        Panel de Administracion
      </Link>
    </nav>
  );
}
