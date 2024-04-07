"use client";
import dynamic from "next/dynamic";
// import { PhaserLayer } from "@/phaser/phaserLayer";
import { Container } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { IRefPhaserGame } from "@/phaser/PhaserGame";
import { MintDodgeBallNFTModal } from "@/components/MintDodgeballNFTModal";
import { GameTutorial } from "@/components/GameTutorial";
import { useAccount, useContractRead, useNetwork } from "@starknet-react/core";
import { CONTRACT_CONFIG } from "@/contract-config";
import DodgeBallNFTABI from "@/abis/DodgeBallNFT.json";

const PhaserLayerntWithNoSSR = dynamic(() => import("@/phaser/PhaserGame"), {
  ssr: false,
});
export default function Dashboard() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isMintAlertModalOpen, setIsMintAlertModalOpen] = useState(false);
  const [isGameTutorialOpen, setIsGameTutorialOpen] = useState(false);
  const dodgeballContractAddress =
    chain?.network === "mainnet"
      ? CONTRACT_CONFIG.mainnet.dodgeballnft.address
      : CONTRACT_CONFIG.sepolia.dodgeballnft.address;

  const {
    data: dodgeballData,
    isLoading: dodgeballIsLoading,
    isError: dodgeballIsError,
    error: dodgeballError,
  } = useContractRead({
    functionName: "balance_of",
    args: [address!],
    abi: DodgeBallNFTABI,
    address: dodgeballContractAddress,
    watch: true,
  });

  return (
    <Container className="mt-20 h-screen pb-24">
      <PhaserLayerntWithNoSSR
        handleMintAlertModal={() => {
          setIsMintAlertModalOpen(true);
        }}
        handleTutorialModal={() => {
          setIsGameTutorialOpen(true);
        }}
        showMintAlert={dodgeballData !== BigInt(1)}
      />
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
