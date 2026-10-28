import { Link } from 'react-router-dom';
import Icon from '../../components/ui/Icon';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import { Card, CardHeader, StatCard } from '../../components/ui/Card';
import BarChart from '../../components/dashboard/BarChart';
import { dashboards, recentBookings, recentResources } from '../../data/dashboard';
import { userRows } from '../../data/users';

const accessRequests = [
  { id: 'REQ-4821', user: 'Ishita Verma', item: 'Database System Concepts (Restricted)', role: 'Student', status: 'Pending' },
  { id: 'REQ-4818', user: 'Kabir Nair', item: 'Journal of Computer Science & Technology', role: 'Student', status: 'Pending' },
  { id: 'REQ-4815', user: 'Rohan Das', item: 'Seat Allocation Research Paper', role: 'Student', status: 'Approved' },
  { id: 'REQ-4811', user: 'Sana Fathima', item: 'DBMS Question Papers pack', role: 'Student', status: 'Approved' },
  { id: 'REQ-4809', user: 'Aarav Sharma', item: 'Operating System Concepts (Restricted)', role: 'Student', status: 'Pending' },
];

export default function FacultyDashboard() {
  const data = dashboards.faculty;

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
              title="Access requests from students"
              sub="Approve or decline restricted-resource requests"
              action={
                <Link to="/access-control" className="btn btn-ghost btn-sm">
                  Open matrix <Icon name="chevronRight" size={15} />
                </Link>
              }
            />
            <DataTable
              columns={[
                { key: 'id', label: 'Request' },
                { key: 'user', label: 'Student', render: (r) => <span className="strong">{r.user}</span> },
                { key: 'item', label: 'Resource', wrap: true },
                { key: 'role', label: 'Role' },
                { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
                {
                  key: 'action',
                  label: '',
                  render: () => (
                    <span className="table-actions">
                      <button type="button" className="icon-btn" aria-label="Approve request">
                        <Icon name="check" size={16} />
                      </button>
                      <button type="button" className="icon-btn" aria-label="Decline request">
                        <Icon name="x" size={16} />
                      </button>
                    </span>
                  ),
                },
              ]}
              rows={accessRequests}
            />
          </Card>

          <Card>
            <BarChart {...data.chart} />
          </Card>

          <Card>
            <CardHeader
              title="My seat bookings"
              action={
                <Link to="/bookings" className="btn btn-ghost btn-sm">
                  View all
                </Link>
              }
            />
            <DataTable
              columns={[
                { key: 'seat', label: 'Seat' },
                { key: 'floor', label: 'Floor' },
                { key: 'date', label: 'Date' },
                { key: 'slot', label: 'Time slot' },
                { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
              ]}
              rows={recentBookings.slice(0, 3)}
            />
          </Card>
        </div>

        <div className="stack">
          <Card>
            <CardHeader title="Department materials" sub="Recently published to students" />
            <div className="list">
              {recentResources.map((r) => (
                <Link to={`/resources/${r.id}`} className="list-item" key={r.id}>
                  <span className="main">
                    <span className="icon-tile">
                      <Icon name="file" size={17} />
                    </span>
                    <span>
                      <span className="title">{r.title}</span>
                      <span className="sub">
                        {r.category} · {r.downloads.toLocaleString('en-IN')} downloads
                      </span>
                    </span>
                  </span>
                  <span className="side">
                    <Icon name="chevronRight" size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Announcements" />
            {data.announcements.map((a) => (
              <div className="announcement" key={a.title}>
                <span className="icon-tile">
                  <Icon name="bell" size={17} />
                </span>
                <div>
                  <h5>{a.title}</h5>
                  <p>{a.body}</p>
                  <span className="when">{a.when}</span>
                </div>
              </div>
            ))}
          </Card>

          <Card>
            <CardHeader title="Students in your department" sub="Sample directory entries" />
            <div className="list">
              {userRows.slice(0, 4).map((u) => (
                <div className="list-item" key={u.id}>
                  <span className="main">
                    <span className="icon-tile neutral">
                      <Icon name="user" size={16} />
                    </span>
                    <span>
                      <span className="title">{u.name}</span>
                      <span className="sub">{u.id}</span>
                    </span>
                  </span>
                  <span className="side">
                    <Badge>{u.status}</Badge>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}