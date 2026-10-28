/** BarChart – lightweight CSS bar chart used on dashboards (mock data). */
export default function BarChart({ title, unit = '', bars = [], gold = false, action }) {
  const max = Math.max(...bars.map((b) => b.value), 1);

  return (
    <div>
      <div className="card-header">
        <div>
          <h3 className="card-title">{title}</h3>
          <p className="card-sub">Sample data for the UI prototype</p>
        </div>
        {action}
      </div>

      <div className="bar-chart">
        {bars.map((b) => (
          <div className="bar-col" key={b.label}>
            <span className="bar-value">
              {b.value}
              {unit}
            </span>
            <div className="bar-track">
              <span
                className={`bar-fill ${gold ? 'gold' : ''}`}
                style={{ height: `${Math.max(5, (b.value / max) * 100)}%` }}
              />
            </div>
            <span className="bar-label">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
