/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// import Image from "next/image";

import { Button, Container, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { MyContainer } from "@/components/MyContainer";
import { useRouter } from "next/navigation";
import {
  useAccount,
  useContract,
  useContractRead,
  useNetwork,
  useProvider,
  useContractWrite,
} from "@starknet-react/core";
import { ConnectButton } from "./buttons/ConnectButton";
import BlobertNFTABI from "@/abis/BlobCloneNFT.json";
import DodgeBallNFTABI from "@/abis/DodgeBallNFT.json";
import { CONTRACT_CONFIG } from "@/contract-config";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "./common/Spinner";
import { BLOBERT_SITE_URL } from "@/utils/constants";

export function Hero() {
  const router = useRouter();
  const { address, account } = useAccount();
  const { provider } = useProvider();
  const { chain } = useNetwork();
  const [mintTxHash, setMintTxHash] = useState("");

  const blobertContractAddress =
    chain?.network === "mainnet"
      ? CONTRACT_CONFIG.mainnet.blobertnft.address
      : CONTRACT_CONFIG.sepolia.blobertnft.address;
  const dodgeballContractAddress =
    chain?.network === "mainnet"
      ? CONTRACT_CONFIG.mainnet.dodgeballnft.address
      : CONTRACT_CONFIG.sepolia.dodgeballnft.address;

  const {
    data: blobertData,
    isError: blobertIsError,
    isLoading: blobertIsLoading,
    error: blobertError,
  } = useContractRead({
    functionName: "balance_of",
    args: [address!],
    abi: BlobertNFTABI,
    address: blobertContractAddress,
    watch: true,
  });

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

  console.log("blobert nft balance", blobertData);
  console.log("dodgeball nft balance", dodgeballData);

  const { contract: dodgeballContract } = useContract({
    abi: DodgeBallNFTABI,
    address: dodgeballContractAddress,
  });

  const calls = useMemo(() => {
    if (!address || !dodgeballContract) return [];
    return dodgeballContract.populateTransaction.mint(address);
  }, [dodgeballContract, address]);

  const {
    writeAsync: mintDodgeBallFn,
    data: mintResponse,
    isPending: isMintDodgePending,
  } = useContractWrite({
    calls,
  });

  console.log({ blobertData, dodgeballData });
  const handleDodgeballMint = async () => {
    try {
      await mintDodgeBallFn();
      console.log("mint resp", mintResponse);
    } catch (error) {}
  };

  console.log("dodgeball", Number(dodgeballData));
  console.log("blobert", Number(blobertData));

  return (
    <div className="relative pb-20 pt-10 sm:py-24">
      {/* <div className="bg-indigo-50 absolute inset-x-0 -bottom-14 -top-48 overflow-hidden">
        <Image
          className="absolute left-0 top-0 translate-x-[-55%] translate-y-[-10%] -scale-x-100 sm:left-1/2 sm:translate-x-[-98%] sm:translate-y-[-6%] lg:translate-x-[-106%] xl:translate-x-[-122%]"
          src={backgroundImage}
          alt=""
          width={918}
          height={1495}
          priority
          unoptimized
        />
        <div className="from-white absolute inset-x-0 top-0 h-40 bg-gradient-to-b" />
        <div className="from-white absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t" />
      </div> */}
      <Flex
        direction="column"
        className="mx-auto max-w-4xl lg:max-w-4xl lg:px-6"
        align="center"
      >
        <div className="font-display text-5xl font-bold sm:text-7xl">
          <Heading className="block text-center leading-10">
            Bloberts, Unleash Your Inner Dodgeball Champion!
          </Heading>
        </div>
        <Text
          className="font-display space-y-6 text-justify text-xl leading-10 tracking-wide"
          mt="8"
        >
          Calling all Squires of the Realms! Are you tired of your Blobert just
          lounging around the castle moat? It's time to unleash their true
          potential! Introducing the Blobert Dodgeball Challenge, the ultimate
          test of fishy finesse and NFT synergy!
        </Text>

        {!address && (
          <Text className="pt-8 text-red-900">
            {" "}
            Please connect your wallet first to check mint eligibility
          </Text>
        )}

        {address &&
          Number(blobertData) === 0 &&
          Number(dodgeballData) === 0 && (
            <div className="my-8 space-y-3">
              <Heading size="3" color="crimson" className="my-4">
                Don't Miss Out, Blobert! The Dodgeball Action is Heating Up!
              </Heading>
              <Text className="text-md my-8 font-semibold">
                Seems you do not own a Blobert NFT!. Checkout Realms page to
                purchase Blobert NFT first
              </Text>
              <Link target="_blank" href={BLOBERT_SITE_URL} className="pl-4">
                {" "}
                Join the Blobert Community
              </Link>
            </div>
          )}

        {address && (Number(blobertData) > 0 || Number(dodgeballData) > 0) && (
          <div className="mt-8 flex flex-col space-y-4 border">
            <Text>
              Congratulations! you are eligible for Dodgeball NFT mint 🔥
            </Text>
            <Button
              onClick={handleDodgeballMint}
              disabled={!!(dodgeballData && Number(dodgeballData) > 0)}
            >
              {!!(dodgeballData && Number(dodgeballData) > 0)
                ? "Already Claimed"
                : "Mint Dodgeball NFT"}
              {isMintDodgePending && <Spinner />}
            </Button>
          </div>
        )}
        {!address ? (
          <ConnectButton />
        ) : (
          <Button
            onClick={() => router.push("/dashboard")}
            className="w-64 cursor-pointer"
            size="3"
            mt="9"
          >
            Play Game
          </Button>
        )}
      </Flex>
    </div>
  );
}
