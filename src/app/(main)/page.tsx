import { getUser } from '~/actions/user'
import { CtaBanner } from '~/components/cta-banner'
import { Container } from '~/components/ui/container'
import { Features } from './_components/features'
import { Hero } from './_components/hero'

export default async function Home() {
  const user = await getUser()

  return (
    <Container>
      <Hero />
      {/* <FeaturedPosts /> */}
      {/* <Suspense>
        <FeaturedProducts />
      </Suspense> */}
      <Features />
      <CtaBanner />
    </Container>
  )
}
