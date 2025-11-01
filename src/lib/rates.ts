import { Rates, Corridor } from '@/types';

export const defaultRates: Rates = {
  SGD_PHP: 41.30,
  SGD_MYR: 3.50,
  asOf: new Date().toISOString(),
};

export function getRate(corridor: Corridor, rates: Rates = defaultRates): number {
  return rates[corridor];
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-SG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}
