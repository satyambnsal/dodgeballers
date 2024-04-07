"use client";
import React from "react";

import { sepolia, mainnet, Chain } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  jsonRpcProvider,
  useInjectedConnectors,
  voyager,
} from "@starknet-react/core";

function rpc(chain: Chain) {
  return {
    nodeUrl:
      process.env.NEXT_PUBLIC_RPC_PROVIDER ||
      `https://starknet-${chain.network}.public.blastapi.io/rpc/v0_7`,
  };
}
const provider = jsonRpcProvider({ rpc });


export const StarknetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "alphabetical",
  });

  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={provider}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
};
