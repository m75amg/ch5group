import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-8 border-b border-border",
        className,
      )}
    >
      <div>
        {eyebrow ? (
          <p className="text-eyebrow uppercase tracking-[0.08em] text-brand-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-h2 text-foreground tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-2 text-body-sm text-foreground-muted max-w-2xl">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex gap-2">{actions}</div> : null}
    </header>
  );
}
