import { Post } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts`;

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
}

const getPosts = async (query: Query): Promise<Post[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getPosts;
