"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Post } from "@/types";

interface PostCard {
  data: Post;
}

const PostCard: React.FC<PostCard> = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/donate`);
  };

  const formattedDate = data.date
    ? format(new Date(data.date), "MMM d, yyyy")
    : "No date";

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <h2 className="font-bold text-xl text-gray-900">{data.name}</h2>

      {/* Image with overlay */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data.images?.[0]?.url || "/placeholder.png"}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute inset-0 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push("/donate");
            }}
            className="rounded-full flex items-center justify-center bg-white border border-gray-200 p-2 hover:scale-110 transition"
          >
            <span className="text-gray-600 font-medium px-2">Donate Now!</span>
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">{data.description}</p>
      </div>
    </div>
  );
};

export default PostCard;
