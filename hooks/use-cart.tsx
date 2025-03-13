import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";

interface CartStore {
  items: Product[];
  quantities: { [key: string]: number };
  phoneNumber: string;
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeAll: () => void;
  setPhoneNumber: (phone: string) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      quantities: {},
      phoneNumber: "",
      addItem: (data: Product) => {
        const currentItems = get().items;
        const currentQuantities = get().quantities;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          set({
            quantities: {
              ...currentQuantities,
              [data.id]: (currentQuantities[data.id] || 1) + 1,
            },
          });
          toast.success("Item quantity increased.");
          return;
        }

        set({
          items: [...get().items, data],
          quantities: {
            ...currentQuantities,
            [data.id]: 1,
          },
        });
        toast.success("Item added to gift basket.");
      },
      removeItem: (id: string) => {
        const newQuantities = { ...get().quantities };
        delete newQuantities[id];
        set({
          items: [...get().items.filter((item) => item.id !== id)],
          quantities: newQuantities,
        });
        toast.success("Item removed from gift basket.");
      },
      decrementItem: (id: string) => {
        const currentQuantities = get().quantities;
        const currentQuantity = currentQuantities[id] || 1;

        if (currentQuantity <= 1) {
          // If quantity would go to 0, remove the item entirely
          get().removeItem(id);
          return;
        }

        set({
          quantities: {
            ...currentQuantities,
            [id]: currentQuantity - 1,
          },
        });
        toast.success("Item quantity decreased.");
      },
      removeAll: () => set({ items: [], quantities: {} }),
      setPhoneNumber: (phone: string) => set({ phoneNumber: phone }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
