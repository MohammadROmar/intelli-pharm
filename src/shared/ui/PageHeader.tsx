import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  pageTitle?: string;
  children?: ReactNode;
};

export function PageHeader({ title, pageTitle, children }: PageHeaderProps) {
  return (
    <>
      {pageTitle && <title>{pageTitle}</title>}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {children}
      </div>
    </>
  );
}
