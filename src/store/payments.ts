import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Beneficiary, Payment, Quote, QuoteInput } from '@/types';
import { computeQuote } from '@/lib/fees';
import { nanoid } from 'nanoid';

type PaymentsState = {
  beneficiaries: Beneficiary[];
  payments: Payment[];
  upsertBeneficiary: (b: Omit<Beneficiary, 'id' | 'createdAt'> & { id?: string }) => void;
  deleteBeneficiary: (id: string) => void;
  makeQuote: (input: QuoteInput) => Quote;
  confirmPayment: (q: Quote, reference: string, beneficiaryId: string) => Payment;
  advanceStatus: (id: string) => void;
};

const initialBeneficiaries: Beneficiary[] = [
  {
    id: 'ph-1',
    country: 'PH',
    name: 'Manila Dressmakers Co.',
    bankName: 'BDO Unibank',
    accountNumber: '012345678901',
    email: 'accounts@dressmaker.ph',
    notes: 'Monthly fabric supplier',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'my-1',
    country: 'MY',
    name: 'KL Electronics Sdn Bhd',
    bankName: 'Maybank',
    accountNumber: '1234567890123',
    bankCode: 'MBB',
    email: 'finance@klelectronics.my',
    createdAt: new Date().toISOString(),
  },
];

export const usePayments = create<PaymentsState>()(
  persist(
    (set, get) => ({
      beneficiaries: initialBeneficiaries,
      payments: [],
      
      upsertBeneficiary: (b) =>
        set((s) => {
          if (b.id) {
            return {
              beneficiaries: s.beneficiaries.map((x) =>
                x.id === b.id ? ({ ...x, ...b } as Beneficiary) : x
              ),
            };
          }
          const id = nanoid();
          const createdAt = new Date().toISOString();
          return {
            beneficiaries: [{ ...b, id, createdAt } as Beneficiary, ...s.beneficiaries],
          };
        }),
      
      deleteBeneficiary: (id) =>
        set((s) => ({ beneficiaries: s.beneficiaries.filter((b) => b.id !== id) })),
      
      makeQuote: (input) => computeQuote(input),
      
      confirmPayment: (q, reference, beneficiaryId) => {
        const p: Payment = {
          ...q,
          status: 'CONFIRMED',
          reference,
          beneficiaryId,
          timeline: [{ status: 'CONFIRMED', at: new Date().toISOString() }],
        };
        set((s) => ({ payments: [p, ...s.payments] }));
        return p;
      },
      
      advanceStatus: (id) =>
        set((s) => {
          const order = ['CONFIRMED', 'IN_REVIEW', 'SETTLING', 'DELIVERED'] as const;
          const payments = s.payments.map((p) => {
            if (p.id !== id) return p;
            const idx = order.indexOf(p.status as any);
            if (idx === -1 || idx >= order.length - 1) return p;
            const next = order[idx + 1];
            return {
              ...p,
              status: next,
              timeline: [...p.timeline, { status: next, at: new Date().toISOString() }],
            };
          });
          return { payments };
        }),
    }),
    { name: 'meridian-store' }
  )
);
