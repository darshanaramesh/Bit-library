import { useMemo, useState } from 'react';
import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Tabs from '../../components/ui/Tabs';
import Avatar from '../../components/ui/Avatar';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/ui/DataTable';
import { Card, CardHeader } from '../../components/ui/Card';
import { SearchBar, Field, Input, Select } from '../../components/ui/Form';
import { userRows } from '../../data/users';

const statusTabs = [
  { id: 'all', label: 'All' },
  { id: 'Active', label: 'Active' },
  { id: 'Pending', label: 'Pending' },
  { id: 'Suspended', label: 'Suspended' },
];

export default function UserManagement() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [modal, setModal] = useState(null); // 'add' | 'view' | null
  const [activeUser, setActiveUser] = useState(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return userRows.filter((u) => {
      const matchStatus = status === 'all' || u.status === status;
      const matchQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [query, status]);

  const counts = {
    all: userRows.length,
    Active: userRows.filter((u) => u.status === 'Active').length,
    Pending: userRows.filter((u) => u.status === 'Pending').length,
    Suspended: userRows.filter((u) => u.status === 'Suspended').length,
  };

  return (
    <>
      <PageHeader
        title="User Management"
        sub="Members of the library portal — students, faculty, librarians and administrators."
        actions={
          <>
            <Button variant="outline" icon="upload">
              Import roster
            </Button>
            <Button variant="primary" icon="plus" onClick={() => setModal('add')}>
              Add user
            </Button>
          </>
        }
      />

      <div className="strip-grid">
        {[
          { b: '4,820', s: 'Total users' },
          { b: '4,242', s: 'Students' },
          { b: '386', s: 'Faculty' },
          { b: '192', s: 'Staff & admin' },
        ].map((x) => (
          <div className="mini-stat" key={x.s}>
            <b>{x.b}</b>
            <span>{x.s}</span>
          </div>
        ))}
      </div>

      <div className="toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search name, ID or email…"
          ariaLabel="Search users"
        />
        <div className="flex gap-8 items-center">
          <Select className="select-auto" defaultValue="all" aria-label="Filter by role">
            <option value="all">All roles</option>
            <option>Student</option>
            <option>Faculty</option>
            <option>Librarian</option>
            <option>Admin</option>
          </Select>
        </div>
      </div>

      <div className="mb-16">
        <Tabs
          items={statusTabs.map((t) => ({ ...t, count: counts[t.id] }))}
          active={status}
          onChange={setStatus}
        />
      </div>

      <DataTable
        columns={[
          {
            key: 'name',
            label: 'Member',
            render: (r) => (
              <div className="cell-user">
                <Avatar name={r.name} size="sm" />
                <span>
                  <b>{r.name}</b>
                  <span>{r.email}</span>
                </span>
              </div>
            ),
          },
          { key: 'id', label: 'Campus ID' },
          { key: 'role', label: 'Role', render: (r) => <Badge tone="primary" plain>{r.role}</Badge> },
          { key: 'department', label: 'Department' },
          { key: 'reservations', label: 'Bookings', num: true },
          { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
          { key: 'joined', label: 'Joined' },
          {
            key: 'actions',
            label: '',
            render: (r) => (
              <span className="table-actions">
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={`View ${r.name}`}
                  onClick={() => {
                    setActiveUser(r);
                    setModal('view');
                  }}
                >
                  <Icon name="eye" size={16} />
                </button>
                <button type="button" className="icon-btn" aria-label={`Edit ${r.name}`}>
                  <Icon name="edit" size={16} />
                </button>
                <button type="button" className="icon-btn" aria-label={`Suspend ${r.name}`}>
                  <Icon name="trash" size={16} />
                </button>
              </span>
            ),
          },
        ]}
        rows={rows}
        keyAccessor="id"
        emptyTitle="No users match"
        emptyText="Try a different search term or status filter."
      />

      <p className="small dim mt-16">
        Displaying {rows.length} of {userRows.length} sample records · roster import and role
        changes are wired to the backend in a later phase.
      </p>

      {/* Add user modal */}
      <Modal
        open={modal === 'add'}
        title="Add a library user"
        sub="Create a portal account manually"
        onClose={() => setModal(null)}
        footer={
          <>
            <Button variant="outline" onClick={() => setModal(null)}>
              Cancel
            </Button>
            <Button variant="primary" icon="check" onClick={() => setModal(null)}>
              Create user (demo)
            </Button>
          </>
        }
      >
        <div className="form-grid">
          <Field label="Full name" htmlFor="nu-name">
            <Input id="nu-name" placeholder="Member name" />
          </Field>
          <Field label="Campus ID" htmlFor="nu-id">
            <Input id="nu-id" placeholder="BIT/XX/2026/000" />
          </Field>
          <div className="span-2">
            <Field label="Email" htmlFor="nu-email">
              <Input id="nu-email" type="email" placeholder="name@bit.ac.in" />
            </Field>
          </div>
          <Field label="Role" htmlFor="nu-role">
            <Select id="nu-role" defaultValue="Student">
              <option>Student</option>
              <option>Faculty</option>
              <option>Librarian</option>
              <option>Admin</option>
            </Select>
          </Field>
          <Field label="Department" htmlFor="nu-dept">
            <Input id="nu-dept" placeholder="e.g. CSE" />
          </Field>
        </div>
        <div className="alert alert-info mt-8">
          <Icon name="info" size={18} />
          <div>No account is created — this form demonstrates the intended admin flow.</div>
        </div>
      </Modal>

      {/* View user modal */}
      <Modal
        open={modal === 'view'}
        title={activeUser ? activeUser.name : ''}
        sub={activeUser ? activeUser.id : ''}
        onClose={() => setModal(null)}
        footer={
          <>
            <Button variant="outline" onClick={() => setModal(null)}>
              Close
            </Button>
            <Button variant="primary" icon="edit">
              Edit member
            </Button>
          </>
        }
      >
        {activeUser ? (
          <div className="kv-list">
            <div className="kv-row">
              <span className="k">Email</span>
              <span className="v">{activeUser.email}</span>
            </div>
            <div className="kv-row">
              <span className="k">Role</span>
              <span className="v">{activeUser.role}</span>
            </div>
            <div className="kv-row">
              <span className="k">Department</span>
              <span className="v">{activeUser.department}</span>
            </div>
            <div className="kv-row">
              <span className="k">Status</span>
              <span className="v">
                <Badge>{activeUser.status}</Badge>
              </span>
            </div>
            <div className="kv-row">
              <span className="k">Reservations</span>
              <span className="v">{activeUser.reservations}</span>
            </div>
            <div className="kv-row">
              <span className="k">Joined</span>
              <span className="v">{activeUser.joined}</span>
            </div>
          </div>
        ) : null}
      </Modal>

      <Card className="mt-24">
        <CardHeader title="Bulk actions" sub="Apply changes to the filtered selection" />
        <div className="flex gap-8 wrap">
          <Button variant="outline" size="sm" icon="mail">
            Email selected
          </Button>
          <Button variant="outline" size="sm" icon="shield">
            Change role
          </Button>
          <Button variant="outline" size="sm" icon="download">
            Export CSV
          </Button>
          <Button variant="danger" size="sm" icon="trash">
            Suspend selected
          </Button>
        </div>
      </Card>
    </>
  );
}