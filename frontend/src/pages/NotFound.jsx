import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';

export default function NotFound() {
  return (
    <div className="page not-found flex col center items-center text-center">
      <div className="icon-tile">
        <Icon name="alert" size={30} />
      </div>
      <h1 className="mt-16">404 — Page not found</h1>
      <p className="muted mt-8">
        The page you are looking for does not exist or may have been moved. Head back to the
        portal home to continue.
      </p>
      <div className="flex gap-12 mt-24 wrap center">
        <Link to="/" className="btn btn-primary">
          <Icon name="home" size={17} />
          Back to home
        </Link>
        <Link to="/resources" className="btn btn-outline">
          Browse resources
        </Link>
      </div>
    </div>
  );
}