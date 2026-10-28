import Icon from './Icon';

/** Field – label + control wrapper with optional hint. */
export function Field({ label, hint, error, htmlFor, children }) {
  return (
    <div className="field">
      {label ? <label htmlFor={htmlFor}>{label}</label> : null}
      {children}
      {hint && !error ? <p className="field-hint">{hint}</p> : null}
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  );
}

export function Input({ icon, className = '', ...rest }) {
  if (icon) {
    return (
      <div className="input-wrap">
        <span className="lead-icon">
          <Icon name={icon} size={17} />
        </span>
        <input className={`input ${className}`} {...rest} />
      </div>
    );
  }
  return <input className={`input ${className}`} {...rest} />;
}

export function Select({ className = '', children, ...rest }) {
  return (
    <select className={`select ${className}`} {...rest}>
      {children}
    </select>
  );
}

export function Textarea({ className = '', ...rest }) {
  return <textarea className={`textarea ${className}`} {...rest} />;
}

/** SearchBar – icon input used in toolbars. */
export function SearchBar({ value, onChange, placeholder = 'Search…', ariaLabel }) {
  return (
    <div className="search-bar">
      <Input
        icon="search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel || placeholder}
      />
    </div>
  );
}