import Link from 'next/link'
import { Icons } from '~/components/icons'
import { Typography } from '~/components/typography'
import { Container } from '~/components/ui/container'
import { Separator } from '~/components/ui/separator'
import { company } from '~/config/business'

const Footer = () => {
  return (
    <footer className="mx-auto bg-muted">
      <Container>
        <div className="mx-auto size-full border-t py-10 md:py-20">
          <div className="grid place-content-center">
            <Icons.logo className="size-12 fill-accent-foreground md:size-14" />
          </div>
        </div>
        <Separator />

        <Separator />

        <div className="flex size-full flex-col-reverse items-center justify-between gap-4 pt-10 pb-4 md:flex-row">
          <div className="flex-grow">
            <Typography
              variant="small"
              className="truncate text-center text-muted-foreground text-xs lg:text-sm"
            >
              &copy; 2025 Všetky práva vyhradené pre {company}
            </Typography>
          </div>
          <div className="flex-1">
            <div className="flex flex-col items-center gap-x-2 gap-y-1 md:flex-row">
              <Link
                href="#"
                className="truncate text-center text-muted-foreground text-xs tracking-tight hover:text-gray-600 hover:underline lg:text-sm"
              >
                Obchodné podmienky
              </Link>
              <Link
                href="/ochrana-osobnych-udajov"
                className="truncate text-center text-muted-foreground text-xs tracking-tight hover:text-gray-600 hover:underline lg:text-sm"
              >
                Ochrana osobných údajov
              </Link>
              <Link
                href="/ochrana-osobnych-udajov"
                className="truncate text-center text-muted-foreground text-xs tracking-tight hover:text-gray-600 hover:underline lg:text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
