import PostCard from "@/components/ui/post-card";
import { Post } from "@/types";
import NoResults from "@/components/ui/no-results";

interface PostListProps {
  items: Post[];
}

const PostList: React.FC<PostListProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <PostCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
