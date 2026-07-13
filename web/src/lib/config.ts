import { http, createConfig } from "wagmi";
import { monadTestnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const HANDSHAKE_ADDRESS = "0xe5d9E4e899D0F04987de2E8f37e8FF7E9A2d2411" as const;

export const EXPLORER_URL = "https://testnet.monadvision.com";

export const wagmiConfig = createConfig({
  chains: [monadTestnet],
  connectors: [injected()],
  transports: {
    [monadTestnet.id]: http("https://testnet-rpc.monad.xyz"),
  },
});
