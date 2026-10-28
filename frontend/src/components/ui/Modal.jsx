import { useEffect } from 'react';
import Icon from './Icon';

/**
 * Modal – dialog with overlay, header, body and footer.
 * UI component only: it renders whatever children it receives.
 */
export default function Modal({ open, title, sub, onClose, children, footer, wide = false }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`modal ${wide ? 'wide' : ''}`}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">{title}</h3>
            {sub ? <p className="card-sub">{sub}</p> : null}
          </div>
          <button type="button" className="icon-btn bare" onClick={onClose} aria-label="Close dialog">
            <Icon name="x" size={19} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer ? <div className="modal-footer">{footer}</div> : null}
      </div>
    </div>
  );
}