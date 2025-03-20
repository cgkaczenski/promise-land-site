"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Post } from "@/types";

interface PostCard {
  data: Post;
}

const PostCard: React.FC<PostCard> = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/donate`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 hover:bg-gray-00 transition-colors duration-200 relative h-full flex flex-col"
    >
      <h2 className="font-bold text-xl text-gray-900">{data.name}</h2>

      {/* Image with overlay for larger screens */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data.images?.[0]?.url || "/placeholder.png"}
          alt=""
          fill
          className="aspect-square object-cover rounded-md transition-all duration-200 group-hover:brightness-90"
        />
        {/* Original overlay for lg and larger screens */}
        <div className="hidden lg:flex opacity-0 group-hover:opacity-100 transition absolute inset-0 items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push("/donate");
            }}
            className="rounded-full flex items-center justify-center bg-indigo-600 p-2 hover:scale-110 transition"
          >
            <span className="text-white font-medium px-2">Donate Now!</span>
          </button>
        </div>
      </div>

      {/* Description text */}
      <div className="flex-grow">
        <p className="text-sm text-gray-500">{data.description}</p>
      </div>

      {/* Button below text for all screens, positioned consistently */}
      <div className="flex justify-end mt-auto pt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push("/donate");
          }}
          className="rounded-full flex items-center justify-center bg-indigo-600 p-2 hover:scale-110 transition lg:hidden"
        >
          <span className="text-white font-medium px-2">Donate Now!</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
