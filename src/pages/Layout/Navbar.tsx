import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export function Navbar() {
  return (
    <nav className="p-4">
      <div className="flex justify-between items-center">
        <Link to="/">
          <Button
            variant="ghost"
            className="text-neutral-500 text-lg font-semibold"
          >
            My App
          </Button>
        </Link>

        <div>
          <Link to="/playground">
            <Button variant="ghost" className="text-neutral-500">
              Playground
            </Button>
          </Link>
          <Link to="/techstack">
            <Button variant="ghost" className="text-neutral-500">
              Tech Stack
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
