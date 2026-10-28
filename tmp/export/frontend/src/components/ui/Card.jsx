import Icon from './Icon';

/** Card – surface container, optionally with header actions. */
export function Card({ children, className = '', pad = true, ...rest }) {
  return (
    <div className={`card ${pad ? '' : 'pad-0'} ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ title, sub, action }) {
  return (
    <div className="card-header">
      <div>
        <h3 className="card-title">{title}</h3>
        {sub ? <p className="card-sub">{sub}</p> : null}
      </div>
      {action ? <div className="card-actions">{action}</div> : null}
    </div>
  );
}

/** StatCard – KPI tile used across dashboards. */
export function StatCard({ label, value, icon = 'chart', tone = '', trend, trendDown = false }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon name={icon} size={22} />
      </div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {trend ? (
          <div className={`stat-trend ${trendDown ? 'down' : ''}`}>{trend}</div>
        ) : null}
      </div>
    </div>
  );
}

/** EmptyState – placeholder when a list has no rows. */
export function EmptyState({ icon = 'search', title, text }) {
  return (
    <div className="empty-state">
      <div className="icon-tile">
        <Icon name={icon} size={24} />
      </div>
      <b>{title}</b>
      <p className="small mt-8">{text}</p>
    </div>
  );
}