import { Link } from 'react-router-dom';
import { GalleryVerticalEnd } from 'lucide-react';

function Logo({ link = '/' }: { link?: string }) {
  return (
    <Link to={link} className="flex items-center gap-2 font-medium">
      <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
        <GalleryVerticalEnd className="size-4" />
      </div>
      IntelliPharm
    </Link>
  );
}

export default Logo;
