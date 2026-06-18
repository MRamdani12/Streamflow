"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Page() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [nameError, setNameError] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string[]>([]);
  const [passwordError, setPasswordError] = useState<string[]>([]);
  const router = useRouter();

  const errorBoxClass =
    "bg-red-100 text-red-700 rounded-sm max-w-100 w-full p-3 flex flex-col gap-1 text-[12px]";

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setNameError([]);
        setEmailError([]);
        setPasswordError([]);

        data.validation_errors.map(
          (error: { field: string; message: string }) => {
            switch (error.field) {
              case "name":
                setNameError((currentState) => [
                  ...currentState,
                  error.message,
                ]);
                break;
              case "email":
                setEmailError((currentState) => [
                  ...currentState,
                  error.message,
                ]);
                break;
              case "password":
                setPasswordError((currentState) => [
                  ...currentState,
                  error.message,
                ]);
                break;
            }
          },
        );
        return;
      }

      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <div className="z-500 w-full h-dvh flex flex-col items-center justify-center">
        <form
          onSubmit={handleRegister}
          className="flex flex-col justify-center gap-5 w-full max-w-100 p-10 rounded-sm border border-[rgba(0,0,0,0.05)] shadow-lg text-center"
        >
          <h1 className="text-5xl mx-auto">
            stream<span className="text-[#0071CD]!">flow</span>
          </h1>
          <h2>Create an account</h2>
          <div className="flex flex-col text-start gap-2">
            <label htmlFor="name">Name</label>
            <input
              className="border rounded-sm border-black p-2"
              type="name"
              name="name"
              id="name"
              value={name}
              required
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            {!!nameError.length && (
              <div className={errorBoxClass}>
                {nameError.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col text-start gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="border rounded-sm border-black p-2"
              type="email"
              name="email"
              id="email"
              value={email}
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {!!emailError.length && (
              <div className={errorBoxClass}>
                {emailError.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col text-start gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="border rounded-sm border-black p-2"
              type="password"
              name="password"
              id="password"
              value={password}
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {!!passwordError.length && (
              <div className={errorBoxClass}>
                {passwordError.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>
          <div className="text-start flex items-start gap-3">
            <input
              name="agreeToPrivacyPolicy"
              className="cursor-pointer"
              type="checkbox"
              required
            />
            <label htmlFor="agreeToPrivacyPolicy" className="text-sm -mt-1">
              I agree to the{" "}
              <Link className="underline" href="/">
                Terms of Use{" "}
              </Link>
              and I have read the{" "}
              <Link className="underline" href="/">
                Privacy Policy.
              </Link>
            </label>
          </div>
          {serverError && (
            <div className={errorBoxClass}>
              <p>{serverError}</p>
            </div>
          )}
          <button className="bg-blue-500 p-2 rounded-sm text-white cursor-pointer hover:bg-white hover:text-black transition-all shadow-sm">
            Create an account
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
            Already have an account?{" "}
            <Link href="/login" className="underline decoration-solid">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default Page;
