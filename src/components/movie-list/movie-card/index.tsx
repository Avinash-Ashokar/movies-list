import { Movie } from "@/types";
import Image from "next/image";

export function MovieCard({ movieData }: { movieData: Movie }) {
  const { title, year, imageUrl } = movieData;

  console.log("Movie Data: ", movieData);

  return (
    <div className="w-full h-[334px] sm:h-[504px] bg-[#092C39] rounded-xl">
      <Image
        src={imageUrl}
        alt="Zindagi Na Milagi"
        unoptimized
        width={0}
        height={0}
        className="rounded-t-xl sm:rounded-lg sm:m-[8px] mb-[0px] w-full sm:w-[calc(100%-16px)] h-[246px]"
      />
      <div className="p-3 sm:p-4">
        <h1 className="text-base font-bold leading-6 sm:text-xl sm:font-medium sm:leading-8 text-[#FFFFFF]">
          {title}
        </h1>
        <p className="text-sm font-normal leading-6">{year}</p>
      </div>
    </div>
  );
}
