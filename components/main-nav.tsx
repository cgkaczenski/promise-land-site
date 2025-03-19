"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const homeRoute = {
    href: "/",
    label: "Home",
    active: pathname === "/",
  };

  const activitiesRoute = {
    href: "/activities",
    label: "Updated Activities and Pictures",
    active: pathname === "/activities",
  };

  const contactRoute = {
    href: "/contact",
    label: "Contact Us",
    active: pathname === "/contact",
  };

  const donateRoutes = {
    href: "/donate",
    label: "Donate Now",
    active: pathname === "/donate",
  };

  const routes = [homeRoute, donateRoutes, activitiesRoute, contactRoute];

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-indigo-400",
            route.active ? "font-semibold text-indigo-600" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
