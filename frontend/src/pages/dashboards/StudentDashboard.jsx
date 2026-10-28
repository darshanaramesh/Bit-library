import { Link } from 'react-router-dom';
import Icon from '../../components/ui/Icon';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import { Card, CardHeader, StatCard } from '../../components/ui/Card';
import BarChart from '../../components/dashboard/BarChart';
import { dashboards, recentBookings, recentResources } from '../../data/dashboard';

export default function StudentDashboard() {
  const data = dashboards.student;

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

      <div className="dash-grid-sidebar">
        <div className="stack">
          <Card>
            <CardHeader
              title="Recent bookings"
              sub="Your latest seat reservations"
              action={
                <Link to="/bookings" className="btn btn-ghost btn-sm">
                  View all <Icon name="chevronRight" size={15} />
                </Link>
              }
            />
            <DataTable
              columns={[
                {
                  key: 'seat',
                  label: 'Seat',
                  render: (row) => <span className="strong">{row.seat}</span>,
                },
                { key: 'floor', label: 'Floor' },
                { key: 'date', label: 'Date' },
                { key: 'slot', label: 'Time slot' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (row) => <Badge>{row.status}</Badge>,
                },
              ]}
              rows={recentBookings}
            />
          </Card>

          <Card>
            <BarChart {...data.chart} />
          </Card>
        </div>

        <div className="stack">
          <Card>
            <CardHeader title="Announcements" sub="From the Central Library" />
            {data.announcements.map((a) => (
              <div className="announcement" key={a.title}>
                <span className="icon-tile">
                  <Icon name="bell" size={17} />
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
            <CardHeader
              title="Recommended resources"
              action={
                <Link to="/resources" className="btn btn-ghost btn-sm">
                  Browse
                </Link>
              }
            />
            <div className="list">
              {recentResources.map((r) => (
                <Link to={`/resources/${r.id}`} className="list-item" key={r.id}>
                  <span className="main">
                    <span className="icon-tile">
                      <Icon name="book" size={17} />
                    </span>
                    <span>
                      <span className="title">{r.title}</span>
                      <span className="sub">
                        {r.category} · {r.year}
                      </span>
                    </span>
                  </span>
                  <span className="side">
                    <Badge tone={r.access === 'Open Access' ? 'success' : 'warning'} plain>
                      {r.access === 'Open Access' ? 'Open' : 'Restricted'}
                    </Badge>
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