"use client";

import Background from "./_components/Background";
import Navigation from "./_components/Navigation";

function page() {
  return (
    <>
      <Navigation />
      <main className="h-dvh overflow-y-hidden">
        <header className="relative h-dvh">
          <Background
            color="#00AAE8"
            animationDuration="35s"
            className="-bottom-35 opacity-20 z-10"
            alternate={true}
          />
          <Background
            color="#0071CD"
            animationDuration="25s"
            className="-bottom-50 opacity-50 z-10"
            alternate={true}
          />
          <Background
            color="#007ECD"
            animationDuration="15s"
            className="-bottom-50 z-10"
          />
          <Background
            color="#0071CD"
            animationDuration="38s"
            className="-bottom-60 z-10"
          />
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-end justify-center mb-10 fixed -z-1">
              <h1 className="text-9xl">
                stream<span className="text-[#0071CD]!">flow</span>
              </h1>
              <p>Managing tasks made easier</p>
            </div>
          </div>
        </header>
      </main>
    </>
  );
}
export default page;
