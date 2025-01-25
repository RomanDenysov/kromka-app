import { StoreForm } from '~/components/forms/stores/ui'
import { api } from '~/trpc/server'

type Props = {
  params: Promise<{
    store: string
  }>
}
export default async function Page({ params }: Props) {
  const storeId = decodeURIComponent((await params).store)
  const store = await api.stores.byId({ id: storeId })

  return (
    <div>
      <StoreForm store={store} />
    </div>
  )
}
