import { usePayments } from '@/store/payments';
import { Link } from 'react-router-dom';
import { StatCard } from '@/components/StatCard';
import { StatusPill } from '@/components/StatusPill';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, Clock, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/rates';

export default function Dashboard() {
  const { payments, beneficiaries } = usePayments();
  const last10 = payments.slice(0, 10);

  // Calculate stats
  const volume30d = payments
    .filter((p) => Date.now() - new Date(p.createdAt).getTime() < 30 * 864e5)
    .reduce((a, b) => a + b.totalToPaySGD, 0);

  const inTransit = payments.filter((p) => !['DELIVERED', 'FAILED'].includes(p.status)).length;

  const avgFee =
    payments.length > 0
      ? payments.reduce((a, b) => a + b.feeSGD, 0) / payments.length
      : 0;

  const getDestCurrency = (corridor: string) => {
    return corridor === 'SGD_PHP' ? 'PHP' : 'MYR';
  };

  const getBeneficiaryName = (id: string) => {
    const beneficiary = beneficiaries.find((b) => b.id === id);
    return beneficiary?.name || 'Unknown';
  };

  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-6 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your cross-border payments and track performance
          </p>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="30-Day Volume"
          value={formatCurrency(volume30d, 'SGD')}
          icon={TrendingUp}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="In Transit"
          value={inTransit}
          icon={Clock}
        />
        <StatCard
          title="Avg Fee"
          value={formatCurrency(avgFee, 'SGD')}
          icon={DollarSign}
        />
      </section>

      {/* Recent Payments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Recent Payments</CardTitle>
          <Link
            to="/payments"
            className="text-sm font-medium text-accent hover:underline"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent>
          {last10.length === 0 ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 text-center">
              <div className="rounded-full bg-muted p-4">
                <DollarSign className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">No payments yet</p>
                <p className="text-sm text-muted-foreground">
                  Get started by creating your first payment
                </p>
              </div>
              <Link
                to="/send"
                className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Send Payment
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Beneficiary</TableHead>
                  <TableHead>Corridor</TableHead>
                  <TableHead className="text-right">Destination</TableHead>
                  <TableHead className="text-right">Total (SGD)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {last10.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <Link to={`/payments/${p.id}`} className="hover:underline">
                        {getBeneficiaryName(p.beneficiaryId)}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs">
                        {p.corridor.replace('_', ' → ')}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {p.destAmount.toLocaleString()} {getDestCurrency(p.corridor)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {formatCurrency(p.totalToPaySGD, 'SGD')}
                    </TableCell>
                    <TableCell>
                      <StatusPill status={p.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(p.createdAt).toLocaleDateString('en-SG', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      </div>
    </main>
  );
}
