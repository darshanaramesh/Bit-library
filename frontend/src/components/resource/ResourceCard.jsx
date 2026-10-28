import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { categoryTheme } from '../../data/resources';

/**
 * ResourceCard – catalogue tile with type artwork, access flag and
 * View / Download actions (download is a UI demonstration only).
 */
export default function ResourceCard({ resource }) {
  const theme = categoryTheme[resource.category] || { tone: '', icon: 'file' };
  const isOpen = resource.access === 'Open Access';
  const [showDownload, setShowDownload] = useState(false);

  return (
    <article className="resource-card">
      <Link
        to={`/resources/${resource.id}`}
        className={`resource-thumb ${theme.tone}`}
        aria-label={`Open ${resource.title}`}
      >
        <Icon name={theme.icon} size={36} />
        <span className="type-chip">{resource.category}</span>
        <span className="access-chip">
          <Icon name={isOpen ? 'check' : 'lock'} size={12} />
          {isOpen ? 'Open' : 'Restricted'}
        </span>
      </Link>

      <div className="resource-body">
        <h3 className="resource-title">
          <Link to={`/resources/${resource.id}`}>{resource.title}</Link>
        </h3>
        <div className="resource-meta">
          <span>{resource.author}</span>
          <span>·</span>
          <span>{resource.year}</span>
          <span>·</span>
          <span>{resource.format}</span>
        </div>
        <p className="resource-desc">{resource.summary}</p>
      </div>

      <div className="resource-footer">
        <div className="resource-stats">
          <span>
            <Icon name="download" size={13} />
            {resource.downloads.toLocaleString('en-IN')}
          </span>
          <span>
            <Icon name="star" size={13} />
            {resource.rating}
          </span>
        </div>
        <div className="flex gap-8">
          <Link to={`/resources/${resource.id}`} className="btn btn-outline btn-sm">
            View
          </Link>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setShowDownload(true)}
          >
            <Icon name="download" size={15} />
            Download
          </button>
        </div>
      </div>

      <Modal
        open={showDownload}
        title="Download resource"
        onClose={() => setShowDownload(false)}
        footer={
          <>
            <Button variant="outline" onClick={() => setShowDownload(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              icon="download"
              onClick={() => setShowDownload(false)}
            >
              Confirm (demo)
            </Button>
          </>
        }
      >
        <p className="small muted">
          <b>{resource.title}</b>
        </p>
        <p className="small muted mt-8">
          {resource.format} · {resource.size} · {resource.pages} pages
        </p>
        <div className="mt-16">
          <div className="alert alert-info">
            <Icon name="info" size={18} />
            <div>
              <div className="alert-title">UI demonstration only</div>
              <div>
                No file transfer is connected yet — real downloads arrive with the backend phase.
                {isOpen ? null : ' This item is also marked Restricted.'}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </article>
  );
}