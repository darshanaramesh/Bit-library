import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Alert from '../components/ui/Alert';
import Modal from '../components/ui/Modal';
import { Card, CardHeader } from '../components/ui/Card';
import { resources, categoryTheme } from '../data/resources';

export default function ResourceDetails() {
  const { id } = useParams();
  const resource = resources.find((r) => r.id === id);
  const [modal, setModal] = useState(null); // 'view' | 'download' | null

  if (!resource) {
    return (
      <div className="public-container public-page">
        <Alert tone="danger" title="Resource not found">
          The resource you are looking for does not exist in the sample catalogue.{' '}
          <Link to="/resources" className="bold">
            Back to all resources
          </Link>
        </Alert>
      </div>
    );
  }

  const theme = categoryTheme[resource.category] || { tone: '', icon: 'file' };
  const isOpen = resource.access === 'Open Access';
  const related = resources
    .filter((r) => r.category === resource.category && r.id !== resource.id)
    .slice(0, 4);

  const details = [
    ['Resource ID', resource.id],
    ['Author / Creator', resource.author],
    ['Publisher / Source', resource.publisher],
    ['Year', resource.year],
    ['Format', `${resource.format} · ${resource.size}`],
    ['Extent', `${resource.pages} pages`],
    ['Access level', resource.access],
    ['Added on', resource.added],
  ];

  return (
    <div className="public-container public-page">
      <Link to="/resources" className="back-link">
        <Icon name="chevronLeft" size={16} />
        All digital resources
      </Link>

      <div className="details-grid">
        {/* Main column */}
        <div>
          <div className={`details-cover ${theme.tone}`}>
            <Icon name={theme.icon} size={64} />
            <span className="type-chip">{resource.category}</span>
          </div>

          <div className="flex gap-8 wrap items-center">
            <Badge tone={isOpen ? 'success' : 'warning'}>{resource.access}</Badge>
            <Badge tone="primary" plain>
              {resource.status}
            </Badge>
            <span className="chip">{resource.id}</span>
          </div>

          <h1 className="details-title">
            {resource.title}
          </h1>

          <div className="details-meta">
            <span className="chip">
              <Icon name="user" size={13} /> {resource.author}
            </span>
            <span className="chip">
              <Icon name="building" size={13} /> {resource.publisher}
            </span>
            <span className="chip">
              <Icon name="calendar" size={13} /> {resource.year}
            </span>
            <span className="chip gold">
              <Icon name="star" size={13} /> {resource.rating} rating
            </span>
          </div>

          <p className="details-desc">{resource.summary}</p>

          <div className="tag-row">
            {resource.tags.map((t) => (
              <span className="chip" key={t}>
                #{t}
              </span>
            ))}
          </div>

          <Card className="mt-24">
            <CardHeader title="Bibliographic details" sub="As recorded in the library catalogue" />
            <div className="kv-list">
              {details.map(([k, v]) => (
                <div className="kv-row" key={k}>
                  <span className="k">{k}</span>
                  <span className="v">{v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Side column */}
        <aside className="details-side">
          <Card>
            <CardHeader title="Access this resource" />
            <div className="btn-row">
              <Button variant="primary" icon="eye" onClick={() => setModal('view')}>
                View online
              </Button>
              <Button variant="outline" icon="download" onClick={() => setModal('download')}>
                Download
              </Button>
            </div>

            <div className="mt-16">
              {isOpen ? (
                <Alert tone="success" title="Open access">
                  Anyone with a library account can view or download this item.
                </Alert>
              ) : (
                <Alert tone="warning" title="Restricted resource">
                  Only faculty, librarians and admin roles may open this item. Your access is
                  decided by the access control matrix.
                </Alert>
              )}
            </div>

            <div className="kv-list mt-16">
              <div className="kv-row">
                <span className="k">Downloads</span>
                <span className="v">{resource.downloads.toLocaleString('en-IN')}</span>
              </div>
              <div className="kv-row">
                <span className="k">File</span>
                <span className="v">
                  {resource.format} · {resource.size}
                </span>
              </div>
              <div className="kv-row">
                <span className="k">Circulation</span>
                <span className="v">Digital — no return required</span>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="More like this" sub={`Other items in ${resource.category}`} />
            <div className="list">
              {related.map((r) => (
                <Link to={`/resources/${r.id}`} className="list-item" key={r.id}>
                  <span className="main">
                    <span className="icon-tile">
                      <Icon name={theme.icon} size={17} />
                    </span>
                    <span>
                      <span className="title">{r.title}</span>
                      <span className="sub">
                        {r.author} · {r.year}
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
        </aside>
      </div>

      {/* View modal */}
      <Modal
        open={modal === 'view'}
        title="Reader preview"
        onClose={() => setModal(null)}
        footer={
          <Button variant="outline" onClick={() => setModal(null)}>
            Close
          </Button>
        }
      >
        <p className="small muted">
          <b>{resource.title}</b> · {resource.format}
        </p>
        <div className="dropzone mt-16">
          <Icon name="file" size={40} />
          <p className="small mt-12">
            Page 1 of {resource.pages} would render here once the document viewer is connected in
            a later phase.
          </p>
        </div>
      </Modal>

      {/* Download modal */}
      <Modal
        open={modal === 'download'}
        title="Download resource"
        onClose={() => setModal(null)}
        footer={
          <>
            <Button variant="outline" onClick={() => setModal(null)}>
              Cancel
            </Button>
            <Button variant="primary" icon="download" onClick={() => setModal(null)}>
              Download (demo)
            </Button>
          </>
        }
      >
        <div className="kv-list">
          <div className="kv-row">
            <span className="k">File</span>
            <span className="v">{resource.format} · {resource.size}</span>
          </div>
          <div className="kv-row">
            <span className="k">Pages</span>
            <span className="v">{resource.pages}</span>
          </div>
          <div className="kv-row">
            <span className="k">Access</span>
            <span className="v">{resource.access}</span>
          </div>
        </div>
        <div className="mt-16">
          <Alert tone="info" title="UI demonstration only">
            No file transfer is wired up yet — this dialog shows how the download flow will look
            once the backend and storage are connected.
          </Alert>
        </div>
      </Modal>
    </div>
  );
}