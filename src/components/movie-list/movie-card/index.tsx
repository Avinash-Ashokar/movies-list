import { Movie } from "@/types";
import Image from "next/image";

export function MovieCard({ movieData }: { movieData: Movie }) {
  const { title, year, imageUrl } = movieData;

  return (
    <div className="w-full h-[334px] md:h-[504px] bg-card rounded-xl md:p-8">
      <Image
        src={imageUrl}
        alt={title}
        unoptimized
        width={0}
        height={0}
        className="rounded-t-xl mb-[0px] w-full h-[246px] md:h-[400px] md:rounded-xl"
      />
      <div className="m-12 md:m-8 flex flex-col justify-between h-64">
        <h1 className="text-heading-6 md:text-body-large md:font-semibold font-bold font-montserrat text-textColor overflow-hidden h-24 md:h-32 truncate">
          {title}
        </h1>
        <p className="text-body-small font-regular font-montserrat text-textColor">
          {year}
        </p>
      </div>
    </div>
  );
}
