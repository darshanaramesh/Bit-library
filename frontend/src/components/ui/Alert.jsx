import Icon from './Icon';

const icons = {
  info: 'info',
  success: 'circleCheck',
  warning: 'alert',
  danger: 'alert',
};

/** Alert – inline message banner in four tones. */
export default function Alert({ tone = 'info', title, children, className = '' }) {
  return (
    <div className={`alert alert-${tone} ${className}`}>
      <Icon name={icons[tone] || 'info'} size={18} />
      <div>
        {title ? <div className="alert-title">{title}</div> : null}
        <div>{children}</div>
      </div>
    </div>
  );
}