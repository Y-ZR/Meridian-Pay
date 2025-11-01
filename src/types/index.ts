export type Currency = 'SGD' | 'PHP' | 'MYR';
export type Corridor = 'SGD_PHP' | 'SGD_MYR';

export interface Rates {
  SGD_PHP: number; // dest per 1 SGD (e.g., 41.30)
  SGD_MYR: number; // dest per 1 SGD (e.g., 3.50)
  asOf: string;    // ISO date
}

export type PaymentStatus =
  | 'DRAFT' | 'QUOTED' | 'CONFIRMED' | 'IN_REVIEW' | 'SETTLING' | 'DELIVERED' | 'FAILED';

export interface Beneficiary {
  id: string;
  country: 'PH' | 'MY';
  name: string;
  bankName: string;
  accountNumber: string;
  email?: string;
  bankCode?: string;
  notes?: string;
  createdAt: string;
}

export interface QuoteInput {
  corridor: Corridor;
  destAmount: number;      // in dest currency
  beneficiaryId: string;
}

export interface Quote {
  id: string;
  corridor: Corridor;
  rate: number;            // dest per 1 SGD
  destAmount: number;
  sourceNotionalSGD: number;
  feeSGD: number;
  totalToPaySGD: number;
  eta: string;             // "≈ 10 min" or "T+1"
  createdAt: string;
}

export interface Payment extends Quote {
  status: PaymentStatus;
  reference: string;       // payer reference
  beneficiaryId: string;
  timeline: { status: PaymentStatus; at: string }[];
}
