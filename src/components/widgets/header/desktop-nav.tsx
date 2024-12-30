import { ChevronRightIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '~/components/ui/navigation-menu'
import { mainNavigation } from '~/config/navigation'

const DesktopNav = () => {
  return (
    <div className="hidden flex-row items-center justify-start lg:flex">
      <NavigationMenu className="flex items-start justify-start">
        <NavigationMenuList className="flex flex-row justify-start gap-2">
          {mainNavigation.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.href ? (
                <>
                  <NavigationMenuLink href={item.href}>
                    <Button variant="ghost">{item.title}</Button>
                  </NavigationMenuLink>
                </>
              ) : (
                <>
                  <NavigationMenuTrigger className="font-medium text-sm">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-[450px] p-4">
                    <div className="flex grid-cols-2 flex-col gap-2 lg:grid">
                      <div className="flex h-full flex-col justify-between">
                        <div className="flex flex-col">
                          <p className="text-base">{item.title}</p>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                        <Button className="mt-10" size="sm">
                          Test button
                        </Button>
                      </div>
                      <div className="flex h-full flex-col justify-end space-y-1 text-sm">
                        {item.items?.map((subItem) => (
                          <NavigationMenuLink
                            href={subItem.href}
                            key={subItem.title}
                            className="flex h-8 flex-row items-center justify-between rounded-md px-4 py-2 text-xs hover:bg-muted"
                          >
                            <span>{subItem.title}</span>
                            <ChevronRightIcon className="size-4 text-muted-foreground" />
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default DesktopNav
