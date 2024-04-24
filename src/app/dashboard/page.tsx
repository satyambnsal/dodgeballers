"use client";
import dynamic from "next/dynamic";
// import { PhaserLayer } from "@/phaser/phaserLayer";
import { Container } from "@radix-ui/themes";
import { Suspense, useRef, useState } from "react";
import { IRefPhaserGame } from "@/phaser/PhaserGame";
import { MintDodgeBallNFTModal } from "@/components/MintDodgeballNFTModal";
import { GameTutorial } from "@/components/GameTutorial";
import { useAccount, useContractRead, useNetwork } from "@starknet-react/core";
import { CONTRACT_CONFIG } from "@/contract-config";
import DodgeBallNFTABI from "@/abis/DodgeBallNFT.json";
import { useSearchParams } from "next/navigation";

const PhaserLayerntWithNoSSR = dynamic(() => import("@/phaser/PhaserGame"), {
  ssr: false,
});
export default function Dashboard() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const params = useSearchParams();

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

  console.log("user dodgeball nft balance", dodgeballData);
  const isDemo = params.get("demo");

  return (
    <Suspense>
      <Container className="mt-20 h-screen pb-24">
        <PhaserLayerntWithNoSSR
          handleMintAlertModal={() => {
            setIsMintAlertModalOpen(true);
          }}
          handleTutorialModal={() => {
            setIsGameTutorialOpen(true);
          }}
          showMintAlert={
            !isDemo && (!dodgeballData || dodgeballData === BigInt(0))
          }
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
    </Suspense>
  );
}
