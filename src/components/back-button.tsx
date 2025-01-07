'use client'

import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export const BackButton = () => {
  const router = useRouter()

  return (
    <Button type="button" variant="outline" onClick={() => router.back()} size="icon">
      <span className="sr-only">Back</span>
      <ChevronLeftIcon size={24} className="text-muted-foreground" />
    </Button>
  )
}
