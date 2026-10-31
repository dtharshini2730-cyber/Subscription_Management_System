import { Subscription, Invoice, Payment } from '@/types';

export function exportRevenueReportCsv(data: {
  subscriptions: Subscription[];
  invoices: Invoice[];
  payments: Payment[];
}) {
  const headers = [
    'Record Type',
    'Identifier',
    'Customer Name',
    'Plan / Item',
    'Status',
    'Date',
    'Amount (USD)',
  ];

  const rows: (string | number)[][] = [];

  // Invoices
  data.invoices.forEach((inv) => {
    rows.push([
      'Invoice',
      inv.invoiceNumber,
      `"${inv.customerName}"`,
      `"Subscription Cycle"`,
      inv.status,
      inv.issueDate,
      inv.totalAmount.toFixed(2),
    ]);
  });

  // Subscriptions
  data.subscriptions.forEach((sub) => {
    rows.push([
      'Subscription',
      sub.subscriptionNumber,
      `"${sub.customerName}"`,
      `"${sub.planName}"`,
      sub.status,
      sub.startDate,
      sub.grandTotal.toFixed(2),
    ]);
  });

  // Payments
  data.payments.forEach((pay) => {
    rows.push([
      'Payment Settlement',
      pay.paymentNumber,
      `"${pay.customerName}"`,
      pay.paymentMethod,
      pay.status,
      pay.paymentDate,
      pay.amount.toFixed(2),
    ]);
  });

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute(
    'download',
    `subsense-executive-revenue-report-${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
