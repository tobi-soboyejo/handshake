import { http, createConfig } from "wagmi";
import { monadTestnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const HANDSHAKE_ADDRESS = "0xbefa778FDb69FCD1F851801a5D5e8b8191C7929c" as const;

export const BOARD_ADDRESS = "0x11a0969953cEc24cBfF36CCa94B0dBD9Da7e6827" as const;

export const EXPLORER_URL = "https://testnet.monadvision.com";

export const wagmiConfig = createConfig({
  chains: [monadTestnet],
  connectors: [injected()],
  transports: {
    [monadTestnet.id]: http("https://testnet-rpc.monad.xyz"),
  },
});
