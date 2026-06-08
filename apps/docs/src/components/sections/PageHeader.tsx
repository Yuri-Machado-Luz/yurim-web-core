interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  className = "",
  children,
}: PageHeaderProps) {
  return (
    <section className={`container pt-32 pb-16 ${className}`.trim()}>
      <div className="flex flex-col gap-8">
        <div>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="page-title mb-4">{title}</h1>
          {lead && <p className="page-lead">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
