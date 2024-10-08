import "server-only";

const API_BASE_URL = "https://vedicscriptures.github.io";

export interface Verse {
  chapter: number;
  verse: number;
  slok: string;
  transliteration: string;
  tej: {
    ht: string;
    et: string;
  };
}

export interface Chapter {
  chapter_number: number;
  verses_count: number;
  name: string;
  translation: string;
  summary: {
    en: string;
    hi: string;
  };
}

export const api = {
  getChapters: async (): Promise<Chapter[]> => {
    const response = await fetch(`${API_BASE_URL}/chapters`);
    if (!response.ok) throw new Error("Failed to fetch chapters");
    return response.json();
  },

  getChapter: async (chapterNumber: number): Promise<Chapter> => {
    const response = await fetch(`${API_BASE_URL}/chapter/${chapterNumber}`);
    if (!response.ok)
      throw new Error(`Failed to fetch chapter ${chapterNumber}`);
    return response.json();
  },

  getVerse: async (
    chapterNumber: number,
    verseNumber: number
  ): Promise<Verse> => {
    const response = await fetch(
      `${API_BASE_URL}/slok/${chapterNumber}/${verseNumber}`
    );
    if (!response.ok)
      throw new Error(`Failed to fetch verse ${chapterNumber}:${verseNumber}`);
    return response.json();
  },

  searchVerses: async (query: string): Promise<Verse[]> => {
    return [];
  },
};
