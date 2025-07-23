import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  // Check if API URL is configured
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not configured");
    return [];
  }

  try {
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return an empty array to prevent build failures
    return [];
  }
};

export default getCategories;
