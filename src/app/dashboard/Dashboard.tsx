"use client";
import dynamic from "next/dynamic";

const DashboardWithoutSSR = dynamic(() => import("./Dashboard"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <DashboardWithoutSSR />
    </main>
  );
}
