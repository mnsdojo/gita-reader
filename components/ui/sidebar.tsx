"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/chapters", icon: Book, label: "Chapters" },
  { href: "/search", icon: Search, label: "Search" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-background text-foreground border-r border-border flex flex-col p-4">
      <Link href="/" className="text-2xl font-bold mb-6">
        Bhagavad Gita
      </Link>
      <nav className="space-y-2 flex-grow">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === item.href && "bg-secondary text-secondary-foreground"
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="mt-auto">
        <ModeToggle />
      </div>
    </div>
  );
}
