'use client'

import { Button } from '~/components/ui/button'
import { loginProvider } from '../actions'

const SignInButton = () => {
  const login = async () => {
    const data = await loginProvider('google')
    console.log(data)
  }

  return (
    <Button onClick={login} className="">
      Sign In with Google
    </Button>
  )
}

export default SignInButton
