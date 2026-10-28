/** PageHeader – consistent title / subtitle / actions block. */
export default function PageHeader({ title, sub, actions }) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-title">{title}</h1>
        {sub ? <p className="page-sub">{sub}</p> : null}
      </div>
      {actions ? <div className="flex gap-8 wrap">{actions}</div> : null}
    </div>
  );
}