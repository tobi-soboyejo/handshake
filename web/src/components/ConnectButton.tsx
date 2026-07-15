import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { monadTestnet } from "wagmi/chains";

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function ConnectButton() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  if (isConnected && address) {
    if (chainId !== monadTestnet.id) {
      return (
        <button
          className="connect-btn wrong-network"
          onClick={() => switchChain({ chainId: monadTestnet.id })}
        >
          Switch to Monad Testnet
        </button>
      );
    }
    return (
      <button
        className="connect-btn connected"
        title="Disconnect"
        onClick={() => disconnect()}
      >
        {shortAddress(address)}
      </button>
    );
  }

  // Closing the wallet popup isn't an error — stay quiet about it.
  const rejected =
    error &&
    /rejected|denied|cancell?ed/i.test(error.message);

  const injectedConnector = connectors[0];
  return (
    <div>
      <button
        className="connect-btn"
        disabled={isPending || !injectedConnector}
        onClick={() => injectedConnector && connect({ connector: injectedConnector })}
      >
        {isPending ? "Connecting…" : "Connect Wallet"}
      </button>
      {error && !rejected && (
        <span className="connect-error">
          Couldn't connect — {error.message.split("\n")[0].split(".")[0].toLowerCase()}.
        </span>
      )}
      {!injectedConnector && (
        <span className="connect-error">No wallet extension found.</span>
      )}
    </div>
  );
}
