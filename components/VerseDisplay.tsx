'use client'

import { Verse } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VerseDisplay({ verse }: { verse: Verse }) {
  const { toast } = useToast();

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Bhagavad Gita - Chapter ${verse.chapter}, Verse ${verse.verse}: ${verse.tej.et}`
    );
    toast({
      title: "Verse copied to clipboard",
      description: "You can now share this verse with others.",
    });
  };

  const handleBookmark = () => {
    // Implement bookmark functionality
    toast({
      title: "Verse bookmarked",
      description: "This verse has been added to your bookmarks.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Verse {verse.verse}</span>
          <div className="space-x-2">
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleBookmark}>
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Sanskrit</h3>
          <p className="italic">{verse.slok}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Transliteration</h3>
          <p>{verse.transliteration}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Translation</h3>
          <p>{verse.tej.et}</p>
        </div>
      </CardContent>
    </Card>
  );
}
