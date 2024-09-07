// components/BottomNavbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Book, Search } from "lucide-react";
import { motion } from "framer-motion";
import { ModeToggle } from "./ui/mode-toggle";

const BottomNavbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/chapters", icon: Book, label: "Chapters" },
    { href: "/search", icon: Search, label: "Search" },
  ];

  return (
    <motion.div
      className="fixed bottom-4 left-0 right-0 flex justify-center z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <nav className="bg-background/80 backdrop-blur-md rounded-full shadow-lg border border-border">
        <ul className="flex items-center justify-center p-2 space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.li
                key={item.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`flex flex-col items-center p-2 transition-colors duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <item.icon size={24} />
                  </motion.div>
                  <span className="text-xs mt-1">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                      layoutId="activeIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <ModeToggle />
          </motion.li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default BottomNavbar;
