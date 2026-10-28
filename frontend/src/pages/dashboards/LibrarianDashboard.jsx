import { Link } from 'react-router-dom';
import Icon from '../../components/ui/Icon';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import { Card, CardHeader, StatCard } from '../../components/ui/Card';
import BarChart from '../../components/dashboard/BarChart';
import Breakdown from '../../components/dashboard/Breakdown';
import { dashboards } from '../../data/dashboard';
import { resourceStats } from '../../data/resources';

export default function LibrarianDashboard() {
  const data = dashboards.librarian;

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
          <CardHeader
            title="Floor occupancy"
            sub="Booked seats vs capacity for tomorrow"
            action={
              <Link to="/manage/seats" className="btn btn-ghost btn-sm">
                Manage seats
              </Link>
            }
          />
          <Breakdown rows={data.occupancy} />
        </Card>

        <Card>
          <BarChart {...data.chart} />
        </Card>
      </div>

      <div className="dash-grid-sidebar">
        <div className="stack">
          <Card>
            <CardHeader
              title="Latest reservations"
              sub="Today’s booking activity across floors"
              action={
                <Link to="/manage/reservations" className="btn btn-ghost btn-sm">
                  Manage all <Icon name="chevronRight" size={15} />
                </Link>
              }
            />
            <DataTable
              columns={[
                { key: 'id', label: 'Reservation' },
                { key: 'user', label: 'Member', render: (r) => <span className="strong">{r.user}</span> },
                { key: 'floor', label: 'Floor' },
                { key: 'seat', label: 'Seat' },
                { key: 'slot', label: 'Slot' },
                { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
                { key: 'checkedIn', label: 'Check-in', render: (r) => <Badge plain>{r.checkedIn}</Badge> },
              ]}
              rows={data.reservations}
            />
          </Card>

          <Card>
            <CardHeader title="Pending approvals" sub="Resource uploads & access requests" />
            <div className="list">
              {[
                { title: 'Research Methodology Handbook', sub: 'Uploaded by Publication Committee', tag: 'Processing' },
                { title: 'Restricted access · Journal Vol. 38', sub: 'Requested by Dr. Meera Iyer', tag: 'Pending' },
                { title: 'Question Papers · Semester V', sub: 'Uploaded by Board of Studies', tag: 'Pending' },
                { title: 'Fourth Floor seat block C', sub: 'Maintenance report · 4 seats disabled', tag: 'Maintenance' },
              ].map((item) => (
                <div className="list-item" key={item.title}>
                  <span className="main">
                    <span className="icon-tile">
                      <Icon name="clipboard" size={17} />
                    </span>
                    <span>
                      <span className="title">{item.title}</span>
                      <span className="sub">{item.sub}</span>
                    </span>
                  </span>
                  <span className="side">
                    <Badge>{item.tag}</Badge>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="stack">
          <Card>
            <CardHeader title="Catalogue at a glance" />
            <div className="mini-stats">
              {resourceStats.map((s) => (
                <div className="mini-stat" key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <Link to="/manage/resources" className="btn btn-outline btn-block btn-sm">
                Open resource management
              </Link>
            </div>
          </Card>

          <Card>
            <CardHeader title="Notices" />
            {data.announcements.map((a) => (
              <div className="announcement" key={a.title}>
                <span className="icon-tile">
                  <Icon name="alert" size={17} />
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
        </div>
      </div>
    </>
  );
}