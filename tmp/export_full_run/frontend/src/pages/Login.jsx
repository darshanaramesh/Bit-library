import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import { Field, Input } from '../components/ui/Form';
import { useAuth } from '../context/AuthContext';
import { validateInstitutionalEmail } from '../utils/institutionalEmail';

/**
 * Login page – BIT Central Library sign-in gate.
 *
 * Only @bitsathy.ac.in emails are accepted on the frontend. The same rule must
 * be enforced again by the backend when real authentication is implemented.
 *
 * After a successful mock sign-in the user is taken to /dashboard, which is the
 * main entry point for the library dashboard and all remaining library pages.
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError || submitted) setEmailError(validateInstitutionalEmail(value));
  };

  const handleEmailBlur = () => {
    if (email) {
      setEmailError(validateInstitutionalEmail(email));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const emailErr = validateInstitutionalEmail(email);
    setEmailError(emailErr);
    if (emailErr) return;

    if (!password.trim()) {
      return; // handled by the password Field below
    }

    // Mock login flow - never calls an API in this stage.
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginAs('student'); // demo role; real app would resolve the actual user
      navigate('/dashboard', { replace: true });
    }, 900);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* BIT branding at the top of the card */}
        <div className="login-brand">
          <span className="login-logo">
            <Icon name="library" size={24} />
          </span>
          <span className="login-portal-name">
            BIT Central Library
          </span>
        </div>

        <div className="login-head">
          <h1 className="login-title">Welcome Back!</h1>
          <p className="login-sub">
            Sign in to access your library services
          </p>
        </div>

        <form className="login-form" onSubmit={submit} noValidate>
          <Field
            label="Email Address"
            htmlFor="login-email"
          >
            <Input
              id="login-email"
              icon="mail"
              type="email"
              placeholder="Enter your BIT email address"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              autoComplete="username"
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? 'login-email-error' : undefined}
            />
            {emailError ? (
              <p id="login-email-error" className="login-field-error">
                {emailError}
              </p>
            ) : null}
          </Field>

          <Field
            label="Password"
            htmlFor="login-password"
          >
            <div className="login-password-field">
              <Input
                id="login-password"
                icon="lock"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                aria-describedby={submitted && !password.trim() ? 'login-password-error' : undefined}
              />
              <button
                type="button"
                className="login-swap"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                <Icon name={showPassword ? 'eyeOff' : 'eye'} size={17} />
              </button>
            </div>
            {submitted && !password.trim() ? (
              <p id="login-password-error" className="login-field-error">
                Please enter your password.
              </p>
            ) : null}
          </Field>

          <div className="login-row">
            <label className="login-check">
              <input type="checkbox" defaultChecked />
              Remember me
            </label>
            <Link to="/login" className="login-forgot">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            block
            icon={loading ? undefined : 'lock'}
            loading={loading}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>

        {/* Optional footer link */}
        <p className="login-alt">
          New to the portal? <Link to="/register">Create an account</Link>
        </p>

        {/* BIT institutional enforcement note - visible to anyone viewing the form */}
        <p className="login-domain-note">
          Only BIT institutional email accounts (@bitsathy.ac.in) are accepted.
        </p>

        <p className="login-fine">
          After you sign in, the dashboard becomes your entry point for seats, digital
          resources, bookings, the library assistant and your profile.
        </p>
      </div>
    </div>
  );
}
