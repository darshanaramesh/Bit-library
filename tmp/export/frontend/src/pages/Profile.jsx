import { useState } from 'react';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Alert from '../components/ui/Alert';
import PageHeader from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Field, Input, Select, Textarea } from '../components/ui/Form';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { profile } = useAuth();
  const [saved, setSaved] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 4000);
  };

  return (
    <>
      <PageHeader
        title="My Profile"
        sub="Your library membership details and account preferences."
        actions={
          <Badge tone="primary" plain>
            {profile.libraryId}
          </Badge>
        }
      />

      <div className="profile-hero">
        <Avatar name={profile.name} initials={profile.initials} size="lg" />
        <div>
          <h2>{profile.name}</h2>
          <div className="who">
            {profile.roleLabel} · {profile.department}
          </div>
          <div className="chips">
            <span className="chip">{profile.userId}</span>
            <span className="chip">{profile.year}</span>
            <span className="chip">Member since {profile.joined}</span>
          </div>
        </div>
        <div className="hero-actions">
          <button type="button" className="btn btn-outline">
            <Icon name="edit" size={16} />
            Edit photo
          </button>
        </div>
      </div>

      <div className="split-layout">
        <Card>
          <CardHeader
            title="Personal information"
            sub="Fields marked with a lock come from the campus records"
            action={
              <Button
                variant="primary"
                size="sm"
                icon="check"
                form="profile-form"
                type="submit"
              >
                Save changes
              </Button>
            }
          />

          {saved ? (
            <div className="mb-16">
              <Alert tone="success" title="Saved (demo)">
                Your changes were stored in component state only — nothing was persisted.
              </Alert>
            </div>
          ) : null}

          <form id="profile-form" onSubmit={submit}>
            <div className="form-grid">
              <Field label="Full name" htmlFor="pf-name">
                <Input id="pf-name" defaultValue={profile.name} />
              </Field>
              <Field label="Campus ID" htmlFor="pf-id">
                <Input id="pf-id" defaultValue={profile.userId} readOnly hint="Managed by the registrar" />
              </Field>
              <Field label="Email" htmlFor="pf-email">
                <Input id="pf-email" type="email" defaultValue={profile.email} />
              </Field>
              <Field label="Phone" htmlFor="pf-phone">
                <Input id="pf-phone" defaultValue={profile.phone} />
              </Field>
              <Field label="Department" htmlFor="pf-dept">
                <Input id="pf-dept" defaultValue={profile.department} />
              </Field>
              <Field label="Designation / Year" htmlFor="pf-year">
                <Input id="pf-year" defaultValue={profile.year} />
              </Field>
              <Field label="Blood group" htmlFor="pf-blood">
                <Select id="pf-blood" defaultValue={profile.bloodGroup}>
                  {[profile.bloodGroup, 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((v, i) => (
                    <option key={`${v}-${i}`}>{v}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Library ID" htmlFor="pf-lib">
                <Input id="pf-lib" defaultValue={profile.libraryId} readOnly />
              </Field>
              <div className="span-2">
                <Field label="Bio / research interests" htmlFor="pf-bio" hint="Shown to librarians on shared resources">
                  <Textarea
                    id="pf-bio"
                    placeholder="Tell the library a little about your interests…"
                    defaultValue="Systems programming, digital libraries and applied machine learning."
                  />
                </Field>
              </div>
            </div>
          </form>
        </Card>

        <div className="stack">
          <Card>
            <CardHeader title="Library statistics" sub="This semester" />
            <div className="mini-stats">
              <div className="mini-stat">
                <b>12</b>
                <span>Reservations</span>
              </div>
              <div className="mini-stat">
                <b>28</b>
                <span>Downloads</span>
              </div>
              <div className="mini-stat">
                <b>46 h</b>
                <span>Study time</span>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Membership" />
            <div className="kv-list">
              <div className="kv-row">
                <span className="k">Status</span>
                <span className="v">
                  <Badge>Active</Badge>
                </span>
              </div>
              <div className="kv-row">
                <span className="k">Role</span>
                <span className="v">{profile.roleLabel}</span>
              </div>
              <div className="kv-row">
                <span className="k">Borrowing limit</span>
                <span className="v">5 books / 14 days</span>
              </div>
              <div className="kv-row">
                <span className="k">Daily seat slots</span>
                <span className="v">Up to 2 per day</span>
              </div>
              <div className="kv-row">
                <span className="k">Restricted access</span>
                <span className="v text-warning">Per matrix</span>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Connected services" />
            <div className="list">
              <div className="list-item">
                <span className="main">
                  <span className="icon-tile">
                    <Icon name="mail" size={16} />
                  </span>
                  <span>
                    <span className="title">Campus email</span>
                    <span className="sub">{profile.email}</span>
                  </span>
                </span>
                <Badge>Active</Badge>
              </div>
              <div className="list-item">
                <span className="main">
                  <span className="icon-tile">
                    <Icon name="shield" size={16} />
                  </span>
                  <span>
                    <span className="title">Two-factor sign in</span>
                    <span className="sub">Not configured</span>
                  </span>
                </span>
                <Badge tone="neutral">Off</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}