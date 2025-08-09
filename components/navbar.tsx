import Link from "next/link";

import MainNav from "@/components/main-nav";
import MobileNav from "@/components/mobile-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import { Category } from "@/types";

interface NavbarProps {
  categories: Category[];
}

const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  return (
    <div className="border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="lg:hidden mr-4">
              <MobileNav categories={categories} />
            </div>
            <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
              <p className="font-bold text-xl text-gray-900">
                The Promised Land
              </p>
            </Link>
          </div>
          <div className="hidden lg:block">
            <MainNav data={categories} />
          </div>
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
