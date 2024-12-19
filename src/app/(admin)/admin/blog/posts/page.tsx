import { DataTable } from '~/components/data-table'
import { Typography } from '~/components/typography'
import { columns } from './columns'

const dummyPosts = [
  {
    id: '1',
    title: 'My First Blog Post',
    author: 'John Doe',
    date: new Date('2024-01-15'),
    content: 'This is the content of my first blog post...',
    tags: ['blog', 'introduction'],
    likes: 10,
    comments: 5,
  },
  {
    id: '2',
    title: 'Learning to Code',
    author: 'Jane Smith',
    date: new Date('2024-01-16'),
    content: 'Today I learned about TypeScript...',
    tags: ['programming', 'typescript'],
    likes: 15,
    comments: 8,
  },
  {
    id: '3',
    title: 'Web Development Tips',
    author: 'Bob Wilson',
    date: new Date('2024-01-14'),
    content: 'Here are some useful web development tips...',
    tags: ['webdev', 'tips'],
    likes: 20,
    comments: 12,
  },
]

export default function Page() {
  return (
    <>
      <Typography variant="h3">Posts</Typography>
      <DataTable columns={columns} data={dummyPosts} />
    </>
  )
}
