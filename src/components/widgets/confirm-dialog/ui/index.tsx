'use client';

import type React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { useConfirmStore } from '../hooks/use-confirm-store';

export const ConfirmDialog: React.FC = () => {
  const { isOpen, options, closeConfirm } = useConfirmStore();

  return (
    <AlertDialog open={isOpen} onOpenChange={() => closeConfirm(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options.title}</AlertDialogTitle>
          <AlertDialogDescription>{options.message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => closeConfirm(false)}>
            {options.cancelText || 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => closeConfirm(true)}>
            {options.confirmText || 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
