import Container from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";

import getProducts from "@/actions/get-products";
import getCategory from "@/actions/get-category";

export const revalidate = 0;

const DonatePage: React.FC = async () => {
  const products = await getProducts({
    categoryId: "876c7bf0-3517-4a63-a229-0e0475917e9a",
  });
  const category = await getCategory("876c7bf0-3517-4a63-a229-0e0475917e9a");

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              <p className="pb-6 text-lg/8 text-gray-600">
                {category.description}
              </p>
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DonatePage;
