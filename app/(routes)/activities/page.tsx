import Container from "@/components/ui/container";
import PostList from "@/components/post-list";
import getPosts from "@/actions/get-posts";

export const revalidate = 0;

const ActivityPage: React.FC = async () => {
  const posts = await getPosts({});

  return (
    <Container>
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
            Activity Feed
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest posts and activities from our
            community.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <PostList items={posts} />
        </div>
      </div>
    </Container>
  );
};

export default ActivityPage;
