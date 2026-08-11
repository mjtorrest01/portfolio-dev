type CharRevealProps = {
  text: string;
  baseDelay?: number;
  stagger?: number;
  className?: string;
};

export function CharReveal({ text, baseDelay = 0.8, stagger = 0.05, className }: CharRevealProps) {
  return (
    <span aria-label={text} className={className}>
      <span aria-hidden>
        {text.split("").map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pt-[0.05em] pb-[0.2em] -my-[0.2em]">
            <span
              className="block animate-char-reveal"
              style={{ animationDelay: `${(baseDelay + i * (stagger ?? 0.05)).toFixed(2)}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}