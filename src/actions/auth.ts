"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();

  try {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (error) {
    console.error(error);
  }
  redirect("/login");
}
