import { Movie } from "@/types"; // Importing the Movie type for type safety
import Image from "next/image"; // Importing the Image component from Next.js for optimized image handling

// MovieCard component that takes movieData as a prop
export function MovieCard({ movieData }: { movieData: Movie }) {
  // Destructuring the movieData object to extract title, year, and imageUrl
  const { title, year, imageUrl } = movieData;

  return (
    <div className="w-full h-[334px] md:h-[504px] bg-card rounded-xl md:p-8">
      {/* Main container for the movie card */}
      <Image
        src={imageUrl} // Image source URL
        alt={title} // Alt text for accessibility
        unoptimized // Disabling optimization for this image
        width={0} // Setting width to 0 for responsive behavior
        height={0} // Setting height to 0 for responsive behavior
        className="rounded-t-xl mb-[0px] w-full h-[246px] md:h-[400px] md:rounded-xl" // Styling for the image
      />
      <div className="m-12 md:m-8 flex flex-col justify-between h-64">
        {/* Container for title and year */}
        <h1 className="text-heading-6 md:text-body-large md:font-semibold font-bold font-montserrat text-textColor overflow-hidden h-24 md:h-32 truncate">
          {title} {/* Displaying the movie title */}
        </h1>
        <p className="text-body-small font-regular font-montserrat text-textColor">
          {year} {/* Displaying the release year of the movie */}
        </p>
      </div>
    </div>
  );
}
