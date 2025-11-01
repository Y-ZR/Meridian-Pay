import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Receipt, Users, Settings, ArrowUpRight, Globe, Shield, DollarSign } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isContactPage = location.pathname === '/contact';
  const isPublicPage = isLandingPage || isContactPage;
  
  const appNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/payments', label: 'Payments', icon: Receipt },
    { href: '/beneficiaries', label: 'Beneficiaries', icon: Users },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  const landingNavItems = [
    { href: '#corridors', label: 'Corridors' },
    { href: '#why-us', label: 'Why Us' },
    { href: '#fees', label: 'Fees' },
    { href: '/contact', label: 'Contact Us' },
  ];
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-sm">
              <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Meridian</span>
          </Link>
        </div>

        {/* Center: Navigation Items */}
        <div className="flex-1 flex items-center justify-center">
          {isPublicPage ? (
            <div className="hidden md:flex items-center gap-1">
              {landingNavItems.map((item) => {
                const isExternal = item.href.startsWith('#');
                const isActive = location.pathname === item.href;
                
                if (isExternal) {
                  return (
                    <a
                      key={item.href}
                      href={isLandingPage ? item.href : '/' + item.href}
                      className={cn(
                        'rounded-lg px-3 py-2 text-sm font-medium transition-all',
                        'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                      )}
                    >
                      {item.label}
                    </a>
                  );
                }
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-secondary text-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-1">
              {appNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-secondary text-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Action Button */}
        <div className="flex items-center">
          <Button asChild size="default" className="shadow-sm">
            {isPublicPage ? (
              <Link to="/dashboard">Get Started</Link>
            ) : (
              <Link to="/send">Send Payment</Link>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
