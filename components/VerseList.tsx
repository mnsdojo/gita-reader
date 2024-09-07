


import Link from 'next/link'
import { Verse } from '@/lib/api'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

interface VerseListProps {
  verses: Verse[]
  chapterNumber: number
}

export default function VerseList({ verses, chapterNumber }: VerseListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {verses.map((verse) => (
        <Link key={verse.verse} href={`/chapters/${chapterNumber}/${verse.verse}`}>
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Verse {verse.verse}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
