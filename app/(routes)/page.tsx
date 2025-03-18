import getPosts from "@/actions/get-posts";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import PostList from "@/components/post-list";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const posts = await getPosts({ isFeatured: true });

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Promised Land Orphanage
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Help us make a difference in the lives of children in need.
          </p>
        </div>

        <div className="pt-4 lg:pt-12">
          <PostList items={posts} />
        </div>

        <div className="pt-4 lg:pt-12">
          <ProductList title="Featured Donations" items={products} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
