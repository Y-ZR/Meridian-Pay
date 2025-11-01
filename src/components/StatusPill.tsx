import { PaymentStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusPillProps {
  status: PaymentStatus;
  className?: string;
}

const statusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  DRAFT: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
  QUOTED: { label: 'Quoted', className: 'bg-secondary text-secondary-foreground' },
  CONFIRMED: { label: 'Confirmed', className: 'bg-accent/10 text-accent border-accent/20' },
  IN_REVIEW: { label: 'In Review', className: 'bg-warning/10 text-warning border-warning/20' },
  SETTLING: { label: 'Settling', className: 'bg-warning/10 text-warning border-warning/20' },
  DELIVERED: { label: 'Delivered', className: 'bg-success/10 text-success border-success/20' },
  FAILED: { label: 'Failed', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export function StatusPill({ status, className }: StatusPillProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
