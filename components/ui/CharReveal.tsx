type CharRevealProps = {
  text: string;
  baseDelay?: number;
  stagger?: number;
  className?: string;
};

export function CharReveal({ text, baseDelay = 0.8, stagger = 0.05, className }: CharRevealProps) {
  const words = text.split(" ");
  return (
    <span aria-label={text} className={className}>
      <span aria-hidden>
        {words.map((word, wi) => {
          const wordOffset = words.slice(0, wi).reduce((acc, w) => acc + w.length + 1, 0);
          return (
            <span key={wi}>
              {wi > 0 ? " " : null}
              <span className="inline-block whitespace-nowrap">
                {word.split("").map((ch, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden align-bottom pt-[0.05em] pb-[0.2em] -my-[0.2em]"
                  >
                    <span
                      className="block animate-char-reveal"
                      style={{
                        animationDelay: `${(baseDelay + (wordOffset + i) * (stagger ?? 0.05)).toFixed(2)}s`,
                      }}
                    >
                      {ch}
                    </span>
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}