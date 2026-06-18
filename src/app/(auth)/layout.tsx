import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="py-5 px-10 absolute top-0">
        <Link
          className="py-2 px-10 bg-blue-500 text-white shadow-sm rounded-sm flex items-center justify-center transition-all hover:bg-white hover:text-black"
          href={"/"}
        >
          ← Back to home
        </Link>
      </nav>
      {children}
    </>
  );
}
