import { LoadingButton } from '~/components/loading-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Container } from '~/components/ui/container'
import { signInWithProvider } from './actions'

export default function Page() {
  return (
    <Container>
      <Card className="md:border-none md:text-center md:shadow-none md:ring-0">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
          <CardContent>{/* <></> */}</CardContent>
          <CardFooter className="justify-center">
            <form
              action={async () => {
                'use server'
                await signInWithProvider('google')
              }}
              name="sign-in-with-providers"
              id="sign-in-with-providers"
              className="w-full max-w-md"
            >
              <LoadingButton type="submit" form="sign-in-with-providers" className="w-full">
                Sign in with Google
              </LoadingButton>
            </form>
          </CardFooter>
        </CardHeader>
      </Card>
    </Container>
  )
}
