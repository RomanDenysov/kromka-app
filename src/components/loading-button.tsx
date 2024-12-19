import { Loader2 } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Button, type ButtonProps } from './ui/button'

type Props = {
  isLoading?: boolean
} & ButtonProps

const LoadingButton = ({ children, className, isLoading, ...props }: Props) => {
  return (
    <Button {...props} disabled={isLoading || props.disabled} className={cn(className)}>
      {isLoading && <Loader2 size={20} className="mr-2 animate-spin" />}
      {children}
    </Button>
  )
}

export { LoadingButton }
