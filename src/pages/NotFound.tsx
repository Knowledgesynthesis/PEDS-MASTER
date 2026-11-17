import { Link } from 'react-router-dom';
import { buttonClass } from '@/components/ui/buttonClass';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md space-y-4 py-16 text-center">
      <p className="text-5xl font-bold text-primary">404</p>
      <p className="text-muted-foreground">That page does not exist.</p>
      <Link to="/" className={buttonClass()}>
        Back to home
      </Link>
    </div>
  );
}
