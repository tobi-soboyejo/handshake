import { RegistryStats } from "../components/RegistryStats";

export function NewAgreement() {
  return (
    <section>
      <h1>Propose an agreement</h1>
      <p className="tagline">
        The credit check for gig work: both parties sign the commitment onchain
        before work starts — the outcome becomes permanent, public history.
      </p>
      <p className="wip">Agreement form ships next (Day 3 of build).</p>
      <RegistryStats />
    </section>
  );
}
