import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";
import DonateList from "@/components/donate-list";

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
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
            {/* Using flexbox for layout */}
            <div className="flex flex-col lg:flex-row">
              {/* Main content column */}
              <div className="flex-1 lg:pr-8">
                {/* Header section */}
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

                {/* Donate List for mobile and medium screens */}
                <div className="mt-8 lg:hidden max-w-2xl">
                  <DonateList items={products} />
                </div>

                {/* Products section */}
                <div className="mt-8">
                  <ProductList title="" items={products} />
                </div>
              </div>

              {/* Sidebar column with self-alignment to push it down - only visible on lg screens */}
              <div
                className="hidden lg:block lg:w-1/3 lg:self-start"
                style={{ marginTop: "25vh" }}
              >
                <DonateList items={products} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DonatePage;
