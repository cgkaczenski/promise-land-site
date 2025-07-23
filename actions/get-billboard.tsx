import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string): Promise<Billboard | null> => {
  // Check if API URL is configured
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not configured");
    return null;
  }

  try {
    const res = await fetch(`${URL}/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch billboard: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching billboard:", error);
    // Return null to prevent build failures
    return null;
  }
};

export default getBillboard;
