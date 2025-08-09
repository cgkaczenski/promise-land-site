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
    // Filter out undefined values before creating the query string
    const queryParams: Record<string, string | boolean> = {};

    if (query.categoryId) {
      queryParams.categoryId = query.categoryId;
    }

    if (query.isFeatured !== undefined) {
      queryParams.isFeatured = query.isFeatured;
    }

    const url = qs.stringifyUrl({
      url: URL,
      query: queryParams,
    });

    console.log("Fetching posts from:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Posts fetched successfully:", data);

    // Validate the data structure
    if (!Array.isArray(data)) {
      console.error("API returned non-array data:", data);
      return [];
    }

    // Validate each post has required fields and provide defaults for optional fields
    const validPosts = data
      .filter((post: any) => {
        if (!post.id || !post.name || !post.description) {
          console.warn("Post missing required fields:", post);
          return false;
        }
        return true;
      })
      .map((post: any) => ({
        id: post.id,
        category: post.category || null,
        name: post.name,
        description: post.description,
        isFeatured: post.isFeatured || false,
        images: post.images || [],
        date: post.date || new Date().toISOString(),
      }));

    console.log(
      `Found ${validPosts.length} valid posts out of ${data.length} total`
    );

    return validPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Return an empty array to prevent build failures
    return [];
  }
};

export default getPosts;
