export interface FormatPriceOptions {
  price?: number | null
  priceOnRequest?: boolean
  currency?: string
}

/**
 * Formats a listing price into Nigerian Naira (NGN) format.
 * If priceOnRequest is true or price is missing/0, returns "Price on Request".
 */
export function formatPrice({
  price,
  priceOnRequest = false,
  currency = '₦',
}: FormatPriceOptions): string {
  if (priceOnRequest || price === undefined || price === null) {
    return 'Price on Request'
  }

  const formattedNumber = new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: 0,
  }).format(price)

  return `${currency}${formattedNumber}`
}
