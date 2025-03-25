import DonateCard from "@/components/donate-card";
import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";

interface DonateListProps {
  items: Product[];
}

const DonateList: React.FC<DonateListProps> = ({ items }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow sticky top-8">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">
          Choose Monthly Amount
        </h3>
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:p-6">
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <DonateCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonateList;
