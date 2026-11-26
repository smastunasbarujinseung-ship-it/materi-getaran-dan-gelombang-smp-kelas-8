import { useState } from 'react';
import { Atom } from 'lucide-react';

interface PhysicsImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
}

export function PhysicsImage({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[4/3]',
}: PhysicsImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 text-center ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <Atom className="mb-2 h-10 w-10 text-blue-600" aria-hidden="true" />
        <p className="max-w-xs text-xs font-medium text-slate-600">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`rounded-2xl border border-slate-200/80 object-cover ${aspectClass} ${className}`}
    />
  );
}
