import { Movie } from "@/types";
import Image from "next/image";

export function MovieCard({ movieData }: { movieData: Movie }) {
  const { title, year, imageUrl } = movieData;

  return (
    <div className="w-full h-[334px] bg-card rounded-xl">
      <Image
        src={imageUrl}
        alt={title}
        unoptimized
        width={0}
        height={0}
        className="rounded-t-xl mb-[0px] w-full h-[246px]"
      />
      <div className="m-12 flex flex-col justify-between h-64">
        <h1 className="text-heading-6 font-bold font-montserrat text-textColor overflow-hidden h-24 truncate">
          {title}
        </h1>
        <p className="text-body-small font-regular font-montserrat text-textColor">
          {year}
        </p>
      </div>
    </div>
  );
}
