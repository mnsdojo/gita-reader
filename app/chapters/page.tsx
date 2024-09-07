import { api } from "@/lib/api";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import AnimatedWrapper from "@/components/ui/animated-wrapper";

export const metadata = {
  title: "Chapters | Bhagavad Gita Reader",
  description: "Explore all chapters of the Bhagavad Gita",
};

export default async function ChaptersPage() {
  const chapters = await api.getChapters();

  return (
    <AnimatedWrapper>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Chapters of the Bhagavad Gita</h1>
        <p className="text-muted-foreground">
          Explore the wisdom contained in each chapter of the Bhagavad Gita.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((chapter) => (
            <Link
              key={chapter.chapter_number}
              href={`/chapters/${chapter.chapter_number}`}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>
                    Chapter {chapter.chapter_number}: {chapter.name}
                  </CardTitle>
                  <CardDescription>
                    {chapter.summary.en}
                    <br />
                    Verses: {chapter.verses_count}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AnimatedWrapper>
  );
}
