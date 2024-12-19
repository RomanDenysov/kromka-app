import { Container } from '~/components/ui/container'
import { DashboardGrid } from './_components/dashboard-grid'

export default function Page() {
  return (
    <Container className="py-4 md:py-8">
      <DashboardGrid />
    </Container>
  )
}
