import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Modal from '../components/ui/Modal';
import ZonePanel from '../components/seats/ZonePanel';
import {
  floors,
  timeSlots,
  zones,
  getSeats,
  sampleMessages,
  tomorrowLabel,
} from '../data/seats';

export default function SeatMapPage() {
  const [params, setParams] = useSearchParams();
  const floorId = params.get('floor') || floors[0].id;
  const slotId = params.get('slot') || timeSlots[0].id;
  const [selected, setSelected] = useState(null); // { seat, zoneId }
  const [toasts, setToasts] = useState([]);
  const [confirming, setConfirming] = useState(false);
  const toastIdRef = useRef(0);

  const floor = floors.find((f) => f.id === floorId) || floors[0];
  const slot = timeSlots.find((s) => s.id === slotId) || timeSlots[0];
  const areaId = params.get('area') === 'female' ? 'female' : 'male';
  const eligibleZone = zones.find((z) => z.id === areaId) || zones[0];

  // One grid per zone for the current floor (mock data, computed once here).
  const zoneSeats = {
    male: getSeats(floorId, 'male'),
    female: getSeats(floorId, 'female'),
  };
  const allSeats = [...zoneSeats.male, ...zoneSeats.female];
  const counts = {
    available: allSeats.filter((s) => s.state === 'available').length,
    booked: allSeats.filter((s) => s.state === 'booked').length,
    disabled: allSeats.filter((s) => s.state === 'disabled').length,
    selected: selected ? 1 : 0,
  };

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    next.set(key, value);
    setParams(next, { replace: true });
    setSelected(null);
  };

  const pushToast = (tone, text) => {
    toastIdRef.current += 1;
    const id = toastIdRef.current;
    setToasts((prev) => [...prev, { id, tone, text }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleSelect = (seat, zoneId) => {
    if (seat.state === 'booked') {
      pushToast(
        'danger',
        `Seat ${seat.id} is already booked for this time slot. Please choose another seat.`,
      );
      return;
    }
    if (seat.state === 'disabled') {
      pushToast('warning', `Seat ${seat.id} is out of service (disabled) and cannot be reserved.`);
      return;
    }
    setSelected({ seat, zoneId });
    pushToast(
      'success',
      `Seat ${seat.id} is available and has been selected for ${slot.label} tomorrow.`,
    );
  };

  const confirm = () => {
    setConfirming(false);
    pushToast(
      'success',
      `Reservation confirmed for seat ${selected.seat.id} — ${slot.label}, tomorrow. This is a UI demo, nothing was stored.`,
    );
    setSelected(null);
  };

  const toastIcons = { success: 'circleCheck', danger: 'alert', warning: 'alert', info: 'info' };

  return (
    <div className="public-container public-page">
      <div className="page-header">
        <div>
          <span className="section-eyebrow">Step 4 · choose your seat</span>
          <h1 className="page-title mt-8">
            {floor.name} — Seat Map
          </h1>
            <p className="page-sub">
              Male Area and Female Area are shown side by side — your eligible area is highlighted.
              Tap an available seat to select it, then confirm your reservation.
            </p>
        </div>
        <span className="date-chip">
          <Icon name="calendar" size={15} />
          {tomorrowLabel()}
        </span>
      </div>

      <div className="notice-bar">
        <div className="notice-main">
          <span className="icon-tile">
            <Icon name="info" size={20} />
          </span>
          <div>
            <b>Seats can be reserved only for tomorrow.</b>
            <span>Select a floor and one of the four time slots below.</span>
          </div>
        </div>
        <span className="chip primary">{slot.label}</span>
      </div>

      {/* Floor tabs */}
      <div className="floor-tabs" role="tablist" aria-label="Floors">
        {floors.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={f.id === floorId}
            className={`floor-tab ${f.id === floorId ? 'active' : ''}`}
            onClick={() => updateParam('floor', f.id)}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Time slot chips */}
      <div className="filters mb-16">
        {timeSlots.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`filter-chip ${slotId === s.id ? 'active' : ''}`}
            onClick={() => updateParam('slot', s.id)}
          >
            <Icon name="clock" size={13} /> {s.label}
          </button>
        ))}
      </div>

      {/* Eligible area */}
      <div className="flex items-center gap-12 wrap mb-16">
        <span className="small bold">Eligible area</span>
        <div className="filters">
          {zones.map((z) => (
            <button
              key={z.id}
              type="button"
              className={`filter-chip ${areaId === z.id ? 'active' : ''}`}
              onClick={() => updateParam('area', z.id)}
            >
              <Icon name="users" size={13} /> {z.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="seat-legend">
        <span className="legend-item">
          <span className="seat-swatch available" /> Available
        </span>
        <span className="legend-item">
          <span className="seat-swatch selected" /> Selected
        </span>
        <span className="legend-item">
          <span className="seat-swatch booked" /> Booked
        </span>
        <span className="legend-item">
          <span className="seat-swatch disabled" /> Disabled
        </span>
        <span className="small dim ms-auto">
          {floor.code} · {floor.note}
        </span>
      </div>

      {/* Seat totals for this floor + slot */}
      <div className="strip-grid">
        <div className="mini-stat">
          <b>{counts.available}</b>
          <span>Available seats</span>
        </div>
        <div className="mini-stat">
          <b>{counts.booked}</b>
          <span>Booked seats</span>
        </div>
        <div className="mini-stat">
          <b>{counts.disabled}</b>
          <span>Disabled seats</span>
        </div>
        <div className="mini-stat">
          <b>{counts.selected}</b>
          <span>Selected seat</span>
        </div>
      </div>

      <div className="seat-layout">
        {/* Zones */}
        <div>
          {zones.map((z) => (
            <ZonePanel
              key={z.id}
              zoneId={z.id}
              zoneLabel={z.label}
              floorName={floor.name}
              seats={zoneSeats[z.id]}
              selectedId={selected?.seat.id}
              eligible={z.id === areaId}
              onSelect={(seat) => handleSelect(seat, z.id)}
            />
          ))}
        </div>

        {/* Side: toasts + summary */}
        <aside className="seat-summary">
          {toasts.length > 0 ? (
            <div className="toast-stack">
              {toasts.map((t) => (
                <div key={t.id} className={`toast ${t.tone}`} role="status">
                  <Icon name={toastIcons[t.tone] || 'info'} size={17} />
                  <span>{t.text}</span>
                  <button
                    type="button"
                    aria-label="Dismiss message"
                    onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                  >
                    <Icon name="x" size={15} />
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Your selection</h3>
                <p className="card-sub">Reservation summary</p>
              </div>
            </div>

            <div className="summary-slot">
              <Icon name="clock" size={19} />
              <div>
                <b>{slot.label}</b>
                <span>
                  Tomorrow · {floor.name} · {eligibleZone.label}
                </span>
              </div>
            </div>

            {selected ? (
              <div className="kv-list">
                <div className="kv-row">
                  <span className="k">Seat</span>
                  <span className="v">{selected.seat.id}</span>
                </div>
                <div className="kv-row">
                  <span className="k">Area</span>
                  <span className="v">
                    {zones.find((z) => z.id === selected.zoneId)?.label}
                  </span>
                </div>
                <div className="kv-row">
                  <span className="k">Floor</span>
                  <span className="v">{floor.name}</span>
                </div>
                <div className="kv-row">
                  <span className="k">Date</span>
                  <span className="v">{tomorrowLabel()}</span>
                </div>
                <div className="kv-row">
                  <span className="k">Status</span>
                  <span className="v text-success">Available</span>
                </div>
              </div>
            ) : (
              <div className="summary-empty">
                <Icon name="seat" size={26} />
                <p className="mt-8">
                  No seat selected yet.
                  <br />
                  Tap an available seat on the map.
                </p>
              </div>
            )}

            <div className="mt-16">
              <Button
                variant="primary"
                block
                icon="check"
                disabled={!selected}
                onClick={() => setConfirming(true)}
              >
                Confirm reservation
              </Button>
            </div>

            <p className="tiny dim text-center mt-12">
              Overlapping bookings are not allowed · one seat per slot
            </p>
          </div>
        </aside>
      </div>

      {/* Sample UI messages */}
      <div className="step-label">
        <span className="num">i</span>
        <h3>Sample messages in this flow</h3>
        <span className="hint">UI states only — no validation logic</span>
      </div>

      <div className="samples-grid">
        {sampleMessages.map((m) => (
          <Alert key={m.title} tone={m.type} title={m.title}>
            {m.text}
          </Alert>
        ))}
      </div>

      {/* Confirm modal */}
      <Modal
        open={confirming}
        title="Confirm seat reservation"
        sub="Review your booking details"
        onClose={() => setConfirming(false)}
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon="check" onClick={confirm}>
              Confirm (demo)
            </Button>
          </>
        }
      >
        {selected ? (
          <>
            <div className="kv-list">
              <div className="kv-row">
                <span className="k">Seat</span>
                <span className="v">{selected.seat.id}</span>
              </div>
              <div className="kv-row">
                <span className="k">Floor & area</span>
                <span className="v">
                  {floor.name} · {zones.find((z) => z.id === selected.zoneId)?.label}
                </span>
              </div>
              <div className="kv-row">
                <span className="k">Time slot</span>
                <span className="v">{slot.label}</span>
              </div>
              <div className="kv-row">
                <span className="k">Date</span>
                <span className="v">{tomorrowLabel()}</span>
              </div>
            </div>
            <div className="mt-16">
              <Alert tone="info" title="UI demonstration only">
                Confirming shows the success state — no booking is stored until the backend phase
                connects this screen to the reservation service.
              </Alert>
            </div>
          </>
        ) : null}
      </Modal>
    </div>
  );
}