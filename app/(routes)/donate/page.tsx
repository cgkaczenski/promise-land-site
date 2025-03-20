import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";

import getProducts from "@/actions/get-products";
import getCategory from "@/actions/get-category";

export const revalidate = 0;

const DonatePage = async () => {
  const products = await getProducts({
    categoryId: "876c7bf0-3517-4a63-a229-0e0475917e9a",
  });
  const category = await getCategory("876c7bf0-3517-4a63-a229-0e0475917e9a");

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <Container>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
            <div className="max-w-2xl">
              <p className="text-base font-semibold text-indigo-600">
                Your donation makes a difference
              </p>
              <h2 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Donate Now
              </h2>
              <p className="mt-6 text-lg text-gray-500">
                {category?.description ||
                  "Support our cause with your generous donation."}
              </p>
            </div>
            <div className="mt-12">
              <ProductList title="" items={products} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DonatePage;
