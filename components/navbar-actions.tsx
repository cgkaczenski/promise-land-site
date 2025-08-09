"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  const handleCartClick = () => {
    if (pathname === "/cart") {
      return;
    }

    if (cart.items.length !== 0) {
      router.push("/cart");
    }

    if (cart.items.length === 0) {
      if (pathname === "/donate") {
        router.push("/cart");
      } else {
        router.push("/donate");
      }
    }
  };

  return (
    <TooltipProvider>
      <div className="ml-auto flex items-center gap-x-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleCartClick}
              className="flex items-center rounded-full bg-indigo-600 px-4 py-2"
            >
              <ShoppingCart size={20} color="white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Checkout</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default NavbarActions;
