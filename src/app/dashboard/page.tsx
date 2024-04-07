"use client";
import dynamic from "next/dynamic";
// import { PhaserLayer } from "@/phaser/phaserLayer";
import { Container } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { IRefPhaserGame } from "@/phaser/PhaserGame";
import { MintDodgeBallNFTModal } from "@/components/MintDodgeballNFTModal";
import { GameTutorial } from "@/components/GameTutorial";

const PhaserLayerntWithNoSSR = dynamic(() => import("@/phaser/PhaserGame"), {
  ssr: false,
});
export default function Dashboard() {
  const [isMintAlertModalOpen, setIsMintAlertModalOpen] = useState(false);
  const [isGameTutorialOpen, setIsGameTutorialOpen] = useState(false);
  return (
    <Container className="mt-20 h-screen pb-24">
      <PhaserLayerntWithNoSSR />
      <MintDodgeBallNFTModal
        open={isMintAlertModalOpen}
        handleClose={() => {
          setIsMintAlertModalOpen(false);
        }}
      />
      <GameTutorial
        open={isGameTutorialOpen}
        handleClose={() => {
          setIsGameTutorialOpen(false);
          window.sessionStorage.setItem("is_show_tutorial", "false");
        }}
      />
    </Container>
  );
}
