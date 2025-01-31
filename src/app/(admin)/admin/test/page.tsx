import { Container } from '~/components/ui/container'
import { Upload } from '~/components/widgets/upload/ui'
import { MediaList } from '../media/@list/_components/media-list'

export default function Page() {
  return (
    <Container className="max-w-4xl py-4 md:py-8">
      <Upload />
      <MediaList />
    </Container>
  )
}
