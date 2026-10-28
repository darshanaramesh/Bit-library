/** StatusBadge – coloured pill for statuses such as Confirmed / Pending. */
const toneMap = {
  Confirmed: 'success',
  Active: 'success',
  Available: 'success',
  Completed: 'success',
  Approved: 'success',
  Yes: 'success',
  Open: 'success',
  Pending: 'warning',
  Processing: 'warning',
  Busy: 'warning',
  Partial: 'warning',
  Maintenance: 'warning',
  Restricted: 'warning',
  Cancelled: 'danger',
  Suspended: 'danger',
  Failed: 'danger',
  Full: 'danger',
  Archived: 'neutral',
  No: 'neutral',
  Info: 'info',
};

function toneForStatus(status) {
  return toneMap[status] || 'neutral';
}

export default function Badge({ children, tone, plain = false, className = '' }) {
  const resolved = tone || toneForStatus(children);
  return (
    <span className={`badge badge-${resolved} ${plain ? 'badge-plain' : ''} ${className}`}>
      {children}
    </span>
  );
}