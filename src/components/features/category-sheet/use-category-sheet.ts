import { create } from 'zustand'

type CategorySheetProps = {
  isOpen: boolean
  onClose: () => void
  onOpen: (onSuccess?: (categoryId: string) => void) => void
  onSuccessCallback?: (categoryId: string) => void
}

export const useCategorySheet = create<CategorySheetProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: (onSuccess) => set({ isOpen: true, onSuccessCallback: onSuccess }),
  onSuccessCallback: undefined,
}))
