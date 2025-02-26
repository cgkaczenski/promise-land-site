import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onAdd = () => {
    cart.addItem(data);
  };

  const onDecrement = () => {
    cart.decrementItem(data.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Currency value={data.price} />
            <div className="flex items-center gap-x-2">
              <IconButton onClick={onDecrement} icon={<Minus size={15} />} />
              <span className="text-lg font-medium">
                {cart.quantities[data.id] || 1}
              </span>
              <IconButton onClick={onAdd} icon={<Plus size={15} />} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
