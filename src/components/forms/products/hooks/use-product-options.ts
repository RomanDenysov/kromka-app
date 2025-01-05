import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { toast } from '~/hooks/use-toast'
import { generateSKU, type OptionType } from '~/lib/sku-generator'
import type { CreateProductInput } from '../types'

export const useProductOptions = () => {
  const form = useFormContext<CreateProductInput>()
  const { watch, setValue, getValues, setFocus } = form

  const optionsArray = useFieldArray({
    control: form.control,
    name: 'options',
  })

  const generateOptionSKU = (
    productName: string,
    categoryId: string,
    option: {
      optionType: OptionType
      value: number
      unit: string
    },
  ): string => {
    return generateSKU({
      productName,
      categoryId,
      option,
    })
  }

  // Обновление SKU для конкретной опции
  const updateSingleOptionSKU = (index: number) => {
    const { name, categoryId } = getValues()
    const option = getValues(`options.${index}`)

    if (!name || !categoryId || !option) {
      return
    }

    const newSKU = generateOptionSKU(name, categoryId, {
      optionType: option.optionType,
      value: option.value,
      unit: option.unit,
    })

    setValue(`options.${index}.sku`, newSKU)
  }

  const updateAllOptionsSKU = () => {
    const { name, categoryId } = getValues()
    if (!name || !categoryId) {
      return
    }

    optionsArray.fields.forEach((_, index) => {
      updateSingleOptionSKU(index)
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // Следим за изменениями name и categoryId
    const subscription = watch((value, { name, type }) => {
      // Если изменились общие поля - обновляем все SKU
      if (name === 'name' || name === 'categoryId') {
        updateAllOptionsSKU()
        return
      }

      // Если изменилось поле конкретной опции
      if (name?.startsWith('options.')) {
        const match = name.match(/options\.(\d+)\./)
        if (match) {
          const index = Number.parseInt(match[1])
          // Обновляем SKU только если изменились поля, влияющие на него
          if (name.endsWith('.optionType') || name.endsWith('.value') || name.endsWith('.unit')) {
            updateSingleOptionSKU(index)
          }
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  const addOption = () => {
    const { name, categoryId } = getValues()

    if (!validateRequirements()) {
      return
    }

    const newOption = {
      optionType: 'weight' as const,
      unit: 'g' as const,
      value: 1,
    }

    const sku = generateOptionSKU(name, categoryId, newOption)

    optionsArray.append({
      sku,
      ...newOption,
      price: 0,
      isDefault: optionsArray.fields.length === 0,
      sortOrder: optionsArray.fields.length,
    })
  }

  // Валидация перед добавлением
  const validateRequirements = (): boolean => {
    const { name, categoryId } = getValues()

    if (!name) {
      toast({
        variant: 'destructive',
        title: 'Please enter a product name first',
        description: 'Product name is required to generate SKU for variants',
      })
      setFocus('name')
      return false
    }

    if (!categoryId) {
      toast({
        variant: 'destructive',
        title: 'Please select a category first',
        description: 'Category is required to generate SKU for variants',
      })
      setFocus('categoryId')
      return false
    }

    return true
  }

  const canManageOptions = Boolean(getValues('name') && getValues('categoryId'))

  return {
    optionsArray,
    addOption,
    canManageOptions,
    isEmpty: optionsArray.fields.length === 0,
  }
}
