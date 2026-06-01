export default function PageHeader({
  module,
  title,
  description,
}: {
  module?: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <header className="mb-8">
      {module && (
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
          {module}
        </p>
      )}
      <h1 className="font-display text-4xl lg:text-5xl text-foreground leading-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-muted-foreground text-sm lg:text-base">
          {description}
        </p>
      )}
    </header>
  );
}