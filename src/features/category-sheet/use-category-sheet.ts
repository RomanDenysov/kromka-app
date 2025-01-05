import { create } from 'zustand'

type CategorySheetProps = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export const useCategorySheet = create<CategorySheetProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}))
