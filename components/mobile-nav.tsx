"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Category } from "@/types";

interface MobileNavProps {
  categories: Category[];
}

const MobileNav: React.FC<MobileNavProps> = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/donate",
      label: "Donate Now",
      active: pathname === "/donate",
    },
    {
      href: "/activities",
      label: "Updated Activities and Pictures",
      active: pathname === "/activities",
    },
    {
      href: "/contact",
      label: "Contact Us",
      active: pathname === "/contact",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="py-4 flex flex-col h-full">
          <div className="px-3 py-2">
            <Link href="/" onClick={() => setOpen(false)}>
              <p className="font-bold text-xl">The Promised Land</p>
            </Link>
          </div>
          <div className="flex flex-col px-3 py-2 space-y-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-indigo-400",
                  route.active
                    ? "font-semibold text-indigo-600"
                    : "text-neutral-500"
                )}
                onClick={() => setOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
