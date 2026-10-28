import { Link } from 'react-router-dom';
import Icon from '../../components/ui/Icon';
import Badge from '../../components/ui/Badge';
import { Card, CardHeader, StatCard } from '../../components/ui/Card';
import BarChart from '../../components/dashboard/BarChart';
import Breakdown from '../../components/dashboard/Breakdown';
import { dashboards } from '../../data/dashboard';

export default function AdminDashboard() {
  const data = dashboards.admin;

  return (
    <>
      <div className="greeting">
        <h1>{data.greeting}</h1>
        <p>{data.subtitle}</p>
      </div>

      <div className="stats-grid">
        {data.stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="quick-actions">
        {data.quickActions.map((a) => (
          <Link className="quick-action" to={a.to} key={a.label}>
            <span className="icon-tile">
              <Icon name={a.icon} size={19} />
            </span>
            <b>{a.label}</b>
            <span>{a.hint}</span>
          </Link>
        ))}
      </div>

      <div className="dash-grid-2 mb-24">
        <Card>
          <BarChart {...data.chart} />
        </Card>

        <Card>
          <CardHeader title="Membership by role" sub="Active accounts on the portal" />
          <Breakdown rows={data.roleSplit} />
          <div className="card-footer flex between items-center gap-12 wrap">
            <span className="small muted">Total: 4,820 accounts</span>
            <Link to="/manage/users" className="btn btn-outline btn-sm">
              Manage users
            </Link>
          </div>
        </Card>
      </div>

      <div className="dash-grid-sidebar">
        <div className="stack">
          <Card>
            <CardHeader
              title="Recent system activity"
              sub="Audit feed from across the portal"
              action={
                <Link to="/access-control" className="btn btn-ghost btn-sm">
                  Access control <Icon name="chevronRight" size={15} />
                </Link>
              }
            />
            <div className="feed">
              {data.activity.map((a) => (
                <div className="feed-item" key={a.text}>
                  <span className="feed-dot">
                    <Icon name={a.icon} size={15} />
                  </span>
                  <div className="feed-body">
                    <span dangerouslySetInnerHTML={{ __html: a.text }} />
                    <span className="feed-time">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Service health" sub="Mock uptime for portal components" />
            <div className="breakdown">
              {[
                { label: 'Reservation API', percent: 100, value: 'Operational' },
                { label: 'Catalogue search', percent: 99, value: 'Operational' },
                { label: 'Document viewer', percent: 96, value: 'Degraded' },
                { label: 'Assistant (demo)', percent: 100, value: 'Operational' },
              ].map((r) => (
                <div className="breakdown-row" key={r.label}>
                  <div className="breakdown-head">
                    <b>{r.label}</b>
                    <span className={r.percent < 100 ? 'text-warning' : 'text-success'}>
                      {r.value}
                    </span>
                  </div>
                  <div className="progress">
                    <div className="progress-fill" style={{ width: `${r.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="stack">
          <Card>
            <CardHeader title="Notices" />
            {data.announcements.map((a) => (
              <div className="announcement" key={a.title}>
                <span className="icon-tile">
                  <Icon name="shield" size={17} />
                </span>
                <div>
                  <div className="mb-4">
                    <Badge tone="primary" plain>
                      {a.tag}
                    </Badge>
                  </div>
                  <h5>{a.title}</h5>
                  <p>{a.body}</p>
                  <span className="when">{a.when}</span>
                </div>
              </div>
            ))}
          </Card>

          <Card>
            <CardHeader title="Administration shortcuts" />
            <div className="list">
              {[
                { label: 'Role & permission matrix', to: '/access-control', icon: 'shield' },
                { label: 'Reservation policies', to: '/settings', icon: 'settings' },
                { label: 'Seat inventory', to: '/manage/seats', icon: 'seat' },
                { label: 'Audit & exports', to: '/manage/reservations', icon: 'clipboard' },
              ].map((l) => (
                <Link className="list-item" to={l.to} key={l.label}>
                  <span className="main">
                    <span className="icon-tile">
                      <Icon name={l.icon} size={17} />
                    </span>
                    <span>
                      <span className="title">{l.label}</span>
                    </span>
                  </span>
                  <span className="side">
                    <Icon name="chevronRight" size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}