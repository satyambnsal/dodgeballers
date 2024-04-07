"use client";
import dynamic from "next/dynamic";
// import { PhaserLayer } from "@/phaser/phaserLayer";
import { Container } from "@radix-ui/themes";
import { useRef } from "react";
import { IRefPhaserGame } from "@/phaser/PhaserGame";

const PhaserLayerntWithNoSSR = dynamic(() => import("@/phaser/PhaserGame"), {
  ssr: false,
});
export default function Dashboard() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  return (
    <Container className="h-screen w-screen pb-24">
      <PhaserLayerntWithNoSSR ref={phaserRef}/>
    </Container>
  );
}
