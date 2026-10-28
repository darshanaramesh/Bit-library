import { useState } from 'react';
import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/ui/DataTable';
import { Card, CardHeader } from '../../components/ui/Card';
import { Field, Input, Select } from '../../components/ui/Form';
import { floors, zones, seatInventory, floorSummary, timeSlots } from '../../data/seats';

export default function SeatManagement() {
  const [modal, setModal] = useState(false);
  const [viewFloor, setViewFloor] = useState(null);

  return (
    <>
      <PageHeader
        title="Seat Management"
        sub="Inventory of seats across six floors, split into Male Area and Female Area."
        actions={
          <>
            <Button variant="outline" icon="download">
              Export inventory
            </Button>
            <Button variant="primary" icon="plus" onClick={() => setModal(true)}>
              Add seat block
            </Button>
          </>
        }
      />

      <div className="strip-grid">
        {[
          { b: '360', s: 'Total seats' },
          { b: '163', s: 'Available tomorrow' },
          { b: '161', s: 'Booked' },
          { b: '36', s: 'Disabled / maintenance' },
        ].map((x) => (
          <div className="mini-stat" key={x.s}>
            <b>{x.b}</b>
            <span>{x.s}</span>
          </div>
        ))}
      </div>

      {/* Floor overview cards */}
      <div className="floor-grid mb-24">
        {floors.map((f) => {
          const sum = floorSummary(f.id);
          return (
            <div className="floor-card" key={f.id}>
              <div className="floor-head">
                <span className="floor-name">{f.name}</span>
                <span className={`chip ${f.status === 'Open' ? 'primary' : 'gold'}`}>{f.status}</span>
              </div>
              <div className="floor-meta">
                {f.code} · {sum.male.total + sum.female.total} seats · {f.note}
              </div>
              <div className="floor-zones">
                <span className="zone-row male">
                  Male Area
                  <span className="free">
                    {sum.male.available} free · {sum.male.booked} booked · {sum.male.disabled} off
                  </span>
                </span>
                <span className="zone-row female">
                  Female Area
                  <span className="free">
                    {sum.female.available} free · {sum.female.booked} booked · {sum.female.disabled} off
                  </span>
                </span>
              </div>
              <button
                type="button"
                className="btn btn-outline btn-sm full mt-12"
                onClick={() => setViewFloor(f)}
              >
                View seat map
              </button>
            </div>
          );
        })}
      </div>

      <DataTable
        columns={[
          { key: 'floor', label: 'Floor', wrap: true, render: (r) => <b className="strong">{r.floor}</b> },
          {
            key: 'zone',
            label: 'Zone',
            render: (r) => (
              <span className={`chip ${r.zone === 'Male Area' ? 'male' : 'female'}`}>
                {r.zone}
              </span>
            ),
          },
          { key: 'seats', label: 'Seats', num: true },
          {
            key: 'available',
            label: 'Available',
            num: true,
            render: (r) => (
              <b className={`strong ${r.available === 0 ? 'text-danger' : 'text-success'}`}>
                {r.available}
              </b>
            ),
          },
          { key: 'booked', label: 'Booked', num: true },
          { key: 'disabled', label: 'Disabled', num: true },
          { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
          {
            key: 'actions',
            label: '',
            render: (r) => (
              <span className="table-actions">
                <button type="button" className="icon-btn" aria-label={`Edit ${r.floor} ${r.zone}`}>
                  <Icon name="edit" size={16} />
                </button>
                <button type="button" className="icon-btn" aria-label={`Maintenance for ${r.floor}`}>
                  <Icon name="settings" size={16} />
                </button>
              </span>
            ),
          },
        ]}
        rows={seatInventory}
        emptyTitle="No seat blocks"
        emptyText="Seat inventory rows will appear here."
      />

      <div className="dash-grid-2 mt-24">
        <Card>
          <CardHeader title="Time slots" sub="Four daily slots configured for the reading hall" />
          <div className="list">
            {timeSlots.map((s) => (
              <div className="list-item" key={s.id}>
                <span className="main">
                  <span className="icon-tile">
                    <Icon name="clock" size={16} />
                  </span>
                  <span>
                    <span className="title">{s.label}</span>
                    <span className="sub">{s.note}</span>
                  </span>
                </span>
                <Badge>Active</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Zone policy" sub="How floors are divided" />
          <div className="list">
            {zones.map((z) => (
              <div className="list-item" key={z.id}>
                <span className="main">
                  <span
                    className="icon-tile"
                    style={{
                      background: z.id === 'male' ? 'var(--zone-male-soft)' : 'var(--zone-female-soft)',
                      color: z.id === 'male' ? 'var(--zone-male)' : 'var(--zone-female)',
                    }}
                  >
                    <Icon name="users" size={16} />
                  </span>
                  <span>
                    <span className="title">{z.label}</span>
                    <span className="sub">
                      Present on every floor · reservation required for tomorrow
                    </span>
                  </span>
                </span>
                <Badge tone="primary" plain>
                  Enforced
                </Badge>
              </div>
            ))}
          </div>
          <div className="card-footer">
            <div className="alert alert-info">
              <Icon name="info" size={18} />
              <div>Zone assignment rules are display-only until the reservation backend lands.</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Add seat block modal */}
      <Modal
        open={modal}
        title="Add seat block"
        sub="Create a new row or section of seats"
        onClose={() => setModal(false)}
        footer={
          <>
            <Button variant="outline" onClick={() => setModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon="check" onClick={() => setModal(false)}>
              Add seats (demo)
            </Button>
          </>
        }
      >
        <div className="form-grid">
          <Field label="Floor" htmlFor="sb-floor">
            <Select id="sb-floor" defaultValue={floors[0].name}>
              {floors.map((f) => (
                <option key={f.id}>{f.name}</option>
              ))}
            </Select>
          </Field>
          <Field label="Zone" htmlFor="sb-zone">
            <Select id="sb-zone" defaultValue="Male Area">
              <option>Male Area</option>
              <option>Female Area</option>
            </Select>
          </Field>
          <Field label="Row / block name" htmlFor="sb-row">
            <Input id="sb-row" placeholder="e.g. Row C" />
          </Field>
          <Field label="Number of seats" htmlFor="sb-count">
            <Input id="sb-count" type="number" min="1" defaultValue="10" />
          </Field>
        </div>
      </Modal>

      {/* Floor detail modal */}
      <Modal
        open={Boolean(viewFloor)}
        title={viewFloor ? viewFloor.name : ''}
        sub={viewFloor ? `${viewFloor.code} · ${viewFloor.note}` : ''}
        onClose={() => setViewFloor(null)}
        footer={
          <Button variant="outline" onClick={() => setViewFloor(null)}>
            Close
          </Button>
        }
      >
        {viewFloor ? (
          <div className="kv-list">
            <div className="kv-row">
              <span className="k">Male Area</span>
              <span className="v">
                {floorSummary(viewFloor.id).male.available} of{' '}
                {floorSummary(viewFloor.id).male.total} free tomorrow
              </span>
            </div>
            <div className="kv-row">
              <span className="k">Female Area</span>
              <span className="v">
                {floorSummary(viewFloor.id).female.available} of{' '}
                {floorSummary(viewFloor.id).female.total} free tomorrow
              </span>
            </div>
            <div className="kv-row">
              <span className="k">Time slots</span>
              <span className="v">{timeSlots.length} per day</span>
            </div>
            <div className="kv-row">
              <span className="k">Status</span>
              <span className="v">{viewFloor.status}</span>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}