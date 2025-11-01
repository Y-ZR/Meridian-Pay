import { useState } from 'react';
import { usePayments } from '@/store/payments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
import { Beneficiary } from '@/types';
import { toast } from 'sonner';

export default function Beneficiaries() {
  const { beneficiaries, upsertBeneficiary, deleteBeneficiary } = usePayments();
  const [isOpen, setIsOpen] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState<Beneficiary | null>(null);
  const [formData, setFormData] = useState({
    country: 'PH' as 'PH' | 'MY',
    name: '',
    bankName: '',
    accountNumber: '',
    email: '',
    bankCode: '',
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      country: 'PH',
      name: '',
      bankName: '',
      accountNumber: '',
      email: '',
      bankCode: '',
      notes: '',
    });
    setEditingBeneficiary(null);
  };

  const handleEdit = (beneficiary: Beneficiary) => {
    setFormData({
      country: beneficiary.country,
      name: beneficiary.name,
      bankName: beneficiary.bankName,
      accountNumber: beneficiary.accountNumber,
      email: beneficiary.email || '',
      bankCode: beneficiary.bankCode || '',
      notes: beneficiary.notes || '',
    });
    setEditingBeneficiary(beneficiary);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this beneficiary?')) {
      deleteBeneficiary(id);
      toast.success('Beneficiary deleted');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.bankName || !formData.accountNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Country-specific validation
    if (formData.country === 'PH') {
      if (!/^[0-9]{10,12}$/.test(formData.accountNumber)) {
        toast.error('PH account number must be 10-12 digits');
        return;
      }
    } else if (formData.country === 'MY') {
      if (!/^[0-9]{10,16}$/.test(formData.accountNumber)) {
        toast.error('MY account number must be 10-16 digits');
        return;
      }
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    upsertBeneficiary({
      ...(editingBeneficiary && { id: editingBeneficiary.id }),
      ...formData,
      email: formData.email || undefined,
      bankCode: formData.bankCode || undefined,
      notes: formData.notes || undefined,
    });

    toast.success(editingBeneficiary ? 'Beneficiary updated' : 'Beneficiary created');
    setIsOpen(false);
    resetForm();
  };

  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Beneficiaries</h1>
          <p className="text-muted-foreground mt-1">
            Manage your payment recipients for quick transactions
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Beneficiary
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBeneficiary ? 'Edit Beneficiary' : 'New Beneficiary'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select
                  value={formData.country}
                  onValueChange={(v) => setFormData({ ...formData, country: v as 'PH' | 'MY' })}
                >
                  <SelectTrigger id="country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PH">Philippines (PH)</SelectItem>
                    <SelectItem value="MY">Malaysia (MY)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Beneficiary Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full legal name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    placeholder={formData.country === 'PH' ? 'e.g., BDO Unibank' : 'e.g., Maybank'}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">
                    Account Number * {formData.country === 'PH' ? '(10-12 digits)' : '(10-16 digits)'}
                  </Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    placeholder={formData.country === 'PH' ? '012345678901' : '1234567890123'}
                    className="font-mono"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {formData.country === 'MY' && (
                <div className="space-y-2">
                  <Label htmlFor="bankCode">Bank Code (optional)</Label>
                  <Input
                    id="bankCode"
                    value={formData.bankCode}
                    onChange={(e) => setFormData({ ...formData, bankCode: e.target.value })}
                    placeholder="e.g., MBB, CIMB"
                    className="font-mono"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any additional notes..."
                  rows={3}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBeneficiary ? 'Update' : 'Create'} Beneficiary
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>All Beneficiaries</CardTitle>
        </CardHeader>
        <CardContent>
          {beneficiaries.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 text-center">
              <div className="rounded-full bg-muted p-4">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">No beneficiaries yet</p>
                <p className="text-sm text-muted-foreground">
                  Add your first beneficiary to start sending payments
                </p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {beneficiaries.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.name}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                        {b.country === 'PH' ? 'Philippines' : 'Malaysia'}
                      </span>
                    </TableCell>
                    <TableCell>{b.bankName}</TableCell>
                    <TableCell className="font-mono text-sm">{b.accountNumber}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {b.email || '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(b)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(b.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
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
