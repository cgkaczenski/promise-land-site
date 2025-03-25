"use client";

import { MouseEventHandler } from "react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface DonateCardProps {
  data: Product;
}

const DonateCard: React.FC<DonateCardProps> = ({ data }) => {
  const cart = useCart();
  const router = useRouter();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    cart.addItem(data);
    router.push("/cart");
  };

  return (
    <button
      type="button"
      onClick={onAddToCart}
      className="w-full inline-flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      <ShoppingCart className="-ml-0.5 size-5" aria-hidden="true" />
      <Currency value={data?.price} />
    </button>
  );
};

export default DonateCard;
