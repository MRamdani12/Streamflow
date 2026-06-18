"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const errorBoxClass =
    "bg-red-100 text-red-700 rounded-sm max-w-100 w-full p-3 flex flex-col gap-1 text-[12px]";

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message);
      }

      router.push("/app/projects");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <div className="z-500 w-full h-dvh flex flex-col items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center gap-5 w-full max-w-100 p-10 rounded-sm border border-[rgba(0,0,0,0.05)] shadow-lg text-center"
        >
          <h1 className="text-5xl mx-auto">
            stream<span className="text-[#0071CD]!">flow</span>
          </h1>
          <h2>Please login to continue</h2>
          <div className="flex flex-col text-start gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="border rounded-sm border-black p-2"
              type="email"
              name="email"
              id="email"
              required
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col text-start gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="border rounded-sm border-black p-2"
              type="password"
              name="password"
              id="password"
              required
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error ? (
            <div className={errorBoxClass}>
              <p>{error}</p>
            </div>
          ) : null}

          <button className="bg-blue-500 p-2 rounded-sm text-white cursor-pointer hover:bg-white hover:text-black transition-all shadow-sm">
            Login
          </button>

          <small className="text-center">
            By continuing, you agree to our{" "}
            <Link href="/" className="underline">
              Terms of Use.
            </Link>{" "}
            <br />
            Read our{" "}
            <Link href="/" className="underline">
              Privacy Policy.
            </Link>
          </small>
        </form>
        <div className="text-[14px] flex justify-end mt-5">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline decoration-solid">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default Page;
