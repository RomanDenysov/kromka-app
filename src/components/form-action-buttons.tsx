'use client'

import type { UseFormReset } from 'react-hook-form'
import { LoadingButton } from './loading-button'

interface FormActionButtonProps<TFormValues extends Record<string, any>> {
  isLoading: boolean
  discard: UseFormReset<TFormValues>
  form: string
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const FormActionButtons = <TFormValues extends Record<string, any>>({
  isLoading,
  discard,
  form,
}: FormActionButtonProps<TFormValues>) => {
  return (
    <div className="flex w-full items-center justify-end gap-4">
      <LoadingButton
        isLoading={isLoading}
        type="button"
        onClick={() => discard()}
        variant="outline"
      >
        Discard
      </LoadingButton>
      <LoadingButton isLoading={isLoading} type="submit" form={form}>
        Save
      </LoadingButton>
    </div>
  )
}
