import { api } from "@/lib/api";
import VerseList from "@/components/VerseList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnimatedWrapper from "@/components/ui/animated-wrapper";
import { Card, CardContent } from "@/components/ui/card";

export default async function ChapterPage({
  params,
}: {
  params: { chapterNumber: string };
}) {
  const chapterNumber = parseInt(params.chapterNumber, 10);
  const chapter = await api.getChapter(chapterNumber);
  const verses = await Promise.all(
    Array.from({ length: chapter.verses_count }, (_, i) =>
      api.getVerse(chapterNumber, i + 1)
    )
  );

  return (
    <AnimatedWrapper>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Chapter {chapter.chapter_number}: {chapter.name}
          </h1>
          <div className="space-x-2">
            {chapterNumber > 1 && (
              <Button variant="outline" asChild>
                <Link href={`/chapters/${chapterNumber - 1}`}>
                  Previous Chapter
                </Link>
              </Button>
            )}
            {chapterNumber < 18 && (
              <Button variant="outline" asChild>
                <Link href={`/chapters/${chapterNumber + 1}`}>
                  Next Chapter
                </Link>
              </Button>
            )}
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Chapter Summary</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">English</h3>
                <p className="text-muted-foreground">{chapter.summary.en}</p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Hindi</h3>
                <p className="text-muted-foreground">{chapter.summary.hi}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Verses</h2>
        <VerseList verses={verses} chapterNumber={chapterNumber} />
      </div>
    </AnimatedWrapper>
  );
}
