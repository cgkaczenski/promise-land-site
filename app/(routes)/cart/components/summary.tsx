"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

interface SummaryProps {
  isPhoneNumberValid: boolean;
}

const Summary = ({ isPhoneNumberValid }: SummaryProps) => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const quantities = useCart((state) => state.quantities);
  const phoneNumber = useCart((state) => state.phoneNumber);
  const removeAll = useCart((state) => state.removeAll);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    const quantity = quantities[item.id] || 1;
    return total + Number(item.price) * quantity;
  }, 0);

  const onCheckout = async () => {
    // Don't proceed if phone number is invalid
    if (!isPhoneNumberValid) {
      toast.error("Please enter a valid phone number or leave it empty");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
          quantities: items.map((item) => quantities[item.id] || 1),
          ...(phoneNumber ? { phone: phoneNumber } : {}),
        }
      );

      window.location = response.data.url;
    } catch (error) {
      toast.error("Something went wrong with checkout.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0 || isLoading || !isPhoneNumberValid}
        className="w-full mt-6"
      >
        {isLoading ? "Processing..." : "Checkout"}
      </Button>
    </div>
  );
};

export default Summary;
