import { useState } from 'react';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import Alert from '../components/ui/Alert';

/**
 * Access Control Matrix (UI demonstration).
 * Values are static mock permissions — no RBAC logic runs in this build.
 */

const capabilities = [
  'Browse catalogue',
  'View resource',
  'Download resource',
  'Reserve seat',
  'Approve requests',
  'Manage catalogue',
  'Manage users',
  'Edit permissions',
];

const matrix = {
  Student: ['yes', 'limited', 'no', 'yes', 'no', 'no', 'no', 'no'],
  Faculty: ['yes', 'yes', 'limited', 'yes', 'limited', 'no', 'no', 'no'],
  Librarian: ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'limited', 'no'],
  Admin: ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'],
};

const resourcePolicies = [
  { resource: 'E-Books (open)', student: 'yes', faculty: 'yes', librarian: 'yes', admin: 'yes' },
  { resource: 'E-Books (licensed)', student: 'limited', faculty: 'yes', librarian: 'yes', admin: 'yes' },
  { resource: 'Journals', student: 'limited', faculty: 'yes', librarian: 'yes', admin: 'yes' },
  { resource: 'Research Papers', student: 'yes', faculty: 'yes', librarian: 'yes', admin: 'yes' },
  { resource: 'Question Papers', student: 'yes', faculty: 'yes', librarian: 'yes', admin: 'yes' },
  { resource: 'Study Materials', student: 'yes', faculty: 'yes', librarian: 'yes', admin: 'yes' },
  { resource: 'Thesis archive', student: 'no', faculty: 'limited', librarian: 'yes', admin: 'yes' },
];

const iconFor = { yes: 'check', limited: 'alert', no: 'x' };

function Perm({ value }) {
  return (
    <span className={`perm ${value}`} title={value}>
      {value === 'yes' ? '✓' : value === 'limited' ? '!' : '–'}
    </span>
  );
}

export default function AccessControl() {
  const [editRole, setEditRole] = useState(null);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setEditRole(null);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 4000);
  };

  return (
    <>
      <PageHeader
        title="Access Control Matrix"
        sub="Which role can do what across digital resources and seat reservations. Display-only — enforcement lands with the backend RBAC phase."
        actions={
          <>
            <Button variant="outline" icon="download">
              Export matrix
            </Button>
            <Button variant="primary" icon="edit" onClick={() => setEditRole('Student')}>
              Edit permissions
            </Button>
          </>
        }
      />

      {saved ? (
        <div className="mb-16">
          <Alert tone="success" title="Permissions saved (demo)">
            The matrix was updated in the UI only — no policy was persisted.
          </Alert>
        </div>
      ) : null}

      <div className="strip-grid">
        {[
          { b: '4', s: 'Roles defined' },
          { b: '8', s: 'Capabilities' },
          { b: '7', s: 'Resource policies' },
          { b: '2', s: 'Pending reviews' },
        ].map((x) => (
          <div className="mini-stat" key={x.s}>
            <b>{x.b}</b>
            <span>{x.s}</span>
          </div>
        ))}
      </div>

      {/* Role × capability matrix */}
      <Card pad={false} className="mb-24 flush">
        <CardHeader
          title="Role capability matrix"
          sub="Rows are roles, columns are portal capabilities"
          action={
            <span className="chip gold">
              <Icon name="shield" size={13} />
              RBAC model
            </span>
          }
        />

        <div className="flush-pad">
          <div className="table-wrap table-scroll thin-scroll">
            <table className="matrix">
              <thead>
                <tr>
                  <th>Capability</th>
                  {Object.keys(matrix).map((role) => (
                    <th key={role}>{role}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {capabilities.map((cap, i) => (
                  <tr key={cap}>
                    <td>{cap}</td>
                    {Object.keys(matrix).map((role) => (
                      <td key={role}>
                        <Perm value={matrix[role][i]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="matrix-legend">
            <span>
              <span className="perm yes">✓</span> Full access
            </span>
            <span>
              <span className="perm limited">!</span> Limited / requires approval
            </span>
            <span>
              <span className="perm no">–</span> No access
            </span>
            <span className="dim">Click “Edit permissions” to see the editor flow.</span>
          </div>
        </div>
      </Card>

      {/* Resource type policies */}
      <Card className="mb-24">
        <CardHeader
          title="Resource access by type"
          sub="Default policy applied to each collection"
          action={<Badge tone="primary" plain>Inherited by all floors</Badge>}
        />
        <div className="table-wrap thin-scroll">
          <table className="matrix">
            <thead>
              <tr>
                <th>Resource type</th>
                <th>Student</th>
                <th>Faculty</th>
                <th>Librarian</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {resourcePolicies.map((p) => (
                <tr key={p.resource}>
                  <td>{p.resource}</td>
                  <td>
                    <Perm value={p.student} />
                  </td>
                  <td>
                    <Perm value={p.faculty} />
                  </td>
                  <td>
                    <Perm value={p.librarian} />
                  </td>
                  <td>
                    <Perm value={p.admin} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="dash-grid-3">
        <Card>
          <CardHeader title="Student" action={<Badge tone="primary" plain>Default</Badge>} />
          <ul className="list">
            <li className="list-item">
              <span className="main small muted">Reserve up to 2 slots per day</span>
            </li>
            <li className="list-item">
              <span className="main small muted">Download open-access items</span>
            </li>
            <li className="list-item">
              <span className="main small muted">Restricted items need approval</span>
            </li>
          </ul>
          <div className="card-footer">
            <Button variant="outline" size="sm" block icon="edit" onClick={() => setEditRole('Student')}>
              Edit role
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="Faculty" action={<Badge tone="info" plain>Department</Badge>} />
          <ul className="list">
            <li className="list-item">
              <span className="main small muted">View & download licensed material</span>
            </li>
            <li className="list-item">
              <span className="main small muted">Approve student access requests</span>
            </li>
            <li className="list-item">
              <span className="main small muted">Publish study materials</span>
            </li>
          </ul>
          <div className="card-footer">
            <Button variant="outline" size="sm" block icon="edit" onClick={() => setEditRole('Faculty')}>
              Edit role
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="Librarian" action={<Badge tone="success" plain>Operations</Badge>} />
          <ul className="list">
            <li className="list-item">
              <span className="main small muted">Manage catalogue and seats</span>
            </li>
            <li className="list-item">
              <span className="main small muted">Approve / cancel reservations</span>
            </li>
            <li className="list-item">
              <span className="main small muted">View member records</span>
            </li>
          </ul>
          <div className="card-footer">
            <Button variant="outline" size="sm" block icon="edit" onClick={() => setEditRole('Librarian')}>
              Edit role
            </Button>
          </div>
        </Card>
      </div>

      {/* Editor modal */}
      <Modal
        open={Boolean(editRole)}
        title={`Edit permissions — ${editRole || ''}`}
        sub="Toggle capabilities for this role"
        onClose={() => setEditRole(null)}
        footer={
          <>
            <Button variant="outline" onClick={() => setEditRole(null)}>
              Cancel
            </Button>
            <Button variant="primary" icon="check" onClick={save}>
              Save permissions (demo)
            </Button>
          </>
        }
      >
        {editRole ? (
          <>
            {capabilities.map((cap, i) => {
              const value = matrix[editRole][i];
              return (
                <div className="settings-row" key={cap}>
                  <div className="info">
                    <b>{cap}</b>
                    <span>
                      {value === 'yes'
                        ? 'Allowed for this role'
                        : value === 'limited'
                          ? 'Allowed with approval or limits'
                          : 'Blocked for this role'}
                    </span>
                  </div>
                  <span className={`perm ${value}`}>
                    <Icon name={iconFor[value]} size={14} />
                  </span>
                </div>
              );
            })}
            <div className="mt-16">
              <Alert tone="info" title="RBAC comes later">
                This editor only mutates local component state; real permission checks will run on
                the server.
              </Alert>
            </div>
          </>
        ) : null}
      </Modal>
    </>
  );
}