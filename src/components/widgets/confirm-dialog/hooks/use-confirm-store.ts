import { create } from 'zustand'

type ConfirmOptions = {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

type ConfirmState = {
  isOpen: boolean
  options: ConfirmOptions
  resolve: ((value: boolean) => void) | null
  openConfirm: (options: ConfirmOptions) => Promise<boolean>
  closeConfirm: (value: boolean) => void
}

export const useConfirmStore = create<ConfirmState>((set, get) => ({
  isOpen: false,
  options: { title: '', message: '' },
  resolve: null,
  openConfirm: (options) =>
    new Promise<boolean>((resolve) => {
      set({ isOpen: true, options, resolve })
    }),
  closeConfirm: (value) => {
    const { resolve } = get()
    set({ isOpen: false })
    if (resolve) {
      resolve(value)
    }
  },
}))
