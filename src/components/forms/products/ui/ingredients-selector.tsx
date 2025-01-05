'use client'

import { useCallback, useState } from 'react'
import type { Option } from '~/components/multiple-selector'
import MultipleSelector from '~/components/multiple-selector'
import { api } from '~/trpc/react'

export const IngredientsSelector = ({
  value,
  onChange,
}: {
  value: string[]
  onChange: (value: string[]) => void
}) => {
  const utils = api.useUtils()
  const [options, setOptions] = useState<Option[]>([])

  const { data: ingredients, isLoading } = api.ingredients.getAll.useQuery()

  const createMutation = api.ingredients.create.useMutation({
    onSuccess: () => {
      utils.ingredients.getAll.invalidate()
    },
  })

  const deleteMutation = api.ingredients.delete.useMutation({
    onSuccess: () => {
      utils.ingredients.getAll.invalidate()
    },
  })

  // Синхронный поиск
  const handleSearch = useCallback(
    (searchValue: string) => {
      if (!ingredients) return []

      return ingredients
        .filter((ingredient) => ingredient.name.toLowerCase().includes(searchValue.toLowerCase()))
        .map((ingredient) => ({
          value: ingredient.id,
          label: ingredient.name,
        }))
    },
    [ingredients],
  )

  // Получаем опции для выбранных значений
  const selectedOptions = value.map((v) => ({
    value: v,
    label: ingredients?.find((i) => i.id === v)?.name || v,
  }))

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={(newValue) => {
        onChange(newValue.map((v) => v.value))
      }}
      defaultOptions={
        ingredients?.map((i) => ({
          value: i.id,
          label: i.name,
        })) || []
      }
      onSearchSync={handleSearch}
      creatable
      delay={300}
      placeholder="Search or create ingredients..."
      emptyIndicator={
        <p className="text-center text-muted-foreground text-sm">No ingredients found</p>
      }
      loadingIndicator={
        isLoading ? (
          <p className="text-center text-muted-foreground text-sm">Loading ingredients...</p>
        ) : null
      }
    />
  )
}
