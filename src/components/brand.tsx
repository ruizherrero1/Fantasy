import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Fantasy Stratos">
      <span className="brand-mark"><i /><i /><i /></span>
      {!compact && <span>FANTASY <strong>STRATOS</strong></span>}
    </Link>
  );
}
