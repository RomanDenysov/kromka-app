import { Typography } from '~/components/typography'
import { Container } from '~/components/ui/container'
export default function Loading() {
  return (
    <center className="flex size-full min-h-screen items-center justify-center">
      <Container className="grid flex-1 flex-grow place-content-center">
        <Typography variant="h1">KROMKA</Typography>
      </Container>
    </center>
  )
}
