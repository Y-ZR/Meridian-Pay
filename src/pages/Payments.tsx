import { useState } from 'react';
import { usePayments } from '@/store/payments';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusPill } from '@/components/StatusPill';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Search, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/rates';
import { PaymentStatus } from '@/types';
import { toast } from 'sonner';

export default function Payments() {
  const { payments, beneficiaries } = usePayments();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'ALL'>('ALL');
  const [corridorFilter, setCorridorFilter] = useState<'ALL' | 'SGD_PHP' | 'SGD_MYR'>('ALL');

  const getBeneficiaryName = (id: string) => {
    const beneficiary = beneficiaries.find((b) => b.id === id);
    return beneficiary?.name || 'Unknown';
  };

  const getDestCurrency = (corridor: string) => {
    return corridor === 'SGD_PHP' ? 'PHP' : 'MYR';
  };

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      getBeneficiaryName(p.beneficiaryId).toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    const matchesCorridor = corridorFilter === 'ALL' || p.corridor === corridorFilter;
    return matchesSearch && matchesStatus && matchesCorridor;
  });

  const exportCSV = () => {
    const headers = ['Date', 'Beneficiary', 'Corridor', 'Destination Amount', 'Total SGD', 'Fee', 'Status', 'Reference'];
    const rows = filteredPayments.map((p) => [
      new Date(p.createdAt).toISOString(),
      getBeneficiaryName(p.beneficiaryId),
      p.corridor.replace('_', ' → '),
      p.destAmount,
      p.totalToPaySGD,
      p.feeSGD,
      p.status,
      p.reference,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meridian-payments-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  return (
    <main className="py-8">
      <div className="mx-auto max-w-7xl px-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all your cross-border payments
          </p>
        </div>
        <Button onClick={exportCSV} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </header>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>All Payments</CardTitle>
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as PaymentStatus | 'ALL')}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="IN_REVIEW">In Review</SelectItem>
                  <SelectItem value="SETTLING">Settling</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={corridorFilter} onValueChange={(v) => setCorridorFilter(v as any)}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Corridor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Corridors</SelectItem>
                  <SelectItem value="SGD_PHP">SGD → PHP</SelectItem>
                  <SelectItem value="SGD_MYR">SGD → MYR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPayments.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 text-center">
              <div className="rounded-full bg-muted p-4">
                <DollarSign className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">No payments found</p>
                <p className="text-sm text-muted-foreground">
                  {payments.length === 0
                    ? 'Get started by creating your first payment'
                    : 'Try adjusting your filters'}
                </p>
              </div>
              {payments.length === 0 && (
                <Link to="/send">
                  <Button>Send Payment</Button>
                </Link>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Beneficiary</TableHead>
                  <TableHead>Corridor</TableHead>
                  <TableHead className="text-right">Destination</TableHead>
                  <TableHead className="text-right">Total (SGD)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="text-sm text-muted-foreground">
                      <Link to={`/payments/${p.id}`}>
                        {new Date(p.createdAt).toLocaleDateString('en-SG', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Link>
                    </TableCell>
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
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {p.reference}
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
