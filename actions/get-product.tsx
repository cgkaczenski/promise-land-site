import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product | null> => {
  // Check if API URL is configured
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not configured");
    return null;
  }

  try {
    const res = await fetch(`${URL}/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    // Return null to prevent build failures
    return null;
  }
};

export default getProduct;
