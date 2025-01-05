'use client'

import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { useCategorySheet } from '~/features/category-sheet/use-category-sheet'
import { cn } from '~/lib/utils'
import { api } from '~/trpc/react'

export const CategorySelector = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) => {
  const [openPopover, setOpenPopover] = useState(false)
  const { data: categories, isLoading } = api.categories.getAll.useQuery()
  const onOpen = useCategorySheet((state) => state.onOpen)
  // TODO: Implement category dialog for creating new categories (if categories are not loaded yet call this dialog on field focus)
  return (
    <Popover open={openPopover} onOpenChange={() => setOpenPopover(!openPopover)}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="combobox"
          disabled={isLoading}
          aria-expanded={openPopover}
          className={cn('justify-between md:w-full', !value && 'text-muted-foreground')}
        >
          {isLoading
            ? 'Loading...'
            : // biome-ignore lint/nursery/noNestedTernary: <explanation>
              value
              ? categories?.find((category) => category.id === value)?.name
              : 'Select category'}

          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="end" side="bottom">
        <Command>
          <CommandInput placeholder="Search categories" />
          <CommandList>
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup>
              {categories?.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.id}
                  onSelect={() => {
                    onChange(category.id)
                    setOpenPopover(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      category.id === value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem asChild>
                <Button
                  variant="ghost"
                  onClick={() => onOpen()}
                  className="h-8 w-full justify-start text-left"
                >
                  <PlusIcon />
                  New category
                </Button>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
