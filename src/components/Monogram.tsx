/**
 * Custom inline SVG monogram for Jack Cooper.
 * A "J" and "C" fused: a vertical stem (J) with a hooked foot, wrapped by an
 * open arc (C). Geometric, monochrome, uses currentColor so it inverts with theme.
 */
export function Monogram({
  size = 28,
  className,
  title = "Jack Cooper",
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      {/* C arc — open on the right */}
      <path
        d="M25 7.5a11 11 0 1 0 0 17"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* J stem */}
      <path
        d="M19 6.5v12.5a5 5 0 0 1-8.2 3.9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* accent tittle */}
      <circle cx="19" cy="6.5" r="1.7" fill="var(--accent)" />
    </svg>
  );
}
