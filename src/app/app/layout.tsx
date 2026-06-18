import AppNavigation from "@/app/_components/AppNavigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex">
        <div className="w-[30%] min-w-75 max-w-75">
          <AppNavigation />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </>
  );
}
