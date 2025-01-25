'use client';

import { log } from '~/lib/utils/log';
import { LoadingButton } from './loading-button';

interface FormActionButtonProps {
  isLoading: boolean;
  discard: () => void;
  form: string;
}

export const FormActionButtons = ({
  isLoading,
  discard,
  form,
}: FormActionButtonProps) => {
  return (
    <div className="flex w-full items-center justify-end gap-4">
      <LoadingButton
        isLoading={isLoading}
        type="button"
        onClick={discard}
        variant="outline"
      >
        Discard
      </LoadingButton>
      <LoadingButton
        onClick={() => {
          log.info('Submit button clicked');
        }}
        isLoading={isLoading}
        type="submit"
        form={form}
      >
        Save
      </LoadingButton>
    </div>
  );
};
