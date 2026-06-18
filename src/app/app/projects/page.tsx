import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import ProjectList from "./ProjectList";
import { backendFetch } from "@/utils/backendFetch";

export default async function Page() {
  const headerStore = await headers();
  const cookiesStore = await cookies();
  const accessToken =
    headerStore.get("x-access-token") ?? cookiesStore.get("accessToken")?.value;
  if (!accessToken) {
    redirect("/login");
  }

  const res = await backendFetch("http://localhost:3000/auth/me", accessToken);

  if (!res.ok) {
    redirect("/login");
  }

  const user: { user_id: string; name: string; email: string } =
    await res.json();

  return (
    <>
      <div className=" p-5">
        <header className="flex p-5 border gap-5 border-gray-300 rounded-sm">
          <div className="rounded-full bg-gray-500 p-5 w-20 h-20 flex items-center justify-center">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 42 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.625 18.9056C23.132 18.9056 25.5364 17.9097 27.3091 16.137C29.0819 14.3642 30.0778 11.9599 30.0778 9.45281C30.0778 6.94577 29.0819 4.54141 27.3091 2.76866C25.5364 0.995918 23.132 0 20.625 0C18.118 0 15.7136 0.995918 13.9409 2.76866C12.1681 4.54141 11.1722 6.94577 11.1722 9.45281C11.1722 11.9599 12.1681 14.3642 13.9409 16.137C15.7136 17.9097 18.118 18.9056 20.625 18.9056ZM20.625 23.0587C8.05687 23.0587 0 29.9944 0 33.3712V39.6769H41.25V33.3712C41.25 29.2875 33.6225 23.0587 20.625 23.0587Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl">Hi {user.name}</h2>
              <p className="text-[12px]">id: {user.user_id}</p>
            </div>
            <p className="text-[16px]">Email: {user.email}</p>
          </div>
        </header>
        <ProjectList userId={user.user_id} accessToken={accessToken} />
      </div>
    </>
  );
}
