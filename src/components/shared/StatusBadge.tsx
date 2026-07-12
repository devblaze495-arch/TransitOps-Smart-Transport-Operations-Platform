import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: 'Active' | 'Available' | 'In Maintenance' | 'Inactive' | string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  Active: 'bg-success/10 text-success',
  Available: 'bg-success/10 text-success',
  'In Maintenance': 'bg-amber-100 text-amber-700',
  Inactive: 'bg-slate-100 text-slate-600',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const badgeClass = statusStyles[status] ?? 'bg-slate-100 text-slate-600';

  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', badgeClass, className)}>
      {status}
    </span>
  );
}
