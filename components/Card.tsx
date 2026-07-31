type Props = {
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
};

export function Card({ eyebrow, title, description, tags, href }: Props) {
  return (
    <article className="flex flex-col gap-c3 bg-surface border border-border-base rounded-lg p-c5 shadow-sm transition-[box-shadow,transform,border-color] duration-[260ms] ease-[var(--ease-campfire)] hover:shadow-md hover:-translate-y-[3px] hover:border-accent">
      <span className="font-mono text-xs font-medium tracking-[var(--tracking-label)] uppercase text-accent-alt">
        {eyebrow}
      </span>
      <h3 className="font-display text-lg leading-[var(--leading-snug)]">{title}</h3>
      <p className="text-base leading-[var(--leading-body)] text-text-secondary text-pretty">{description}</p>
      <div className="flex gap-c2 flex-wrap font-mono text-sm text-text-muted">
        {tags.map((tag, i) => (
          <span key={tag}>
            {i > 0 && <span className="mr-c2">·</span>}
            {tag}
          </span>
        ))}
      </div>
      <a href={href} className="text-base font-medium mt-c1">
        Zobacz repozytorium →
      </a>
    </article>
  );
}
