"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import Summary from "./components/summary";
import CartItem from "./components/cart-item";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";

export const revalidate = 0;

// Define the form schema with Zod
const formSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .refine(
      (val) => {
        // Allow empty string (optional field)
        if (val === "") return true;

        // Validation - exactly 10 digits
        const digitsOnly = val.replace(/\D/g, "");
        return digitsOnly.length === 10;
      },
      {
        message: "Please enter a valid phone number with exactly 10 digits",
      }
    ),
});

type FormValues = z.infer<typeof formSchema>;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const items = useCart((state) => state.items);
  const phoneNumber = useCart((state) => state.phoneNumber);
  const setPhoneNumber = useCart((state) => state.setPhoneNumber);

  // Initialize form with react-hook-form and zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: phoneNumber || "",
    },
  });

  // Update the form when phoneNumber changes in the store
  useEffect(() => {
    if (phoneNumber !== form.getValues().phoneNumber) {
      form.setValue("phoneNumber", phoneNumber || "");
    }
  }, [phoneNumber, form]);

  // Update the cart when the form values change
  const onSubmit = (data: FormValues) => {
    if (form.formState.isValid) {
      setPhoneNumber(data.phoneNumber || "");
    }
  };

  // Check if the phone number is valid or empty
  const isPhoneNumberValid = () => {
    const value = form.getValues().phoneNumber || "";
    if (value === "") return true; // Empty is valid (optional field)

    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.length === 10;
  };

  // Handle real-time input changes
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("phoneNumber", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Only update the cart state if validation passes
    const digitsOnly = value.replace(/\D/g, "");
    if (value === "" || digitsOnly.length === 10) {
      setPhoneNumber(value);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Donation Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {items.length === 0 && (
                <div className="text-center space-y-4">
                  <p className="text-neutral-500">
                    No items added to donation cart.
                  </p>
                  <Link href="/donate">
                    <Button className="mt-2 bg-indigo-600">
                      Go to Donate Page
                    </Button>
                  </Link>
                </div>
              )}
              <ul>
                {items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>

              {/* Phone number input using shadcn Form components */}
              {items.length > 0 && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-8  border-gray-200 pt-6"
                    onChange={() => form.trigger("phoneNumber")}
                  >
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="(123) 456-7890"
                              {...field}
                              onChange={handlePhoneChange}
                              onBlur={() => form.trigger("phoneNumber")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              )}
            </div>
            <Summary isPhoneNumberValid={isPhoneNumberValid()} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
