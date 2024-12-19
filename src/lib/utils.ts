import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNameInitials(name: string) {
  const names = name.split(' ')
  return names
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
