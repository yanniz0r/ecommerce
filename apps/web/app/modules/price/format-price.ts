export function formatPrice(price: number, currencySymbol: string) {
  const fullPrice = price / 100;
  const centsPrice = fullPrice % 1;
  const fullPriceString = fullPrice.toFixed(0);
  const centsPriceString = centsPrice.toFixed(2).substring(2);
  return `${fullPriceString}.${centsPriceString} ${currencySymbol}`;
}