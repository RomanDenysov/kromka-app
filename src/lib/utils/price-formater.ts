export default function formatPrice(
    price: number | string,
    options: {
      currency?: 'USD' | 'EUR'
      notation?: Intl.NumberFormatOptions['notation']
    } = {},
  ) {
    const { currency = 'EUR', notation = 'compact' } = options
  
    const numericPrice = typeof price === 'string' ? Number.parseFloat(price) : price
  
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      notation,
      maximumFractionDigits: 2,
    }).format(numericPrice)
  }
  
  export function convertAmountToCents(amount: number) {
    return Math.round(amount * 100)
  }
  export function convertAmountFromCents(amount: number) {
    return String(amount / 100)
  }
  