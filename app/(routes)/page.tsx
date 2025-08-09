import getPosts from "@/actions/get-posts";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import PostList from "@/components/post-list";
import Link from "next/link";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const posts = await getPosts({ isFeatured: true });

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32">
      <div className="relative isolate pt-2 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-10 sm:py-14 lg:py-18">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Updates and pictures.{" "}
              <Link
                href="/activities"
                className="font-semibold text-indigo-600"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              The Promised Land Orphanage
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              Help us make a difference in the lives of children in need.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/donate"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Donate now!
              </Link>
              <Link
                href="/activities"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
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
