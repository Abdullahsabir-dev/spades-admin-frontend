import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Win rate is colour-coded by performance: strong is green, middling is
 * neutral, weak is red. Thresholds match the design.
 */
export function winRateColor(winRate: number) {
  if (winRate >= 60) return 'text-emerald-400'
  if (winRate >= 40) return 'text-white'
  return 'text-red-400'
}
