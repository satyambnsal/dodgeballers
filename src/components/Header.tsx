"use client";
import { Box, Badge, Container, Link, Heading, Text } from "@radix-ui/themes";
import { ThemeToggle } from "./common/ThemeToggle";
import { ConnectButton } from "./buttons/ConnectButton";
import { useAccount, useBalance, useNetwork } from "@starknet-react/core";
import { GitHubLogoIcon, VideoIcon } from "@radix-ui/react-icons";
import { CONTRACT_CONFIG } from "@/contract-config";
import { GAME_DEMO_VIDEO, GITHUB_CONTRACTS_URL } from "@/utils/constants";

// const FEEDBACK_FORM_URL = "https://forms.gle/7FBvga7qCtP6iCKr8";

export const Header = () => {
  const { chain } = useNetwork();
  console.log(chain);
  const { address } = useAccount();
  const dodgecoinContractAddress =
    chain?.network === "mainnet"
      ? CONTRACT_CONFIG.mainnet.dodgecoin.address
      : CONTRACT_CONFIG.sepolia.dodgecoin.address;
  const { data: dodgecoinBalance } = useBalance({
    address,
    watch: true,
    token: dodgecoinContractAddress,
  });
  console.log({ balance: dodgecoinBalance });

  return (
    <Container>
      <Box height="0" className="absolute left-4 top-8 flex items-center gap-4">
        <Link href="/" className="p-4">
          <Heading className="leading-2">Dodgeballer</Heading>
        </Link>
        <Link href="/dashboard" className="py-4">
          Play Game
        </Link>
        <Link href={GITHUB_CONTRACTS_URL} target="_blank" className="py-4">
          <GitHubLogoIcon />
        </Link>
        <Link href={GAME_DEMO_VIDEO} target="_blank" className="py-4">
          Demo <VideoIcon />
        </Link>
        {/* <Link href={FEEDBACK_FORM_URL} target="_blank" className="py-4">
          Feedback
        </Link> */}
      </Box>
      <Box
        height="0"
        className="absolute right-4 top-8 flex items-center gap-4"
      >
        {!!chain && !!chain.name && !!chain.network && (
          <Badge highContrast size="2">
            {chain.name} {chain.network}
          </Badge>
        )}
        <ConnectButton />
        <ThemeToggle />
      </Box>
      <Box className="absolute right-4 top-12">
        {dodgecoinBalance?.formatted && (
          <Text className="text-xs font-bold">
            BALANCE: {dodgecoinBalance.formatted} DODGECOIN
          </Text>
        )}
      </Box>
    </Container>
  );
};
