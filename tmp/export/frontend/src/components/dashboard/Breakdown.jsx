/** Breakdown – labelled progress rows (occupancy, role split, …). */
export default function Breakdown({ rows }) {
  return (
    <div className="breakdown">
      {rows.map((r, i) => (
        <div className="breakdown-row" key={r.id || r.label || i}>
          <div className="breakdown-head">
            <b>{r.label}</b>
            <span>{r.value !== undefined ? r.value : `${r.percent}%`}</span>
          </div>
          <div className="progress">
            <div className="progress-fill" style={{ width: `${r.percent}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
