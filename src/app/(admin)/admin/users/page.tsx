import { Suspense } from 'react'
import { getUsers } from '~/actions/user'
import { DataTable } from '~/components/data-table'
import { LoadingSpinner } from '~/components/loading-spinner'
import { Typography } from '~/components/typography'
import { log } from '~/lib/log'
import { columns } from './columns'

export default async function Page() {
  const users = await getUsers()

  if (!users) {
    return null
  }

  log.debug(`Users: ${users}`)

  return (
    <>
      <Typography variant="h3">Users ({users.length})</Typography>

      <Suspense
        fallback={
          <center className="pt-20">
            <LoadingSpinner size="lg" />
          </center>
        }
      >
        <DataTable columns={columns} data={users} filterKey="name" />
      </Suspense>
    </>
  )
}
