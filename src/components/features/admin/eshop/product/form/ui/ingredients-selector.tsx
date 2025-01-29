'use client';

import { useCallback, useEffect, useState } from 'react';
import MultipleSelector, { type Option } from '~/components/multiple-selector';
import { toast } from '~/hooks/use-toast';
import { api } from '~/trpc/react';
import type { Ingredient } from '../../types';

type Props = {
  ingredients: {
    ingredientName: string;
    ingredientId: string;
  }[];
  onChange: (value: { ingredientName: string }[]) => void;
};

export const IngredientsSelector = ({ onChange }: Props) => {
  const utils = api.useUtils();

  const { data: ingredients, isLoading } = api.ingredients.getAll.useQuery();

  const { mutateAsync: createIngredient } = api.ingredients.create.useMutation({
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create ingredient',
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      await utils.ingredients.getAll.invalidate();
      toast({
        title: 'Ingredient created',
        description: 'Ingredient has been created successfully',
      });
    },
  });
  const [ingredientsData, setIngredientsData] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (ingredients) {
      setIngredientsData(ingredients);
    }
  }, [ingredients]);

  const normalizeIngredientName = (name: string) => {
    return name.trim().toLowerCase();
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleSearch = useCallback(
    (searchValue: string) => {
      if (!ingredients) {
        return [];
      }
      const normalizedSearch = normalizeIngredientName(searchValue);
      return ingredients
        .filter(
          (ingredient) =>
            normalizeIngredientName(ingredient.name).includes(
              normalizedSearch
            ) && ingredient.name.trim().length > 0
        )
        .map((ingredient) => ({
          value: normalizeIngredientName(ingredient.name),
          label: ingredient.name,
        }));
    },
    [ingredients]
  );

  const handleChange = async (newValue: Option[]) => {
    const latestOption = newValue[newValue.length - 1];

    if (
      latestOption &&
      !ingredients?.some(
        (i) =>
          normalizeIngredientName(i.name) ===
          normalizeIngredientName(latestOption.value)
      )
    ) {
      // Optimistically update the form value before the mutation
      onChange(newValue.map((option) => ({ ingredientName: option.value })));

      try {
        await createIngredient({ name: latestOption.value });
      } catch (error) {
        // If mutation fails, revert to previous value by removing the failed ingredient
        onChange(
          newValue
            .filter((option) => option.value !== latestOption.value)
            .map((option) => ({ ingredientName: option.value }))
        );
      }
    } else {
      onChange(newValue.map((option) => ({ ingredientName: option.value })));
    }
  };

  return (
    <MultipleSelector
      value={value.map(({ ingredientName }) => ({
        value: normalizeIngredientName(ingredientName),
        label: ingredientName,
      }))}
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
        <p className="text-center text-muted-foreground text-sm">
          No ingredients found
        </p>
      }
      loadingIndicator={
        isLoading ? (
          <p className="text-center text-muted-foreground text-sm">
            Loading ingredients...
          </p>
        ) : null
      }
    />
  );
};
