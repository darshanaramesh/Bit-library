import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { Field, Input, Select } from '../components/ui/Form';
import { useAuth } from '../context/AuthContext';

const departments = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Library & Information Science',
  'Faculty / Research',
];

const points = [
  'Register once and use the portal on any device',
  'Your role decides which resources you can view or download',
  'Book up to four slots a day across six floors',
  'Track every reservation from My Bookings',
];

export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState('Student');
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const continueToLogin = () => {
    loginAs(role === 'Faculty' ? 'faculty' : 'student');
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <aside className="auth-panel">
        <span className="eyebrow">
          <Icon name="sparkles" size={14} />
          Join the library
        </span>
        <h2>Create your library account</h2>
        <p className="lead">
          Registration takes less than a minute and unlocks seat reservations plus the full
          digital catalogue.
        </p>

        <ul className="auth-points">
          {points.map((p) => (
            <li className="auth-point" key={p}>
              <span className="tick">
                <Icon name="check" size={13} />
              </span>
              {p}
            </li>
          ))}
        </ul>

        <blockquote className="auth-quote">
          “Seats can be reserved only for tomorrow — it keeps the reading hall fair for everyone
          during exam weeks.”
          <b>— Library policy note</b>
        </blockquote>
      </aside>

      <div className="auth-form-wrap">
        <div className="auth-card">
          <Link to="/" className="back-link">
            <Icon name="chevronLeft" size={16} />
            Back to home
          </Link>

          <h1 className="auth-title">Create account</h1>
          <p className="auth-sub">Fill in your details to register with the Central Library.</p>

          {submitted ? (
            <div className="mt-24">
              <Alert tone="success" title="Registration submitted (demo)">
                Your registration form was captured by the UI. No data was sent anywhere — connect
                the backend in a later phase to persist accounts.
              </Alert>
              <div className="flex gap-12 mt-16 wrap">
                <Button variant="primary" icon="logout" onClick={continueToLogin}>
                  Continue to login
                </Button>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Edit details
                </Button>
              </div>
            </div>
          ) : (
            <form className="auth-form" onSubmit={submit}>
              <div className="form-grid">
                <div className="span-2">
                  <Field label="Full name" htmlFor="reg-name">
                    <Input id="reg-name" icon="user" placeholder="e.g. Aarav Sharma" required />
                  </Field>
                </div>

                <div className="span-2">
                  <Field label="Email" htmlFor="reg-email">
                    <Input id="reg-email" icon="mail" type="email" placeholder="you@bit.ac.in" required />
                  </Field>
                </div>

                <Field label="Register as" htmlFor="reg-role">
                  <Select
                    id="reg-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>Student</option>
                    <option>Faculty</option>
                  </Select>
                </Field>

                <Field label="Roll / Employee no." htmlFor="reg-id">
                  <Input id="reg-id" placeholder="BIT/CS/2026/102" required />
                </Field>

                <div className="span-2">
                  <Field label="Department" htmlFor="reg-dept">
                    <Select id="reg-dept" defaultValue={departments[0]}>
                      {departments.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </Select>
                  </Field>
                </div>

                <Field label="Password" htmlFor="reg-pass" hint="Minimum 8 characters">
                  <Input id="reg-pass" icon="lock" type="password" placeholder="••••••••" required />
                </Field>

                <Field label="Confirm password" htmlFor="reg-pass2">
                  <Input id="reg-pass2" icon="lock" type="password" placeholder="••••••••" required />
                </Field>
              </div>

              <label className="checkbox-row mb-16 mt-8">
                <input type="checkbox" required />
                <span>
                  I agree to the library rules, including that seats may be reserved only for
                  tomorrow and that overlapping bookings are not allowed.
                </span>
              </label>

              <Button type="submit" size="lg" block icon="check">
                Create account
              </Button>
            </form>
          )}

          <p className="auth-alt">
            Already registered? <Link to="/login">Log in instead</Link>
          </p>

          <p className="demo-note">
            UI demonstration only — no account is created and no data leaves the browser.
          </p>
        </div>
      </div>
    </div>
  );
}