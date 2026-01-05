/**
 * @summary
 * Header component displaying sorveteria branding.
 * Shows logo, name, and slogan with responsive design.
 */

import { cn } from '@/core/lib/utils';
import type { SorveteriaHeaderProps } from './types';

function SorveteriaHeader({ sorveteria, className }: SorveteriaHeaderProps) {
  return (
    <header
      className={cn(
        'bg-card flex flex-col items-center gap-4 rounded-xl border p-8 shadow-sm',
        className
      )}
    >
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
        <img
          src={sorveteria.logotipo}
          alt={`Logo ${sorveteria.nomeSorveteria}`}
          className="size-24 md:size-32 rounded-lg object-contain shadow-md transition-transform hover:scale-105"
          loading="eager"
        />
        <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {sorveteria.nomeSorveteria}
          </h1>
          {sorveteria.slogan && (
            <p className="text-muted-foreground text-lg italic">{sorveteria.slogan}</p>
          )}
        </div>
      </div>
    </header>
  );
}

export { SorveteriaHeader };
