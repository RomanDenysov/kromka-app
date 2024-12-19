import { Grid2X2Icon, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

const dummy = [
  {
    title: 'Total Revenue',
    icon: Grid2X2Icon,
    children: (
      <>
        <div className="font-bold text-2xl">$45,231.89</div>
        <p className="text-muted-foreground text-xs">+20.1% from last month</p>
      </>
    ),
  },
  {
    title: 'Total Users',
    icon: Grid2X2Icon,
    children: (
      <>
        <div className="font-bold text-2xl">1,350</div>
        <p className="text-muted-foreground text-xs">+20.1% from last month</p>
      </>
    ),
  },
  {
    title: 'New Users',
    icon: Grid2X2Icon,
    children: (
      <>
        <div className="font-bold text-2xl">+1,350</div>
        <p className="text-muted-foreground text-xs">+20.1% from last month</p>
      </>
    ),
  },
  {
    title: 'New Customers',
    icon: Grid2X2Icon,
    children: (
      <>
        <div className="font-bold text-2xl">+1,350</div>
        <p className="text-muted-foreground text-xs">+20.1% from last month</p>
      </>
    ),
  },
]

const DashboardGrid = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {dummy.map((card) => (
          <DashboardCard key={card.title} title={card.title} icon={card.icon}>
            {card.children}
          </DashboardCard>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">Test</CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>Test 2</CardContent>
        </Card>
      </div>
    </div>
  )
}

const DashboardCard = ({
  children,
  title,
  icon: Icon,
}: {
  children: ReactNode
  title: string
  icon: LucideIcon
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">{title}</CardTitle>
        <Icon size={16} className="text-muted-foreground" />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export { DashboardGrid, DashboardCard }
