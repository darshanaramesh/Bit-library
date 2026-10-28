import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Tabs from '../components/ui/Tabs';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import { Card, CardHeader, EmptyState } from '../components/ui/Card';
import { myBookings } from '../data/bookings';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

export default function MyBookings() {
  const [tab, setTab] = useState('all');
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  const rows = useMemo(() => {
    if (tab === 'upcoming') return myBookings.filter((b) => ['Confirmed', 'Pending'].includes(b.status));
    if (tab === 'completed') return myBookings.filter((b) => b.status === 'Completed');
    if (tab === 'cancelled') return myBookings.filter((b) => b.status === 'Cancelled');
    return myBookings;
  }, [tab]);

  const counts = {
    all: myBookings.length,
    upcoming: myBookings.filter((b) => ['Confirmed', 'Pending'].includes(b.status)).length,
    completed: myBookings.filter((b) => b.status === 'Completed').length,
    cancelled: myBookings.filter((b) => b.status === 'Cancelled').length,
  };

  const confirmCancel = () => {
    setCancelTarget(null);
    setCancelled(true);
    window.setTimeout(() => setCancelled(false), 4500);
  };

  return (
    <>
      <PageHeader
        title="My Bookings"
        sub="Every seat reservation linked to your library account. Seats can be reserved only for tomorrow."
        actions={
          <Link to="/reserve" className="btn btn-primary">
            <Icon name="plus" size={16} />
            New reservation
          </Link>
        }
      />

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="calendar" size={22} />
          </div>
          <div className="stat-body">
            <div className="stat-value">{counts.upcoming}</div>
            <div className="stat-label">Upcoming bookings</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <Icon name="check" size={22} />
          </div>
          <div className="stat-body">
            <div className="stat-value">{counts.completed}</div>
            <div className="stat-label">Completed sessions</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <Icon name="x" size={22} />
          </div>
          <div className="stat-body">
            <div className="stat-value">{counts.cancelled}</div>
            <div className="stat-label">Cancelled</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info">
            <Icon name="clock" size={22} />
          </div>
          <div className="stat-body">
            <div className="stat-value">4 h</div>
            <div className="stat-label">Booked this week</div>
          </div>
        </div>
      </div>

      {cancelled ? (
        <div className="mb-16">
          <div className="alert alert-success">
            <Icon name="circleCheck" size={18} />
            <div>
              <div className="alert-title">Booking cancelled (demo)</div>
              <div>The seat has been released in this UI preview. No data was changed.</div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex between items-center wrap gap-12 mb-16">
        <Tabs
          items={filters.map((f) => ({ ...f, count: counts[f.id] }))}
          active={tab}
          onChange={setTab}
        />
        <span className="small muted">
          Showing {rows.length} booking{rows.length === 1 ? '' : 's'}
        </span>
      </div>

      {rows.length === 0 ? (
        <Card>
          <EmptyState
            icon="calendar"
            title="No bookings in this view"
            text="Reserve a seat for tomorrow and it will appear here."
          />
        </Card>
      ) : (
        <DataTable
          columns={[
            {
              key: 'id',
              label: 'Booking',
              render: (r) => (
                <div className="booking-detail">
                  <span className="icon-tile">
                    <Icon name="seat" size={17} />
                  </span>
                  <span>
                    <b>{r.seat}</b>
                    <span>
                      {r.id} · {r.zone}
                    </span>
                  </span>
                </div>
              ),
            },
            { key: 'floor', label: 'Floor' },
            {
              key: 'date',
              label: 'Date',
              render: (r) => (
                <span>
                  <b className="strong">{r.date}</b>
                  <br />
                  <span className="tiny dim">{r.day}</span>
                </span>
              ),
            },
            { key: 'slot', label: 'Time slot' },
            { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            {
              key: 'actions',
              label: '',
              render: (r) => (
                <span className="table-actions">
                  <button type="button" className="icon-btn" aria-label={`View booking ${r.id}`}>
                    <Icon name="eye" size={16} />
                  </button>
                  {r.status === 'Confirmed' || r.status === 'Pending' ? (
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={`Cancel booking ${r.id}`}
                      onClick={() => setCancelTarget(r)}
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  ) : null}
                </span>
              ),
            },
          ]}
          rows={rows}
          emptyTitle="No bookings here"
          emptyText="Reserve a seat for tomorrow to see it listed."
        />
      )}

      <div className="mt-24">
        <Card>
          <CardHeader title="Cancellation policy" sub="Applies to every reservation" />
          <div className="alert alert-info">
            <Icon name="info" size={18} />
            <div>
              Cancel at least 60 minutes before the slot begins so the seat returns to the pool.
              Repeated no-shows reduce your daily booking allowance.
            </div>
          </div>
        </Card>
      </div>

      <Modal
        open={Boolean(cancelTarget)}
        title="Cancel this booking?"
        sub={cancelTarget ? `${cancelTarget.id} · ${cancelTarget.seat}` : ''}
        onClose={() => setCancelTarget(null)}
        footer={
          <>
            <Button variant="outline" onClick={() => setCancelTarget(null)}>
              Keep booking
            </Button>
            <Button variant="danger" icon="trash" onClick={confirmCancel}>
              Cancel booking
            </Button>
          </>
        }
      >
        <p className="small muted">
          Cancelling releases the seat for other students immediately. This action cannot be undone
          in the demo — you would need to reserve again.
        </p>
        {cancelTarget ? (
          <div className="kv-list mt-16">
            <div className="kv-row">
              <span className="k">Seat</span>
              <span className="v">{cancelTarget.seat}</span>
            </div>
            <div className="kv-row">
              <span className="k">Date</span>
              <span className="v">{cancelTarget.date}</span>
            </div>
            <div className="kv-row">
              <span className="k">Slot</span>
              <span className="v">{cancelTarget.slot}</span>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}