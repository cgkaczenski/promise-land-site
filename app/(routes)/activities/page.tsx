import Container from "@/components/ui/container";
import PostList from "@/components/post-list";
import getPosts from "@/actions/get-posts";

const ActivityPage: React.FC = async () => {
  const posts = await getPosts({});

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Activity Feed
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest posts and activities from our
              community.
            </p>
          </div>

          <div className="mx-auto">
            <PostList items={posts} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ActivityPage;
