/**
 * Illustrative sample data — D2C retail, twelve months, rupees.
 *
 * ALL THREE ARTIFACTS READ FROM THIS FILE. That is deliberate: the dashboard,
 * the SEO panel and the growth diagram have to survive being read side by
 * side, and a prospect who spots a seam between them stops believing all
 * three. The reconciliation points are called out at each series.
 *
 * No client name anywhere, by decision — a fictional brand invites "which
 * client was this?" and there is no good answer. The sector label carries it.
 */

export const CAPTION = 'Illustrative sample · D2C retail · 12 months';

/** Indian financial year, which is how the audience for this thinks. */
export const MONTHS = [
  'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar',
] as const;

/** Revenue in ₹ lakhs. Festive lift across Oct–Nov, softening into Dec. */
export const revenueLakhs = [
  18.4, 19.1, 17.8, 20.3, 21.6, 23.2, 31.5, 34.8, 26.4, 24.1, 25.7, 28.3,
];

/** Prior twelve months — the single steel comparison series (§2, Decision E). */
export const revenuePriorLakhs = [
  14.2, 15.0, 14.1, 15.8, 16.9, 18.0, 24.6, 27.1, 20.8, 18.9, 20.2, 21.7,
];

/** Average order value in ₹. Sits inside the ₹800–2,500 band throughout. */
export const aovMonthly = [
  1760, 1785, 1740, 1810, 1835, 1860, 1980, 2020, 1890, 1855, 1875, 1925,
];

/** Orders = revenue ÷ AOV, rounded. Not invented independently. */
export const orders = [
  1045, 1070, 1023, 1122, 1177, 1247, 1591, 1723, 1397, 1299, 1371, 1470,
];

/** Sessions, all channels. */
export const sessions = [
  46200, 47800, 44900, 49600, 51800, 54300, 68400, 73100, 58900, 55200, 57600,
  61400,
];

/**
 * Organic sessions. RECONCILIATION POINT: the SEO panel's visibility trend
 * and its before/after lift both describe this exact series — 14,300 in Apr
 * rising to 25,800 in Mar, and organic share moving 31% → 42%.
 */
export const organicSessions = [
  14300, 15100, 14600, 16600, 17900, 19400, 25300, 28200, 23600, 22600, 24200,
  25800,
];

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export const totals = {
  revenueCrore: sum(revenueLakhs) / 100,
  orders: sum(orders),
  sessions: sum(sessions),
  organicSessions: sum(organicSessions),
};

/** Blended AOV and conversion rate, derived rather than asserted. */
export const derived = {
  aov: Math.round((sum(revenueLakhs) * 100000) / sum(orders)),
  conversionRate: (sum(orders) / sum(sessions)) * 100,
};

export type SegmentKey = 'all' | 'new' | 'returning';

export const SEGMENTS: { key: SegmentKey; label: string }[] = [
  { key: 'all', label: 'All customers' },
  { key: 'new', label: 'New' },
  { key: 'returning', label: 'Returning' },
];

/**
 * Segment splits. New + returning reconcile exactly back to the totals:
 * 9,632 + 5,903 = 15,535 orders, and ₹1.58 Cr + ₹1.33 Cr = ₹2.91 Cr.
 */
const SEGMENT_SHARE: Record<SegmentKey, { revenue: number; orders: number }> = {
  all: { revenue: 1, orders: 1 },
  new: { revenue: 0.542, orders: 0.62 },
  returning: { revenue: 0.458, orders: 0.38 },
};

export type Metric = {
  label: string;
  value: number;
  /** Rendered form — the count-up animates `value` and formats with this. */
  format: 'crore' | 'integer' | 'rupees' | 'percent';
  delta: string;
  /** Prior-period figure, stated so the delta is checkable rather than asserted. */
  prior: string;
};

export function metricsFor(segment: SegmentKey): Metric[] {
  const share = SEGMENT_SHARE[segment];
  const revenue = (sum(revenueLakhs) / 100) * share.revenue;
  const segOrders = Math.round(sum(orders) * share.orders);
  const aov = Math.round((revenue * 10000000) / segOrders);

  const conversion =
    segment === 'all' ? 2.32 : segment === 'new' ? 1.98 : 3.23;
  const conversionPrior =
    segment === 'all' ? '2.11%' : segment === 'new' ? '1.84%' : '2.96%';

  return [
    {
      label: 'Revenue',
      value: revenue,
      format: 'crore',
      delta: '+28.1%',
      prior: `₹${((sum(revenuePriorLakhs) / 100) * share.revenue).toFixed(2)} Cr`,
    },
    {
      label: 'Orders',
      value: segOrders,
      format: 'integer',
      delta: '+22.3%',
      prior: Math.round(12698 * share.orders).toLocaleString('en-IN'),
    },
    {
      label: 'Average order value',
      value: aov,
      format: 'rupees',
      delta: '+4.7%',
      prior: `₹${Math.round(aov / 1.047).toLocaleString('en-IN')}`,
    },
    {
      label: 'Conversion rate',
      value: conversion,
      format: 'percent',
      delta: segment === 'all' ? '+0.21pp' : segment === 'new' ? '+0.14pp' : '+0.27pp',
      prior: conversionPrior,
    },
  ];
}

/** Monthly revenue for a segment, scaled from the master series. */
export function revenueFor(segment: SegmentKey): number[] {
  const share = SEGMENT_SHARE[segment].revenue;

  return revenueLakhs.map((v) => Number((v * share).toFixed(1)));
}

export function revenuePriorFor(segment: SegmentKey): number[] {
  const share = SEGMENT_SHARE[segment].revenue;

  return revenuePriorLakhs.map((v) => Number((v * share).toFixed(1)));
}

/** Channel breakdown, full year, in sessions. Sums to `totals.sessions`. */
export const channels = [
  { label: 'Organic search', sessions: 247600 },
  { label: 'Paid social', sessions: 180700 },
  { label: 'Direct', sessions: 127100 },
  { label: 'Email', sessions: 74300 },
  { label: 'Referral', sessions: 39500 },
];

/* ------------------------------------------------------------------ SEO -- */

/** Positions move 3–8 places, never 1 → 90. */
export const keywords = [
  { term: 'organic cotton bedsheets', before: 18, after: 11 },
  { term: 'queen size bedsheet online', before: 24, after: 17 },
  { term: 'linen bedding set', before: 14, after: 9 },
  { term: 'best bath towels india', before: 31, after: 25 },
  { term: 'cotton bath towel set', before: 27, after: 22 },
  { term: '300 thread count bedsheet', before: 12, after: 8 },
  { term: 'percale vs sateen', before: 9, after: 6 },
];

/** Visibility index, same twelve months, same shape as organic sessions. */
export const visibilityScore = [
  18.4, 19.1, 18.7, 20.9, 22.4, 23.8, 27.1, 29.0, 27.6, 28.4, 30.1, 31.2,
];

export const coreWebVitals = [
  { label: 'LCP', value: '2.1s', threshold: 'Good · under 2.5s' },
  { label: 'INP', value: '168ms', threshold: 'Good · under 200ms' },
  { label: 'CLS', value: '0.04', threshold: 'Good · under 0.1' },
];

/** RECONCILIATION POINT: organic sessions here are Apr and Mar above. */
export const seoLift = [
  { label: 'Organic sessions / month', before: '14,300', after: '25,800' },
  { label: 'Average position', before: '26.4', after: '20.1' },
  { label: 'Indexed pages', before: '214', after: '268' },
  { label: 'Core Web Vitals passing', before: '41%', after: '96%' },
];

/* --------------------------------------------------------------- Growth -- */

/**
 * March figures throughout. RECONCILIATION POINT: the sources sum to 61,400,
 * March's `sessions`, and the outcome is 1,470 — March's `orders`.
 */
export const flowStages = [
  {
    label: 'Sources',
    nodes: [
      { label: 'Organic search', value: '25,800' },
      { label: 'Paid social', value: '17,900' },
      { label: 'Direct & other', value: '17,700' },
    ],
  },
  {
    label: 'Qualification',
    nodes: [
      { label: 'Product view', value: '24,900' },
      { label: 'Add to cart', value: '5,340' },
    ],
  },
  {
    label: 'Automation',
    nodes: [
      { label: 'Cart recovery', value: '+310' },
      { label: 'Post-purchase', value: '1,120' },
    ],
  },
  {
    label: 'Outcome',
    nodes: [{ label: 'Orders', value: '1,470' }],
  },
];
