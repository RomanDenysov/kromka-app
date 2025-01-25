import { useConfirmStore } from '~/components/widgets/confirm-dialog/hooks/use-confirm-store'

export const useConfirm = () => {
  const openConfirm = useConfirmStore((state) => state.openConfirm)
  return openConfirm
}
