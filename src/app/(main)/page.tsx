import { CtaBanner } from '~/components/cta-banner'
import { Container } from '~/components/ui/container'
import { Features } from './_components/features'
import { Hero } from './_components/hero'

export default async function Home() {
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
