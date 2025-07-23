import { Post } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts`;

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
}

const getPosts = async (query: Query): Promise<Post[]> => {
  // Check if API URL is configured
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not configured");
    return [];
  }

  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
      },
    });

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Return an empty array to prevent build failures
    return [];
  }
};

export default getPosts;
