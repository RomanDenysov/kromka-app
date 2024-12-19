import { getUser } from '~/actions/user'
import { Container } from '~/components/ui/container'
import SignInButton from './_components/sign-in-button'
import SignOutButton from './_components/sign-out-button'

export default async function Home() {
  const user = await getUser()

  return (
    <Container>
      <SignInButton />
      <SignOutButton />
      <h1>{user?.name}</h1>
    </Container>
  )
}
