"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchBox() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = () => {
    if (search.trim.length) return;
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("query", search);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="w-full max-w-md mx-auto"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter text to search"
        />
        <Button type="submit" className="w-full sm:w-auto">
          <Search className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

export default SearchBox;
