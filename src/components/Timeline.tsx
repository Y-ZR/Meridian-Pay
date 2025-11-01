import { PaymentStatus } from '@/types';
import { cn } from '@/lib/utils';
import { Check, Clock, AlertCircle } from 'lucide-react';

interface TimelineProps {
  timeline: { status: PaymentStatus; at: string }[];
  className?: string;
}

const statusOrder: PaymentStatus[] = ['CONFIRMED', 'IN_REVIEW', 'SETTLING', 'DELIVERED'];

const statusLabels: Record<PaymentStatus, string> = {
  DRAFT: 'Draft',
  QUOTED: 'Quoted',
  CONFIRMED: 'Payment Confirmed',
  IN_REVIEW: 'Under Review',
  SETTLING: 'Settling',
  DELIVERED: 'Delivered',
  FAILED: 'Failed',
};

export function Timeline({ timeline, className }: TimelineProps) {
  const currentStatus = timeline[timeline.length - 1]?.status;
  const currentIndex = statusOrder.indexOf(currentStatus);
  
  const getStatusState = (status: PaymentStatus): 'completed' | 'current' | 'pending' => {
    const statusIndex = statusOrder.indexOf(status);
    if (statusIndex < currentIndex) return 'completed';
    if (statusIndex === currentIndex) return 'current';
    return 'pending';
  };
  
  const getTimestamp = (status: PaymentStatus): string | null => {
    const entry = timeline.find((t) => t.status === status);
    if (!entry) return null;
    return new Date(entry.at).toLocaleString('en-SG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className={cn('space-y-4', className)} role="list">
      {statusOrder.map((status, index) => {
        const state = getStatusState(status);
        const timestamp = getTimestamp(status);
        const isLast = index === statusOrder.length - 1;
        
        return (
          <div key={status} className="relative flex gap-4">
            {/* Line connector */}
            {!isLast && (
              <div
                className={cn(
                  'absolute left-5 top-10 h-full w-0.5 transition-colors duration-300',
                  state === 'completed' ? 'bg-success' : 'bg-border'
                )}
              />
            )}
            
            {/* Icon */}
            <div className="relative z-10 flex-shrink-0">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                  state === 'completed' && 'border-success bg-success text-success-foreground',
                  state === 'current' && 'border-accent bg-accent text-accent-foreground animate-pulse',
                  state === 'pending' && 'border-border bg-background text-muted-foreground'
                )}
              >
                {state === 'completed' && <Check className="h-5 w-5" />}
                {state === 'current' && <Clock className="h-5 w-5" />}
                {state === 'pending' && <div className="h-2 w-2 rounded-full bg-muted-foreground" />}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 pt-1.5">
              <div className="flex items-center justify-between">
                <h4
                  className={cn(
                    'text-sm font-medium transition-colors',
                    state === 'completed' && 'text-foreground',
                    state === 'current' && 'text-accent',
                    state === 'pending' && 'text-muted-foreground'
                  )}
                >
                  {statusLabels[status]}
                </h4>
                {timestamp && (
                  <span className="text-xs text-muted-foreground">{timestamp}</span>
                )}
              </div>
              {state === 'current' && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {status === 'IN_REVIEW' && "We're reviewing your payment details"}
                  {status === 'SETTLING' && 'Your payment is being processed'}
                  {status === 'DELIVERED' && 'Payment completed successfully'}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
