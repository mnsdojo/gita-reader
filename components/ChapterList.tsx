import Link from "next/link";
import { Chapter } from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function ChapterList({ chapters }: { chapters: Chapter[] }) {
  return (
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
              <CardDescription>{chapter.translation}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
