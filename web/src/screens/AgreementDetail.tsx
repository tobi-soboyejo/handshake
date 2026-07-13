import { useParams } from "react-router-dom";

export function AgreementDetail() {
  const { id } = useParams();
  return (
    <section>
      <h1>Agreement #{id}</h1>
      <p className="wip">Detail & co-sign screen ships next (Day 3 of build).</p>
    </section>
  );
}
