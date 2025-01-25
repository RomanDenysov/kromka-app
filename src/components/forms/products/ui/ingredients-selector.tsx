'use client'

import { useCallback } from 'react'
import MultipleSelector, { type Option } from '~/components/multiple-selector'
import { api } from '~/trpc/react'

type Props = {
  value: string[]
  onChange: (value: string[]) => void
}

export const IngredientsSelector = ({ value, onChange }: Props) => {
  const utils = api.useUtils()
  const { data: ingredients, isLoading, refetch } = api.ingredients.getAll.useQuery()
  const { mutate: createIngredient } = api.ingredients.create.useMutation({
    onSuccess: async () => {
      await utils.ingredients.getAll.invalidate()
      await refetch()
    },
  })

  const normalizeIngredientName = (name: string) => {
    return name.trim().toLowerCase()
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleSearch = useCallback(
    (searchValue: string) => {
      if (!ingredients) {
        return []
      }
      const normalizedSearch = normalizeIngredientName(searchValue)
      return ingredients
        .filter(
          (ingredient) =>
            normalizeIngredientName(ingredient.name).includes(normalizedSearch) &&
            ingredient.name.trim().length > 0,
        )
        .map((ingredient) => ({
          value: normalizeIngredientName(ingredient.name),
          label: ingredient.name,
        }))
    },
    [ingredients],
  )

  const selectedOptions: Option[] = value
    .filter((name) => name.trim().length > 0)
    .map((name) => ({
      value: normalizeIngredientName(name),
      label: name,
    }))

  const handleChange = (newValue: Option[]) => {
    // Фильтруем пустые значения и нормализуем
    const validNames = newValue
      .map((option) => normalizeIngredientName(option.value))
      .filter((name) => name.length > 0)

    // Проверяем новые ингредиенты и создаем их если необходимо
    const existingNames = new Set(ingredients?.map((i) => normalizeIngredientName(i.name)) || [])
    for (const name of validNames) {
      if (!existingNames.has(name)) {
        createIngredient({ name })
      }
    }

    // Обновляем значение в форме только с валидными именами
    onChange(validNames)
  }

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      options={
        // Используем options вместо defaultOptions
        ingredients
          ?.filter((i) => i.name.trim().length > 0)
          .map((i) => ({
            value: normalizeIngredientName(i.name),
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
