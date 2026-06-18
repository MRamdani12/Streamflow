import Link from "next/link";

function Navigation() {
  return (
    <nav className="flex items-center justify-between w-full py-5 px-10 absolute top-0 z-500">
      <Link href="/">streamflow</Link>
      <ul className="flex items-center justify-between gap-10">
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/app/projects">My Projects</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navigation;
