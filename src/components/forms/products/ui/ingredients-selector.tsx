'use client'

import { useCallback } from 'react'
import MultipleSelector from '~/components/multiple-selector'
import { api } from '~/trpc/react'

export const IngredientsSelector = ({
  value,
  onChangeAction,
}: {
  value: string[] // Теперь просто массив имен
  onChangeAction: (value: string[]) => void
}) => {
  const { data: ingredients, isLoading } = api.ingredients.getAll.useQuery()
  const { mutate: createIngredient } = api.ingredients.create.useMutation({
    // Можно добавить обработку успешного создания если нужно
  })

  // Синхронный поиск по существующим ингредиентам
  const handleSearch = useCallback(
    (searchValue: string) => {
      if (!ingredients) {
        return []
      }

      return ingredients
        .filter((ingredient) => ingredient.name.toLowerCase().includes(searchValue.toLowerCase()))
        .map((ingredient) => ({
          value: ingredient.name,
          label: ingredient.name,
        }))
    },
    [ingredients],
  )

  // Конвертируем значения в формат для MultipleSelector
  const selectedOptions = value.map((name) => ({
    value: name,
    label: name,
  }))

  const handleChange = (newValue: Array<{ value: string; label: string }>) => {
    // Получаем массив имен из новых значений
    const newIngredients = newValue.map((v) => v.value)

    // Проверяем, есть ли новые ингредиенты, которых нет в базе
    const existingNames = new Set(ingredients?.map((i) => i.name) || [])

    for (const { value: name } of newValue) {
      if (!existingNames.has(name)) {
        // Создаем новый ингредиент
        createIngredient({ name })
      }
    }

    // Обновляем значение в форме
    onChangeAction(newIngredients)
  }

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      defaultOptions={
        ingredients?.map((i) => ({
          value: i.name,
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
