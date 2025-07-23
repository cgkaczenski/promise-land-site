import { Store } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/store`;

const getStore = async (): Promise<Store> => {
  // Check if API URL is configured
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not configured");
    return {
      id: "",
      name: "Promised Land",
      description:
        "Promised Land Orphanage - Making a difference in children's lives.",
      billboardId: "",
    };
  }

  try {
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error(`Failed to fetch store: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching store:", error);
    // Return a default store object to prevent build failures
    return {
      id: "",
      name: "Promised Land",
      description:
        "Promised Land Orphanage - Making a difference in children's lives.",
      billboardId: "",
    };
  }
};

export default getStore;
