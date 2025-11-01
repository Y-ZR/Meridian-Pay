import { useParams, Link } from 'react-router-dom';
import { usePayments } from '@/store/payments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/StatusPill';
import { Timeline } from '@/components/Timeline';
import { ArrowLeft, Download, Copy } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/rates';
import { toast } from 'sonner';

export default function PaymentDetail() {
  const { id } = useParams<{ id: string }>();
  const { payments, beneficiaries } = usePayments();
  
  const payment = payments.find((p) => p.id === id);
  const beneficiary = payment ? beneficiaries.find((b) => b.id === payment.beneficiaryId) : null;
  
  if (!payment) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl px-6 py-8">
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-3 text-center">
          <h2 className="text-2xl font-bold">Payment Not Found</h2>
          <p className="text-muted-foreground">
            The payment you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/payments">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payments
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const destCurrency = payment.corridor === 'SGD_PHP' ? 'PHP' : 'MYR';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const downloadReceipt = () => {
    toast.success('Receipt downloaded (demo)');
  };

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/payments">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payment Details</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              ID: {payment.id}
            </p>
          </div>
        </div>
        <Button onClick={downloadReceipt} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Receipt
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Payment Information</CardTitle>
                <StatusPill status={payment.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Section */}
              <div className="rounded-lg border bg-muted/30 p-6">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-4xl font-bold font-mono">
                    {formatCurrency(payment.totalToPaySGD, 'SGD')}
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-mono">
                      {formatCurrency(payment.sourceNotionalSGD, 'SGD')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee (0.75%)</span>
                    <span className="font-mono">{formatCurrency(payment.feeSGD, 'SGD')}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-medium">
                    <span>Recipient Gets</span>
                    <span className="font-mono">
                      {payment.destAmount.toLocaleString()} {destCurrency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Exchange Rate</p>
                  <p className="font-mono text-lg">
                    1 SGD = {formatNumber(payment.rate)} {destCurrency}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">No markup</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                  <p className="font-medium">{payment.eta}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Reference</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm">{payment.reference}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => copyToClipboard(payment.reference, 'Reference')}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created</p>
                  <p className="text-sm">
                    {new Date(payment.createdAt).toLocaleString('en-SG', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline timeline={payment.timeline} />
            </CardContent>
          </Card>
        </div>

        {/* Beneficiary Info */}
        <div className="space-y-6">
          {beneficiary && (
            <Card>
              <CardHeader>
                <CardTitle>Beneficiary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="font-medium">{beneficiary.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bank</p>
                  <p className="font-medium">{beneficiary.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Account Number</p>
                  <p className="font-mono text-sm">{beneficiary.accountNumber}</p>
                </div>
                {beneficiary.email && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-sm">{beneficiary.email}</p>
                  </div>
                )}
                {beneficiary.bankCode && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Bank Code</p>
                    <p className="font-mono text-sm">{beneficiary.bankCode}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Country</p>
                  <p className="font-medium">
                    {beneficiary.country === 'PH' ? 'Philippines' : 'Malaysia'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Payment Corridor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-3 py-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <span className="font-bold text-primary">SGD</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Singapore</span>
                </div>
                <div className="h-0.5 w-12 bg-border" />
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <span className="font-bold text-primary">{destCurrency}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {payment.corridor === 'SGD_PHP' ? 'Philippines' : 'Malaysia'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
