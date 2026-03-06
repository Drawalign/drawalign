"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/type";

type Props = {
  items: NavItem[];
  variant: "header" | "sidebar";
  onNavigate?: () => void;
};

export function NavLinks({ items, variant, onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const isActive = pathname === item.href;

        if (variant === "header") {
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "font-medium md:text-sm lg:text-lg transition-colors hover:text-muted-foreground",
                isActive ? "text-foreground" : "text-foreground",
              )}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "rounded-md px-3 py-2 font-medium text-sm lg:text-lg transition-colors hover:bg-muted hover:text-muted-foreground",
              isActive ? "bg-muted text-foreground" : "text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
