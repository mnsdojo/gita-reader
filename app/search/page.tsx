// app/search/page.tsx

"use client";

import { Verse } from "@/lib/api";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Search as SearchIcon } from "lucide-react";
import AnimatedWrapper from "@/components/ui/animated-wrapper";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [results, setResults] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!debouncedSearchTerm.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Replace this with your actual API call
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(debouncedSearchTerm)}`
      );
      if (!response.ok) throw new Error("Failed to search verses");
      const searchResults = await response.json();
      setResults(searchResults);
    } catch (error) {
      console.error("Error searching verses:", error);
      // Implement error handling, e.g., showing an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedWrapper>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Search the Bhagavad Gita</h1>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter keywords or verse numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <SearchIcon className="mr-2 h-4 w-4" />
            )}
            Search
          </Button>
        </div>

        {isLoading && <p className="text-center">Searching...</p>}

        {!isLoading && results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Search Results</h2>
            {results.map((verse) => (
              <Card key={`${verse.chapter}-${verse.verse}`}>
                <CardHeader>
                  <CardTitle>
                    Chapter {verse.chapter}, Verse {verse.verse}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {verse.transliteration}
                  </p>
                  <p>{verse.tej.et}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && debouncedSearchTerm && results.length === 0 && (
          <p className="text-center text-muted-foreground">
            No results found for "{debouncedSearchTerm}"
          </p>
        )}
      </div>
    </AnimatedWrapper>
  );
}
