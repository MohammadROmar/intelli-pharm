type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export function PageTitle({ title, subtitle }: PageTitleProps) {
  const pageTitle = `${title} - IntelliPharma`;

  return (
    <>
      <title>{pageTitle}</title>

      <div className="space-y-1">
        <h1 className="text-3xl leading-tight font-bold tracking-tight md:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>
    </>
  );
}
