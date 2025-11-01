import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayments } from '@/store/payments';
import { Corridor, Quote } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency, formatNumber } from '@/lib/rates';

export default function SendPayment() {
  const navigate = useNavigate();
  const { beneficiaries, makeQuote, confirmPayment, advanceStatus } = usePayments();
  const [step, setStep] = useState(1);

  // Form state
  const [corridor, setCorridor] = useState<Corridor>('SGD_PHP');
  const [destAmount, setDestAmount] = useState('50000');
  const [beneficiaryId, setBeneficiaryId] = useState(beneficiaries[0]?.id || '');
  const [reference, setReference] = useState(`INV-${Date.now()}`);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const destCurrency = corridor === 'SGD_PHP' ? 'PHP' : 'MYR';
  const selectedBeneficiary = beneficiaries.find((b) => b.id === beneficiaryId);

  const handleGetQuote = () => {
    const amount = parseFloat(destAmount);
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (!beneficiaryId) {
      toast.error('Please select a beneficiary');
      return;
    }

    const newQuote = makeQuote({
      corridor,
      destAmount: amount,
      beneficiaryId,
    });

    setQuote(newQuote);
    setStep(2);
    toast.success('Quote generated successfully');
  };

  const handleConfirm = () => {
    if (!quote) return;

    const payment = confirmPayment(quote, reference, beneficiaryId);
    setPaymentId(payment.id);
    setStep(3);
    toast.success('Payment confirmed');

    // Simulate status progression
    setTimeout(() => advanceStatus(payment.id), 1200);
    setTimeout(() => advanceStatus(payment.id), 3500);
    setTimeout(() => {
      advanceStatus(payment.id);
      toast.success('Payment delivered successfully!');
    }, 6000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <main className="py-8">
      <div className="mx-auto max-w-7xl px-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Send Payment</h1>
        <p className="text-muted-foreground mt-1">
          Send cross-border payments with transparent pricing
        </p>
      </header>

      {/* Progress Steps */}
      <div className="flex items-center justify-center">
        {[
          { num: 1, label: 'Payment Details' },
          { num: 2, label: 'Review Quote' },
          { num: 3, label: 'Fund Payment' },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold text-base transition-all ${
                  step >= s.num
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-muted-foreground/30 bg-background text-muted-foreground'
                }`}
              >
                {step > s.num ? <CheckCircle2 className="h-6 w-6" /> : s.num}
              </div>
              <span
                className={`text-sm font-medium whitespace-nowrap ${
                  step >= s.num ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < 2 && (
              <div
                className={`mx-4 h-0.5 w-20 transition-colors ${
                  step > s.num ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Form */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Enter the amount and select a beneficiary for your payment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="corridor">Corridor</Label>
                <Select value={corridor} onValueChange={(v) => setCorridor(v as Corridor)}>
                  <SelectTrigger id="corridor">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SGD_PHP">SGD → PHP (Philippines)</SelectItem>
                    <SelectItem value="SGD_MYR">SGD → MYR (Malaysia)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficiary">Beneficiary</Label>
                <Select value={beneficiaryId} onValueChange={setBeneficiaryId}>
                  <SelectTrigger id="beneficiary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {beneficiaries.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name} ({b.country})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Destination Amount</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    value={destAmount}
                    onChange={(e) => setDestAmount(e.target.value)}
                    placeholder="50000"
                    className="pr-16 font-mono"
                    min="1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                    {destCurrency}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Payment Reference</Label>
                <Input
                  id="reference"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="INV-2025-0001"
                  className="font-mono"
                />
              </div>
            </div>

            {selectedBeneficiary && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>{selectedBeneficiary.name}</strong> •{' '}
                  {selectedBeneficiary.bankName} •{' '}
                  {selectedBeneficiary.accountNumber}
                </AlertDescription>
              </Alert>
            )}

            <Button onClick={handleGetQuote} size="lg" className="w-full md:w-auto">
              Get Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Quote */}
      {step === 2 && quote && (
        <Card>
          <CardHeader>
            <CardTitle>Your Quote</CardTitle>
            <CardDescription>
              Review the exchange rate and fees before confirming
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quote breakdown */}
            <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Exchange Rate</p>
                  <p className="text-lg font-semibold font-mono">
                    1 SGD = {formatNumber(quote.rate)} {destCurrency}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">No markup applied</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="text-lg font-semibold">{quote.eta}</p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono">{formatCurrency(quote.sourceNotionalSGD, 'SGD')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fee (0.75%, min S$3)</span>
                  <span className="font-mono">{formatCurrency(quote.feeSGD, 'SGD')}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-lg font-semibold">Total to Pay</span>
                  <span className="text-2xl font-bold font-mono">
                    {formatCurrency(quote.totalToPaySGD, 'SGD')}
                  </span>
                </div>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                A transparent <strong>0.75% processing fee</strong> applies (
                <strong>S$3 minimum</strong>). No FX markup.
              </AlertDescription>
            </Alert>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleConfirm} size="lg">
                Confirm Payment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Funding */}
      {step === 3 && quote && (
        <Card>
          <CardHeader>
            <CardTitle>Fund Your Payment</CardTitle>
            <CardDescription>
              Transfer funds using the details below to complete your payment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="bg-accent/5 border-accent">
              <Info className="h-4 w-4 text-accent" />
              <AlertDescription>
                Your payment has been confirmed and is being processed. Please fund within 24 hours.
              </AlertDescription>
            </Alert>

            <div className="rounded-lg border bg-card p-6 space-y-4">
              <h3 className="font-semibold">Bank Transfer Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Recipient</p>
                    <p className="font-medium">Meridian Pay Pte Ltd</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-xl font-bold font-mono">
                      {formatCurrency(quote.totalToPaySGD, 'SGD')}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(quote.totalToPaySGD.toString(), 'Amount')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Reference</p>
                    <p className="font-mono">{reference}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(reference, 'Reference')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">PayNow UEN</p>
                  <p className="font-mono">201912345Z</p>
                </div>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-xs">
                <strong>Sandbox mode:</strong> This is a demonstration. In production, you would complete
                the bank transfer and we would automatically detect and process your payment.
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => navigate('/payments')}
              size="lg"
              className="w-full"
            >
              View Payment Status
            </Button>
          </CardContent>
        </Card>
      )}
      </div>
    </main>
  );
}
