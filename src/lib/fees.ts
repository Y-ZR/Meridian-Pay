import { Corridor, Quote, QuoteInput } from '@/types';
import { getRate } from './rates';
import { nanoid } from 'nanoid';

const FEE_BPS = 0.0075; // 0.75%
const FEE_FLOOR_SGD = 3;

function notionalSGD(destAmount: number, rateDestPerSGD: number): number {
  // destAmount = sourceSGD * rate  =>  sourceSGD = destAmount / rate
  return destAmount / rateDestPerSGD;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function computeQuote(input: QuoteInput): Quote {
  const rate = getRate(input.corridor);
  const sourceSGD = notionalSGD(input.destAmount, rate);
  const fee = Math.max(sourceSGD * FEE_BPS, FEE_FLOOR_SGD);
  const total = sourceSGD + fee;

  const eta = total > 50000 ? 'T+1 (compliance review)' : '≈ 10 minutes';

  return {
    id: nanoid(),
    corridor: input.corridor,
    rate,
    destAmount: input.destAmount,
    sourceNotionalSGD: round2(sourceSGD),
    feeSGD: round2(fee),
    totalToPaySGD: round2(total),
    eta,
    createdAt: new Date().toISOString(),
  };
}
