import type { Billboard } from "@/types";

interface BillboardProps {
  data?: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
        <div className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-gray-200">
          <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
            <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-gray-400">
              Welcome
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${data.imageUrl})`,
          backgroundPosition: "center", // Ensures the image is centered
          backgroundSize: "cover", // Maintains the cover behavior
        }}
        className="rounded-xl relative aspect-[2/1] overflow-hidden"
      >
        <div className="absolute inset-0"></div>{" "}
        <div className="relative h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div
            className="font-bold text-white text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.75)" }}
          >
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
