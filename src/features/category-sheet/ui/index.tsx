import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet'
import { useCategorySheet } from '../use-category-sheet'
import { CreateCategoryForm } from './create-category-form'

export const CategorySheet = () => {
  const isOpen = useCategorySheet((state) => state.isOpen)
  const onClose = useCategorySheet((state) => state.onClose)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create new category</SheetTitle>
          <SheetDescription>Create a new category to organize your products.</SheetDescription>
        </SheetHeader>
        <CreateCategoryForm />
        <SheetFooter>
          <SheetClose asChild>
            <Button form="create-category-form" type="submit">
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
