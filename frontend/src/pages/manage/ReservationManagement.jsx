import { useMemo, useState } from 'react';
import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Tabs from '../../components/ui/Tabs';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/ui/DataTable';
import Alert from '../../components/ui/Alert';
import { Card, CardHeader } from '../../components/ui/Card';
import { SearchBar, Select } from '../../components/ui/Form';
import { reservationRows } from '../../data/bookings';
import { timeSlots } from '../../data/seats';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'Confirmed', label: 'Confirmed' },
  { id: 'Pending', label: 'Pending' },
  { id: 'Completed', label: 'Completed' },
  { id: 'Cancelled', label: 'Cancelled' },
];

export default function ReservationManagement() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [detail, setDetail] = useState(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reservationRows.filter((r) => {
      const matchStatus = status === 'all' || r.status === status;
      const matchQuery =
        !q ||
        r.user.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.seat.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [query, status]);

  const counts = {
    all: reservationRows.length,
    Confirmed: reservationRows.filter((r) => r.status === 'Confirmed').length,
    Pending: reservationRows.filter((r) => r.status === 'Pending').length,
    Completed: reservationRows.filter((r) => r.status === 'Completed').length,
    Cancelled: reservationRows.filter((r) => r.status === 'Cancelled').length,
  };

  return (
    <>
      <PageHeader
        title="Reservation Management"
        sub="Approve, check in and audit seat reservations across every floor and time slot."
        actions={
          <>
            <Button variant="outline" icon="download">
              Export report
            </Button>
            <Button variant="primary" icon="plus">
              Walk-in booking
            </Button>
          </>
        }
      />

      <div className="strip-grid">
        {[
          { b: '148', s: 'Reservations today' },
          { b: '6', s: 'Awaiting approval' },
          { b: '92', s: 'Checked in' },
          { b: '76%', s: 'Occupancy rate' },
        ].map((x) => (
          <div className="mini-stat" key={x.s}>
            <b>{x.b}</b>
            <span>{x.s}</span>
          </div>
        ))}
      </div>

      <div className="mb-16">
        <Alert tone="warning" title="Overlapping bookings are blocked at source">
          Two reservations for the same member and slot cannot coexist — the validation itself is
          implemented in a later backend phase; this screen only displays outcomes.
        </Alert>
      </div>

      <div className="toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search member, ID or seat…"
          ariaLabel="Search reservations"
        />
        <div className="flex gap-8 items-center">
          <Select
            className="select-auto"
            defaultValue="all"
            aria-label="Filter by floor"
          >
            <option value="all">All floors</option>
            <option>Ground Floor</option>
            <option>First Floor</option>
            <option>Second Floor</option>
            <option>Third Floor</option>
            <option>Fourth Floor</option>
          </Select>
          <Select
            className="select-auto"
            defaultValue="all"
            aria-label="Filter by slot"
          >
            <option value="all">All slots</option>
            {timeSlots.map((s) => (
              <option key={s.id}>{s.label}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mb-16">
        <Tabs
          items={tabs.map((t) => ({ ...t, count: counts[t.id] }))}
          active={status}
          onChange={setStatus}
        />
      </div>

      <DataTable
        columns={[
          { key: 'id', label: 'Reservation' },
          {
            key: 'user',
            label: 'Member',
            render: (r) => (
              <div className="cell-user">
                <span className="avatar sm">{r.user.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                <span>
                  <b>{r.user}</b>
                  <span>{r.userId}</span>
                </span>
              </div>
            ),
          },
          { key: 'floor', label: 'Floor' },
          { key: 'seat', label: 'Seat' },                  { key: 'date', label: 'Date' },
                  { key: 'slot', label: 'Slot' },
          { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
          { key: 'checkedIn', label: 'Check-in', render: (r) => <Badge plain>{r.checkedIn}</Badge> },
          {
            key: 'actions',
            label: '',
            render: (r) => (
              <span className="table-actions">
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={`View ${r.id}`}
                  onClick={() => setDetail(r)}
                >
                  <Icon name="eye" size={16} />
                </button>
                <button type="button" className="icon-btn" aria-label={`Approve ${r.id}`}>
                  <Icon name="check" size={16} />
                </button>
                <button type="button" className="icon-btn" aria-label={`Cancel ${r.id}`}>
                  <Icon name="x" size={16} />
                </button>
              </span>
            ),
          },
        ]}
        rows={rows}
        emptyTitle="No reservations found"
        emptyText="Change the filters to see other bookings."
      />

      <p className="small dim mt-16">
        Showing {rows.length} of {reservationRows.length} sample reservations.
      </p>

      <div className="dash-grid-2 mt-24">
        <Card>
          <CardHeader title="Slot utilisation" sub="Reservations per slot for tomorrow" />
          <div className="breakdown">
            {[
              { label: '08:45 AM – 10:25 AM', percent: 84, value: '42 / 50' },
              { label: '10:40 AM – 12:20 PM', percent: 96, value: '48 / 50' },
              { label: '01:30 PM – 03:10 PM', percent: 72, value: '36 / 50' },
              { label: '03:25 PM – 04:25 PM', percent: 54, value: '27 / 50' },
            ].map((r) => (
              <div className="breakdown-row" key={r.label}>
                <div className="breakdown-head">
                  <b>{r.label}</b>
                  <span>{r.value}</span>
                </div>
                <div className="progress">
                  <div className="progress-fill" style={{ width: `${r.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Attention required" sub="Cases for staff review" />
          <div className="list">
            {[
              { title: '6 pending approvals', sub: 'Oldest request waiting 4 hours', tag: 'Pending' },
              { title: '2 repeated no-shows', sub: 'Members at daily booking limit', tag: 'Warning' },
              { title: 'Second Floor fully booked', sub: 'Redirect walk-ins to Fourth Floor', tag: 'Busy' },
            ].map((i) => (
              <div className="list-item" key={i.title}>
                <span className="main">
                  <span className="icon-tile warning">
                    <Icon name="alert" size={16} />
                  </span>
                  <span>
                    <span className="title">{i.title}</span>
                    <span className="sub">{i.sub}</span>
                  </span>
                </span>
                <Badge>{i.tag}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal
        open={Boolean(detail)}
        title={detail ? `Reservation ${detail.id}` : ''}
        sub={detail ? `${detail.user} · ${detail.date}` : ''}
        onClose={() => setDetail(null)}
        footer={
          <>
            <Button variant="outline" onClick={() => setDetail(null)}>
              Close
            </Button>
            <Button variant="danger" icon="x">
              Cancel booking
            </Button>
            <Button variant="success" icon="check">
              Approve
            </Button>
          </>
        }
      >
        {detail ? (
          <div className="kv-list">
            <div className="kv-row">
              <span className="k">Member</span>
              <span className="v">{detail.user}</span>
            </div>
            <div className="kv-row">
              <span className="k">Campus ID</span>
              <span className="v">{detail.userId}</span>
            </div>
            <div className="kv-row">
              <span className="k">Seat</span>
              <span className="v">
                {detail.seat} · {detail.zone}
              </span>
            </div>
            <div className="kv-row">
              <span className="k">Floor</span>
              <span className="v">{detail.floor}</span>
            </div>
            <div className="kv-row">
              <span className="k">Slot</span>
              <span className="v">
                {detail.slot} on {detail.date}
              </span>
            </div>
            <div className="kv-row">
              <span className="k">Status</span>
              <span className="v">
                <Badge>{detail.status}</Badge>
              </span>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}