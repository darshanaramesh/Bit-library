import Icon from '../ui/Icon';

/**
 * ZonePanel – one gender zone of a floor: header with counts + seat grid.
 * Seat clicks are delegated to the page (UI state only, no booking logic).
 */
export default function ZonePanel({
  zoneId,
  zoneLabel,
  floorName,
  seats,
  selectedId,
  onSelect,
  eligible = false,
}) {
  const available = seats.filter((s) => s.state === 'available').length;
  const booked = seats.filter((s) => s.state === 'booked').length;
  const disabled = seats.filter((s) => s.state === 'disabled').length;

  return (
    <section className={`zone-panel ${eligible ? 'eligible' : ''}`}>
      <div className="zone-head">
        <div className={`zone-title ${zoneId}`}>
          <span className="pin" />
          {zoneLabel}
          <span className="chip">{floorName}</span>
          {eligible ? (
            <span className="chip primary">
              <Icon name="check" size={12} /> Eligible area
            </span>
          ) : null}
        </div>
        <div className="zone-count">
          {available} available · {booked} booked · {disabled} disabled
        </div>
      </div>

      {available === 0 ? (
        <div className="zone-full">
          <b>All seats booked</b>
          Every seat in the {zoneLabel} is taken for this slot. Please choose another floor, zone
          or time slot.
        </div>
      ) : (
        <div className="seat-grid">
          {seats.map((seat) => {
            const state = selectedId === seat.id ? 'selected' : seat.state;
            return (
              <button
                key={seat.id}
                type="button"
                className={`seat ${state}`}
                data-seat={seat.id}
                data-state={state}
                disabled={state === 'disabled'}
                title={`${seat.id} · ${state}`}
                onClick={() => onSelect(seat)}
              >
                {seat.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex gap-16 wrap mt-16 small muted items-center">
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
        <span className="flex items-center gap-4 ms-auto">
          <Icon name="info" size={14} /> Tap an available seat to select it
        </span>
      </div>
    </section>
  );
}