import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category | null> => {
  // Check if API URL is configured
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not configured");
    return null;
  }

  try {
    const res = await fetch(`${URL}/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch category: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    // Return null to prevent build failures
    return null;
  }
};

export default getCategory;
