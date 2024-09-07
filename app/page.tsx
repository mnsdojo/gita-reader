import AnimatedWrapper from "@/components/ui/animated-wrapper";
import ChapterList from "@/components/ChapterList";
import { api } from "@/lib/api";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

async function getRandomVerse() {
  const chapters = await api.getChapters();
  const randomChapter = Math.floor(Math.random() * chapters.length) + 1;
  const chapter = await api.getChapter(randomChapter);
  const randomVerse = Math.floor(Math.random() * chapter.verses_count) + 1;
  return api.getVerse(randomChapter, randomVerse);
}

async function Page() {
  const chapters = await api.getChapters();
  const verseOfTheDay = await getRandomVerse();

  return (
    <AnimatedWrapper>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Bhagavad Gita</h1>
        <p className="text-xl text-muted-foreground">
          Explore the timeless wisdom of the Bhagavad Gita
        </p>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Verse of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic">{verseOfTheDay.slok}</p>
            <p className="mt-2">{verseOfTheDay.transliteration}</p>
            <p className="mt-2 font-semibold">{verseOfTheDay.tej.et}</p>
            <p className="text-sm mt-2 opacity-80">
              Chapter {verseOfTheDay.chapter}, Verse {verseOfTheDay.verse}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button asChild size="lg">
            <Link href="/chapters/1">Start Reading</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`/chapters/${Math.floor(Math.random() * 18) + 1}`}>
              Random Chapter
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About the Bhagavad Gita</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The Bhagavad Gita, often referred to as the Gita, is a 700-verse
              Hindu scripture that is part of the epic Mahabharata. It presents
              a synthesis of Hindu ideas about dharma, theistic bhakti, and the
              yogic ideals of moksha.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mt-8">Chapters</h2>
        <ChapterList chapters={chapters} />
      </div>
    </AnimatedWrapper>
  );
}

export default Page;
