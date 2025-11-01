import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Settings() {
  const [companyName, setCompanyName] = useState('Your Company Pte Ltd');
  const [baseCurrency, setBaseCurrency] = useState('SGD');
  const [sgdPhpEnabled, setSgdPhpEnabled] = useState(true);
  const [sgdMyrEnabled, setSgdMyrEnabled] = useState(true);

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your business profile and payment preferences
        </p>
      </header>

      <div className="space-y-6">
        {/* Business Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Business Profile</CardTitle>
            <CardDescription>
              Your company information for payments and receipts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your Company Pte Ltd"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="baseCurrency">Base Currency</Label>
              <Input
                id="baseCurrency"
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                placeholder="SGD"
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Base currency cannot be changed
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Corridors */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Corridors</CardTitle>
            <CardDescription>
              Enable or disable specific payment corridors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sgd-php">SGD → PHP (Philippines)</Label>
                <p className="text-sm text-muted-foreground">
                  Send payments from Singapore to Philippines
                </p>
              </div>
              <Switch
                id="sgd-php"
                checked={sgdPhpEnabled}
                onCheckedChange={setSgdPhpEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sgd-myr">SGD → MYR (Malaysia)</Label>
                <p className="text-sm text-muted-foreground">
                  Send payments from Singapore to Malaysia
                </p>
              </div>
              <Switch
                id="sgd-myr"
                checked={sgdMyrEnabled}
                onCheckedChange={setSgdMyrEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Settings</CardTitle>
            <CardDescription>
              Number and currency formatting preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Number Format</Label>
              <Input value="en-SG (1,234.56)" disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Input value="DD/MM/YYYY" disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Time Zone</Label>
              <Input value="Asia/Singapore (UTC+8)" disabled className="bg-muted" />
            </div>
          </CardContent>
        </Card>

        {/* Compliance */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance & Security</CardTitle>
            <CardDescription>
              Security settings and compliance information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm font-medium mb-2">Demo Mode Active</p>
              <p className="text-xs text-muted-foreground">
                This is a demonstration environment. All payments are simulated and no real
                transactions are processed. In production, full KYC and AML compliance
                checks would be enforced.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </main>
  );
}
