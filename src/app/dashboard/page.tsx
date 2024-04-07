"use client";
import dynamic from "next/dynamic";
// import { PhaserLayer } from "@/phaser/phaserLayer";
import { Container } from "@radix-ui/themes";

const PhaserLayerntWithNoSSR = dynamic(() => import("@/phaser/phaserLayer"), {
  ssr: false,
});
export default function Dashboard() {
  return (
    <Container className="h-screen w-screen pb-24">
      <PhaserLayerntWithNoSSR />
    </Container>
  );
}
