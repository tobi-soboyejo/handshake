import { Link } from "react-router-dom";
import { formatCad } from "../lib/agreements";
import { useAllAgreements } from "../hooks/useAllAgreements";
import { EXPLORER_URL, HANDSHAKE_ADDRESS } from "../lib/config";

export function Home() {
  const { data: all } = useAllAgreements();

  const stats = (() => {
    if (!all) return null;
    let volume = 0n;
    const wallets = new Set<string>();
    for (const a of all) {
      if (a.cosignedAt > 0n) volume += a.amountCents;
      wallets.add(a.freelancer.toLowerCase());
      wallets.add(a.client.toLowerCase());
    }
    return { count: all.length, volume, wallets: wallets.size };
  })();

  return (
    <section className="hero">
      <span className="hero-kicker">Onchain payment reputation · Monad testnet</span>
      <h1>The credit check for gig work.</h1>
      <p className="tagline">
        Freelancers and clients co-sign the deal before work starts. The
        outcome — paid, defaulted, disputed, or silence — becomes permanent,
        public history nobody can edit or delete. Check anyone before you
        take the job or send the money.
      </p>

      <div className="hero-ctas">
        <Link to="/lookup" className="connect-btn">
          Look up a wallet
        </Link>
        <Link to="/new" className="btn-secondary">
          Propose an agreement
        </Link>
      </div>

      {stats && (
        <div className="stat-strip">
          <div className="stat-cell">
            <span className="stat-num">{stats.count}</span>
            <span className="stat-label">agreements onchain</span>
          </div>
          <div className="stat-cell">
            <span className="stat-num">{formatCad(stats.volume)}</span>
            <span className="stat-label">co-signed volume</span>
          </div>
          <div className="stat-cell">
            <span className="stat-num">{stats.wallets}</span>
            <span className="stat-label">wallets on record</span>
          </div>
        </div>
      )}

      <div className="steps">
        <div className="step">
          <span className="step-no">01</span>
          <strong>Shake on it, onchain</strong>
          <p>
            Both parties sign the amount, deadline, and scope. Nobody appears
            in the registry without their own signature.
          </p>
        </div>
        <div className="step">
          <span className="step-no">02</span>
          <strong>The outcome goes on record</strong>
          <p>
            Paid builds good history. A default flag starts a 14-day dispute
            window. Silence is recorded too.
          </p>
        </div>
        <div className="step">
          <span className="step-no">03</span>
          <strong>Anyone can check</strong>
          <p>
            A Handshake Score with the arithmetic shown — computed from public
            state, same formula for everyone.
          </p>
        </div>
      </div>

      <p className="registry-stats" style={{ marginTop: "2.5rem" }}>
        Every number on this site is read live from{" "}
        <a
          href={`${EXPLORER_URL}/address/${HANDSHAKE_ADDRESS}`}
          target="_blank"
          rel="noreferrer"
        >
          the registry contract
        </a>{" "}
        — nothing is stored anywhere else.
      </p>
    </section>
  );
}
