import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { floors, timeSlots, zones, floorSummary, tomorrowLabel } from '../data/seats';

export default function SeatReservation() {
  const [slot, setSlot] = useState(timeSlots[0].id);
  const [area, setArea] = useState('male');
  const [floorId, setFloorId] = useState(floors[0].id);
  const navigate = useNavigate();

  const selectedFloor = floors.find((f) => f.id === floorId);
  const selectedSlot = timeSlots.find((s) => s.id === slot);
  const selectedZone = zones.find((z) => z.id === area) || zones[0];

  return (
    <div className="public-container public-page">
      <div className="page-header">
        <div>
          <span className="section-eyebrow">Reading hall</span>
          <h1 className="page-title mt-8">
            Seat Reservation
          </h1>
          <p className="page-sub">
            Choose a time slot and a floor, then pick your seat on the seat map. Every floor has a
            Male Area and a Female Area.
          </p>
        </div>
        <span className="chip gold">
          <Icon name="info" size={14} />
          Mock availability for demonstration
        </span>
      </div>

      {/* Tomorrow notice */}
      <div className="notice-bar">
        <div className="notice-main">
          <span className="icon-tile">
            <Icon name="calendar" size={20} />
          </span>
          <div>
            <b>Seats can be reserved only for tomorrow.</b>
            <span>Same-day and advance bookings open in a later phase of the portal.</span>
          </div>
        </div>
        <span className="date-chip">
          <Icon name="arrowRight" size={15} />
          {tomorrowLabel()}
        </span>
      </div>

      {/* Step 1 – slot */}
      <div className="step-label">
        <span className="num">1</span>
        <h3>Select a time slot</h3>
        <span className="hint">4 daily slots</span>
      </div>

      <div className="slot-grid">
        {timeSlots.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`slot-card ${slot === s.id ? 'selected' : ''}`}
            onClick={() => setSlot(s.id)}
          >
            <span className="icon-tile">
              <Icon name={slot === s.id ? 'check' : 'clock'} size={18} />
            </span>
            <span>
              <span className="slot-time">{s.label}</span>
              <span className="slot-label">{s.note}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Step 2 – eligible area */}
      <div className="step-label">
        <span className="num">2</span>
        <h3>Select your area</h3>
        <span className="hint">Male Area · Female Area</span>
      </div>

      <div className="slot-grid">
        {zones.map((z) => (
          <button
            key={z.id}
            type="button"
            className={`slot-card ${area === z.id ? 'selected' : ''}`}
            onClick={() => setArea(z.id)}
          >
            <span className={`icon-tile ${z.id === 'female' ? 'danger' : 'neutral'}`}>
              <Icon name={area === z.id ? 'check' : 'users'} size={18} />
            </span>
            <span>
              <span className="slot-time">{z.label}</span>
              <span className="slot-label">
                {z.id === 'male' ? 'Male reading area · all floors' : 'Female reading area · all floors'}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Step 3 – floor */}
      <div className="step-label">
        <span className="num">3</span>
        <h3>Select a floor</h3>
        <span className="hint">6 floors · male & female areas</span>
      </div>

      <div className="floor-grid">
        {floors.map((f) => {
          const sum = floorSummary(f.id);
          return (
            <button
              key={f.id}
              type="button"
              className={`floor-card ${floorId === f.id ? 'selected' : ''}`}
              onClick={() => setFloorId(f.id)}
            >
              <div className="floor-head">
                <span className="floor-name">{f.name}</span>
                <span className={`chip ${f.status === 'Open' ? 'primary' : 'gold'}`}>{f.status}</span>
              </div>
              <div className="floor-meta">
                {f.code} · {sum.male.total + sum.female.total} seats · {f.note}
              </div>

              <div className="floor-zones">
                <span className={`zone-row male ${area === 'male' ? 'eligible' : ''}`}>
                  Male Area
                  <span className="free">{sum.male.available} of {sum.male.total} free</span>
                </span>
                <span className={`zone-row female ${area === 'female' ? 'eligible' : ''}`}>
                  Female Area
                  <span className="free">{sum.female.available} of {sum.female.total} free</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Continue */}
      <div className="card mt-24">
        <div className="flex between items-center wrap gap-16">
          <div className="flex items-center gap-12">
            <span className="icon-tile">
              <Icon name="seat" size={20} />
            </span>
            <div>
              <b>{selectedFloor.name}</b>
              <div className="small muted">
                {selectedZone.label} · {selectedSlot.label} · {tomorrowLabel()}
              </div>
            </div>
          </div>

          <div className="flex gap-12 wrap">
            <Button
              variant="outline"
              onClick={() => navigate('/bookings')}
              icon="calendar"
            >
              My bookings
            </Button>
            <Button
              variant="primary"
              icon="arrowRight"
              onClick={() =>
                navigate(
                  `/reserve/seat-map?floor=${floorId}&slot=${slot}&area=${area}`,
                )
              }
            >
              View seat map
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Alert tone="info" title="How seat states work">
          Green seats are available, blue is your current selection, grey means already booked and
          a dashed seat is disabled for maintenance. Selecting a seat here simply opens the map —
          nothing is booked until the confirmation step.
        </Alert>
      </div>
    </div>
  );
}