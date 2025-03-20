"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
    router.push("/cart");
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 relative"
    >
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data.images?.[0]?.url}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
        />
        {/* Actions visible on hover for all screen sizes */}
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex justify-center">
            {/* On large screens, show both expand and cart options */}
            <div className="hidden lg:flex gap-x-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <IconButton
                        onClick={onPreview}
                        icon={<Expand size={20} className="text-gray-600" />}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Expand</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <IconButton
                        onClick={onAddToCart}
                        icon={
                          <ShoppingCart size={20} className="text-gray-600" />
                        }
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Donate!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* On small screens, only show expand option (centered) */}
            <div className="lg:hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <IconButton
                        onClick={onPreview}
                        icon={<Expand size={20} className="text-gray-600" />}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Expand</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      {/* Product name */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
      </div>

      {/* Product details for medium and smaller screens - name, price, button in column */}
      <div className="md:block lg:hidden space-y-2">
        <Currency value={data?.price} />
        <button
          type="button"
          onClick={onAddToCart}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <ShoppingCart className="-ml-0.5 size-5" aria-hidden="true" />
          Donate!
        </button>
      </div>

      {/* Product details for large screens */}
      <div className="hidden lg:flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
