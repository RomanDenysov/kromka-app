import { create } from 'zustand';

type UseUploadDrawerState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useUploadDrawer = create<UseUploadDrawerState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
