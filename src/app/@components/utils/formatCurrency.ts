export function formatCurrency(
  value: number,
  locale: string = "en-GB",
  currency: string = "GBP"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}
