import { useCallback, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { toast } from '~/hooks/use-toast';
import { generateSKU } from '~/lib/utils/sku-generator';

const OPTIONS_INDEX_REGEX = /options\.(\d+)\./;

export const useProductOptions = () => {
  const form = useFormContext<CreateProductInput>();
  const { watch, setValue, getValues, setFocus } = form;

  const optionsArray = useFieldArray({
    control: form.control,
    name: 'options',
  });

  const generateOptionSKU = useCallback(
    (
      productName: string,
      categoryId: string,
      option: {
        value: string;
        unit: string;
      }
    ): string => {
      return generateSKU({
        productName,
        categoryId,
        option,
      });
    },
    []
  );

  // Обновление SKU для конкретной опции
  const updateSingleOptionSKU = useCallback(
    (index: number) => {
      const { name, categoryId } = getValues();
      const option = getValues(`options.${index}`);

      if (!name || !categoryId || !option) {
        return;
      }

      const newSKU = generateOptionSKU(name, categoryId, {
        value: option.value.toString(),
        unit: option.unit,
      });

      setValue(`options.${index}.sku`, newSKU);
    },
    [getValues, setValue, generateOptionSKU]
  );

  const updateAllOptionsSKU = useCallback(() => {
    const { name, categoryId } = getValues();
    if (!name || !categoryId) {
      return;
    }

    optionsArray.fields.forEach((_, index) => {
      updateSingleOptionSKU(index);
    });
  }, [getValues, updateSingleOptionSKU, optionsArray]);

  const handleBasicFieldChange = useCallback(
    (name: string) => {
      if (name === 'name' || name === 'categoryId') {
        updateAllOptionsSKU();
        return true;
      }
      return false;
    },
    [updateAllOptionsSKU]
  );

  const handleOptionsChange = useCallback(
    (name: string) => {
      if (!name?.startsWith('options.')) {
        return;
      }

      const match = name.match(OPTIONS_INDEX_REGEX);
      if (!match) {
        return;
      }

      const index = Number.parseInt(match[1]);
      if (name.endsWith('.value') || name.endsWith('.unit')) {
        updateSingleOptionSKU(index);
      }
    },
    [updateSingleOptionSKU]
  );

  useEffect(() => {
    const subscription = watch(({ name }: { name?: string }) => {
      if (!handleBasicFieldChange(name ?? '')) {
        handleOptionsChange(name ?? '');
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, handleBasicFieldChange, handleOptionsChange]);

  const addOption = () => {
    const { name, categoryId } = getValues();

    if (!validateRequirements()) {
      return;
    }

    const newOption = {
      optionType: 'weight' as const,
      unit: 'g' as const,
      value: 1,
    };

    const sku = generateOptionSKU(name, categoryId, {
      value: newOption.value.toString(),
      unit: newOption.unit,
    });

    optionsArray.append({
      sku,
      ...newOption,
      price: 0,
      sortOrder: optionsArray.fields.length,
      inventory: [],
    });
  };

  // Валидация перед добавлением
  const validateRequirements = (): boolean => {
    const { name, categoryId } = getValues();

    if (!name) {
      toast({
        variant: 'destructive',
        title: 'Please enter a product name first',
        description: 'Product name is required to generate SKU for variants',
      });
      setFocus('name');
      return false;
    }

    if (!categoryId) {
      toast({
        variant: 'destructive',
        title: 'Please select a category first',
        description: 'Category is required to generate SKU for variants',
      });
      setFocus('categoryId');
      return false;
    }

    return true;
  };

  const canManageOptions = Boolean(
    getValues('name') && getValues('categoryId')
  );

  return {
    optionsArray,
    addOption,
    canManageOptions,
    isEmpty: optionsArray.fields.length === 0,
  };
};
