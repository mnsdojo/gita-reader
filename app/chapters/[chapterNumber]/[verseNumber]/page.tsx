import { api } from "@/lib/api";
import VerseDisplay from "@/components/VerseDisplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnimatedWrapper from "@/components/ui/animated-wrapper";

export default async function VersePage({
  params,
}: {
  params: { chapterNumber: string; verseNumber: string };
}) {
  const chapterNumber = parseInt(params.chapterNumber, 10);
  const verseNumber = parseInt(params.verseNumber, 10);
  const verse = await api.getVerse(chapterNumber, verseNumber);
  const chapter = await api.getChapter(chapterNumber);

  return (
    <AnimatedWrapper>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Chapter {chapterNumber}, Verse {verseNumber}
          </h1>
          <div className="space-x-2">
            {verseNumber > 1 && (
              <Button variant="outline" asChild>
                <Link href={`/chapters/${chapterNumber}/${verseNumber - 1}`}>
                  Previous Verse
                </Link>
              </Button>
            )}
            {verseNumber < chapter.verses_count && (
              <Button variant="outline" asChild>
                <Link href={`/chapters/${chapterNumber}/${verseNumber + 1}`}>
                  Next Verse
                </Link>
              </Button>
            )}
          </div>
        </div>
        <VerseDisplay verse={verse} />
        <Button asChild>
          <Link href={`/chapters/${chapterNumber}`}>Back to Chapter</Link>
        </Button>
      </div>
    </AnimatedWrapper>
  );
}
