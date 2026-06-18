import { logoutAction } from "@/actions/auth";
import Link from "next/link";

function AppNavigation() {
  const navListClass =
    "py-3 px-5 hover:bg-blue-100 transition-all cursor-pointer";

  return (
    <div className="h-dvh shadow-xl z-500 bg-white">
      <nav className="flex flex-col gap-5 py-10">
        <Link href={"/"} className="mx-auto">
          <h1 className="text-3xl ">
            stream<span className="text-[#0071CD]!">flow</span>
          </h1>
        </Link>
        <div>
          <ul className="flex flex-col gap-5">
            <li className={navListClass}>
              <Link href={"/app/projects"}>Projects</Link>
            </li>
            <li className={navListClass}>
              <Link href={"/app/projects"}>Friends</Link>
            </li>
            <li className={navListClass}>
              <Link href={"/app/projects"}>Tasks</Link>
            </li>
            <li className={navListClass}>
              <Link href={"/app/projects"}>Account</Link>
            </li>
            <li>
              <form action={logoutAction}>
                <button className="py-3 px-5 w-full text-white bg-red-400 transition-all cursor-pointer">
                  Logout
                </button>
              </form>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default AppNavigation;
