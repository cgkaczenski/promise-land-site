"use client";

import { ShoppingCart, Plus, Minus } from "lucide-react";

import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  const existingItem = cart.items.find((item) => item.id === data.id);
  const currentQuantity = existingItem ? cart.quantities[data.id] || 1 : 0;

  const onAdd = () => {
    cart.addItem(data);
  };

  const onDecrement = () => {
    cart.decrementItem(data.id);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="mt-10 flex items-center gap-x-3">
        {currentQuantity > 0 ? (
          <div className="flex items-center gap-x-3">
            <div className="flex items-center gap-x-2">
              <IconButton onClick={onDecrement} icon={<Minus size={20} />} />
              <span className="text-xl font-medium">{currentQuantity}</span>
              <IconButton onClick={onAdd} icon={<Plus size={20} />} />
            </div>
            <Button onClick={onAddToCart} className="flex items-center gap-x-2">
              Update Gift
              <ShoppingCart size={20} />
            </Button>
          </div>
        ) : (
          <Button onClick={onAddToCart} className="flex items-center gap-x-2">
            Add Gift
            <ShoppingCart size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Info;
