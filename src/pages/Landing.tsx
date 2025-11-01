import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ArrowRight,
  ArrowUpRight, 
  Shield, 
  Zap, 
  Globe, 
  TrendingDown, 
  Clock, 
  CheckCircle2,
  DollarSign,
  Users,
  BarChart3
} from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Send payments in minutes with instant quotes and real-time tracking'
    },
    {
      icon: TrendingDown,
      title: 'Low Fees',
      description: 'Just 0.75% transparent fee with no hidden FX markups'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Bank-grade security with full regulatory compliance'
    },
    {
      icon: Globe,
      title: 'Multi-Corridor',
      description: 'Send SGD to Philippines (PHP) and Malaysia (MYR)'
    },
    {
      icon: Clock,
      title: 'Real-Time Tracking',
      description: 'Monitor every payment from quote to delivery'
    },
    {
      icon: Users,
      title: 'Beneficiary Management',
      description: 'Save recipients for quick and easy repeat payments'
    }
  ];

  const corridors = [
    {
      from: 'SGD',
      to: 'PHP',
      country: 'Philippines',
      rate: '41.30',
      eta: '≈ 10 min',
      flag: '🇵🇭'
    },
    {
      from: 'SGD',
      to: 'MYR',
      country: 'Malaysia',
      rate: '3.50',
      eta: 'T+1',
      flag: '🇲🇾'
    }
  ];

  const benefits = [
    'No hidden fees or FX markup',
    'Transparent pricing every time',
    'Real-time exchange rates',
    'Fast delivery times',
    'Secure payments',
    'Easy to use dashboard'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-background to-muted/20" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 flex items-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-accent/10 border-accent/20 px-4 py-1.5 text-sm">
              <TrendingDown className="h-4 w-4 text-accent" />
              <span className="font-medium text-accent">Only 0.75% Fee • No Hidden Costs</span>
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6 leading-tight">
              Send Money to{' '}
              <span className="">
                Philippines & Malaysia
              </span>{' '}
              for{' '}
              <span 
                className="bg-gradient-to-r from-blue-600 via-purple-500 via-pink-500 to-blue-600 bg-clip-text text-transparent"
                style={{
                  backgroundSize: '300% auto',
                  animation: 'gradient 5s linear infinite'
                }}
              >
                Just 0.75% Fee
              </span>
            </h1>
            <style>{`
              @keyframes gradient {
                0% {
                  background-position: 0% center;
                }
                100% {
                  background-position: 300% center;
                }
              }
            `}</style>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Save money on every transfer. Transparent pricing, real-time exchange rates, 
              and lightning-fast delivery from Singapore.
            </p>

            {/* Savings Highlight */}
            <div className="mb-8 mx-auto max-w-3xl">
              <Card className="bg-gradient-to-br from-accent/5 via-background to-primary/5 border-accent/20 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center gap-12 mb-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-muted-foreground mb-2">Traditional Banks</div>
                      <div className="text-4xl font-bold text-muted-foreground line-through opacity-60">3-5%</div>
                      <div className="text-xs text-muted-foreground mt-1">Hidden Fees</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <ArrowRight className="h-8 w-8 text-accent animate-pulse" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-accent mb-2">Meridian Pay</div>
                      <div 
                        className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 via-pink-500 to-blue-600 bg-clip-text text-transparent"
                        style={{
                          backgroundSize: '300% auto',
                          animation: 'gradient 5s linear infinite'
                        }}
                      >
                        0.75%
                      </div>
                      <div className="text-xs text-accent font-medium mt-1">No Markup</div>
                    </div>
                  </div>
                  <div className="text-center py-4 border-t border-accent/10">
                    <p className="text-base text-muted-foreground">
                      <span className="font-bold text-accent text-lg">Save up to 85%</span> on transaction fees compared to traditional banks
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Button */}
            <div className="mb-12">
              <Button asChild size="lg" className="text-base shadow-lg hover:shadow-xl transition-all">
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                <CheckCircle2 className="inline h-4 w-4 text-primary mr-1" />
                No credit card required
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">0.75%</div>
                <div className="text-sm text-muted-foreground">Transaction Fee</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">~10min</div>
                <div className="text-sm text-muted-foreground">Average Delivery</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">2</div>
                <div className="text-sm text-muted-foreground">Active Corridors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Corridors Section */}
      <section id="corridors" className="py-24 bg-muted/30 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Available Payment Corridors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Send money from Singapore with the lowest fees and best exchange rates
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {corridors.map((corridor) => (
              <Card key={corridor.to} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-4xl">{corridor.flag}</span>
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {corridor.eta}
                    </div>
                  </div>
                  <CardTitle className="text-2xl">
                    {corridor.from} → {corridor.to}
                  </CardTitle>
                  <CardDescription className="text-base">
                    Send to {corridor.country}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold font-mono">1 {corridor.from}</span>
                    <span className="text-muted-foreground">=</span>
                    <span className="text-3xl font-bold font-mono text-primary">
                      {corridor.rate} {corridor.to}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>No FX markup</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>0.75% flat fee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="why-us" className="py-24 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Why Choose Meridian Pay?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for businesses and individuals who need reliable, transparent cross-border payments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-muted hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="fees" className="py-24 bg-muted/30 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                The Lowest Fees, Guaranteed
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Why pay 3-5% to banks when you can save with Meridian Pay? Get complete transparency 
                with just 0.75% per transaction. No hidden fees, no confusing exchange rates, no surprises.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button asChild size="lg">
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <Card className="shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Payment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Exchange Rate</span>
                      <span className="font-mono">1 SGD = 41.30 PHP</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount to Send</span>
                      <span className="font-mono">50,000 PHP</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal (SGD)</span>
                      <span className="font-mono">S$ 1,210.65</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fee (0.75%)</span>
                      <span className="font-mono">S$ 9.08</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold">
                      <span>Total to Pay</span>
                      <span className="text-xl font-mono text-primary">S$ 1,219.73</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-muted/50 p-4 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        No hidden fees. No FX markup. What you see is what you pay.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center rounded-full bg-accent/10 p-4 mb-6">
              <DollarSign className="h-8 w-8 text-accent" />
            </div>
            
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Ready to Save on Every Transfer?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands saving up to 85% on fees. Send your first payment in minutes 
              and experience the Meridian Pay difference.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="/dashboard" className="hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-foreground transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="/send" className="hover:text-foreground transition-colors">
                    Send Payment
                  </Link>
                </li>
                <li>
                  <Link to="/payments" className="hover:text-foreground transition-colors">
                    Payments
                  </Link>
                </li>
                <li>
                  <Link to="/beneficiaries" className="hover:text-foreground transition-colors">
                    Beneficiaries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="/dashboard" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-foreground transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="/dashboard" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-foreground transition-colors">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">Meridian Pay</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Meridian Pay. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

