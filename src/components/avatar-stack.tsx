import { getNameInitials } from '~/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

const AvatarStack = ({
  avatar,
  name,
  email,
}: {
  avatar?: string | null
  name?: string
  email: string
}) => {
  console.log('avatar', avatar)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Avatar className="size-8 bg-secondary ring-1 ring-background">
            {avatar && <AvatarImage loading="lazy" src={avatar} alt={name} />}
            <AvatarFallback delayMs={600} className="text-xs">
              {name ? getNameInitials(name) : 'No name'}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent collisionPadding={4}>
          <p className="font-medium text-xs">{email}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { AvatarStack }
