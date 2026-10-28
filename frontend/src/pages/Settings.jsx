import { useState } from 'react';
import Icon from '../components/ui/Icon';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Alert from '../components/ui/Alert';
import PageHeader from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Field, Input, Select } from '../components/ui/Form';

const sections = [
  { id: 'general', label: 'General' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'security', label: 'Security' },
];

function ToggleRow({ title, desc, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="settings-row">
      <div className="info">
        <b>{title}</b>
        <span>{desc}</span>
      </div>
      <button
        type="button"
        className={`switch ${on ? 'on' : ''}`}
        onClick={() => setOn((v) => !v)}
        role="switch"
        aria-checked={on}
        aria-label={title}
      />
    </div>
  );
}

export default function Settings() {
  const [section, setSection] = useState('general');

  return (
    <>
      <PageHeader
        title="Settings"
        sub="Portal preferences and policy configuration. Everything here is a UI demonstration."
        actions={
          <Button variant="primary" icon="check">
            Save changes
          </Button>
        }
      />

      <div className="mb-24">
        <Tabs items={sections} active={section} onChange={setSection} />
      </div>

      {section === 'general' ? (
        <div className="split-layout">
          <div className="stack">
            <Card>
              <CardHeader title="Library details" sub="Shown across the portal and printed receipts" />
              <div className="form-grid">
                <Field label="Library name" htmlFor="s-name">
                  <Input id="s-name" defaultValue="BIT Central Library" />
                </Field>
                <Field label="Support email" htmlFor="s-email">
                  <Input id="s-email" defaultValue="library@bit.ac.in" />
                </Field>
                <Field label="Opening time" htmlFor="s-open">
                  <Input id="s-open" defaultValue="08:30 AM" />
                </Field>
                <Field label="Closing time" htmlFor="s-close">
                  <Input id="s-close" defaultValue="06:00 PM" />
                </Field>
                <Field label="Default reservation window" htmlFor="s-window" hint="Seats can be reserved only for tomorrow">
                  <Select id="s-window" defaultValue="Tomorrow only">
                    <option>Tomorrow only</option>
                    <option>Next 3 days</option>
                    <option>Next 7 days</option>
                  </Select>
                </Field>
                <Field label="Slots per day" htmlFor="s-slots">
                  <Input id="s-slots" defaultValue="4" readOnly />
                </Field>
              </div>
            </Card>

            <Card>
              <CardHeader title="Reservation rules" sub="Applied to every seat booking" />
              <ToggleRow title="Block overlapping bookings" desc="Reject a booking that clashes with an existing slot." defaultOn />
              <ToggleRow title="Require check-in" desc="Mark bookings as no-show if the user does not check in within 15 minutes." defaultOn />
              <ToggleRow title="Allow seat swapping" desc="Let students exchange confirmed seats with each other." />
              <ToggleRow title="Auto-release cancelled seats" desc="Return cancelled seats to the available pool immediately." defaultOn />
            </Card>
          </div>

          <div className="stack">
            <Card>
              <CardHeader title="Campus identity" />
              <div className="kv-list">
                <div className="kv-row">
                  <span className="k">Institute</span>
                  <span className="v">BIT</span>
                </div>
                <div className="kv-row">
                  <span className="k">SIS sync</span>
                  <span className="v">Nightly · 02:00 AM</span>
                </div>
                <div className="kv-row">
                  <span className="k">SSO provider</span>
                  <span className="v">Campus LDAP</span>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader title="Danger zone" />
              <div className="settings-row flush">
                <div className="info">
                  <b>Reset portal demo data</b>
                  <span>Restores all mock bookings, users and resources to their initial state.</span>
                </div>
                <Button variant="danger" size="sm" icon="refresh">
                  Reset
                </Button>
              </div>
            </Card>
          </div>
        </div>
      ) : null}

      {section === 'notifications' ? (
        <div className="split-layout">
          <Card>
            <CardHeader title="Notification preferences" sub="Choose what the portal alerts you about" />
            <ToggleRow title="Booking reminders" desc="Email and push reminder 30 minutes before a slot begins." defaultOn />
            <ToggleRow title="Cancellation alerts" desc="Notify me when my booking is cancelled by staff." defaultOn />
            <ToggleRow title="New resource digest" desc="Weekly email listing new e-books, papers and question papers." defaultOn />
            <ToggleRow title="Seat availability alerts" desc="Alert me when a preferred floor has free seats tomorrow." />
            <ToggleRow title="Library announcements" desc="Notices about timings, maintenance and exam-week hours." defaultOn />
          </Card>

          <Card>
            <CardHeader title="Delivery channels" />
            <div className="kv-list">
              <div className="kv-row">
                <span className="k">Campus email</span>
                <span className="v">Verified</span>
              </div>
              <div className="kv-row">
                <span className="k">SMS</span>
                <span className="v">Not enabled</span>
              </div>
              <div className="kv-row">
                <span className="k">In-app</span>
                <span className="v">Always on</span>
              </div>
            </div>
            <div className="card-footer">
              <Alert tone="info" title="Delivery pending backend">
                Notifications will be dispatched once the backend phase is connected.
              </Alert>
            </div>
          </Card>
        </div>
      ) : null}

      {section === 'appearance' ? (
        <div className="split-layout">
          <Card>
            <CardHeader title="Theme" sub="How the portal looks on your device" />
            <div className="settings-row">
              <div className="info">
                <b>Colour theme</b>
                <span>Light is the default academic theme for the portal.</span>
              </div>
              <div className="tabs">
                <button type="button" className="tab active">
                  Light
                </button>
                <button type="button" className="tab">
                  Dark
                </button>
                <button type="button" className="tab">
                  System
                </button>
              </div>
            </div>
            <ToggleRow title="Compact tables" desc="Reduce row height in management tables." />
            <ToggleRow title="Show seat labels" desc="Display seat codes inside each seat on the map." defaultOn />
            <ToggleRow title="Reduced motion" desc="Minimise transitions and animations." />
          </Card>

          <Card>
            <CardHeader title="Language & region" />
            <Field label="Interface language" htmlFor="s-lang">
              <Select id="s-lang" defaultValue="English (India)">
                <option>English (India)</option>
                <option>English (UK)</option>
                <option>Hindi</option>
              </Select>
            </Field>
            <Field label="Date format" htmlFor="s-date">
              <Select id="s-date" defaultValue="DD MMM YYYY">
                <option>DD MMM YYYY</option>
                <option>YYYY-MM-DD</option>
              </Select>
            </Field>
            <Field label="Time format" htmlFor="s-time">
              <Select id="s-time" defaultValue="12-hour (08:45 AM)">
                <option>12-hour (08:45 AM)</option>
                <option>24-hour (08:45)</option>
              </Select>
            </Field>
          </Card>
        </div>
      ) : null}

      {section === 'security' ? (
        <div className="split-layout">
          <div className="stack">
            <Card>
              <CardHeader title="Sign-in security" sub="Account protection options" />
              <div className="settings-row">
                <div className="info">
                  <b>Password</b>
                  <span>Last changed 45 days ago</span>
                </div>
                <Button variant="outline" size="sm" icon="lock">
                  Change
                </Button>
              </div>
              <ToggleRow title="Two-factor authentication" desc="Require a one-time code in addition to your password." />
              <ToggleRow title="Sign-in alerts" desc="Email me when a new device accesses my account." defaultOn />
              <ToggleRow title="Remember this device" desc="Stay signed in for 30 days on trusted devices." defaultOn />
            </Card>

            <Card>
              <CardHeader title="Active sessions" />
              <div className="list">
                <div className="list-item">
                  <span className="main">
                    <span className="icon-tile">
                      <Icon name="grid" size={16} />
                    </span>
                    <span>
                      <span className="title">Chrome · Windows</span>
                      <span className="sub">Current session · Bengaluru</span>
                    </span>
                  </span>
                  <Badge tone="success">This device</Badge>
                </div>
                <div className="list-item">
                  <span className="main">
                    <span className="icon-tile">
                      <Icon name="grid" size={16} />
                    </span>
                    <span>
                      <span className="title">Safari · iPhone</span>
                      <span className="sub">2 days ago · Bengaluru</span>
                    </span>
                  </span>
                  <button type="button" className="btn btn-ghost btn-sm">
                    Revoke
                  </button>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader title="Privacy" />
            <ToggleRow title="Profile visible to faculty" desc="Allow faculty to see your name in shared resource lists." defaultOn />
            <ToggleRow title="Booking history export" desc="Let librarians include my bookings in aggregate reports." defaultOn />
            <ToggleRow title="Personalised recommendations" desc="Suggest resources based on my downloads." />
            <div className="card-footer">
              <Alert tone="warning" title="Demo build">
                Security controls are visual only — authentication arrives in a later phase.
              </Alert>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
}