/** Tabs – pill style segmented control. */
export default function Tabs({ items, active, onChange, className = '' }) {
  return (
    <div className={`tabs ${className}`} role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={active === item.id}
          className={`tab ${active === item.id ? 'active' : ''}`}
          onClick={() => onChange(item.id)}
        >
          {item.label}
          {item.count !== undefined ? <span className="count">({item.count})</span> : null}
        </button>
      ))}
    </div>
  );
}