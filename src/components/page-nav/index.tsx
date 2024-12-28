interface PageNavProps {
  totalMovies: number; // Total number of movies available
  moviesPerPage: number; // Number of movies to display per page
  currentPage: number; // The current active page number
  onPageChange: (pageNumber: number) => void; // Function to handle page changes
}

export default function PageNav({
  totalMovies,
  moviesPerPage,
  currentPage,
  onPageChange,
}: PageNavProps) {
  const pageNumbers = []; // Array to hold the page numbers

  // Calculate the total number of pages and populate the pageNumbers array
  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-x-16 mb-[109px]">
      {/* Button to navigate to the previous page */}
      <button
        className="text-body-regular font-bold font-montserrat text-textColor cursor-pointer"
        onClick={() => onPageChange(currentPage - 1)} // Decrease current page by 1
        disabled={currentPage === 1} // Disable if on the first page
      >
        Prev
      </button>
      <div className="flex gap-x-8">
        {/* Render page number buttons */}
        {pageNumbers.map((number) => (
          <div
            key={number} // Unique key for each page number
            className={`w-32 h-32 rounded-[4px] flex justify-center items-center cursor-pointer ${
              currentPage === number ? "bg-[#2BD17E]" : "bg-[#092C39]"
            }`} // Change background color if current page
            onClick={() => onPageChange(number)} // Change to the selected page
          >
            <p className="text-body-regular font-bold font-montserrat text-textColor">
              {number}
            </p>
          </div>
        ))}
      </div>
      {/* Button to navigate to the next page */}
      <button
        className="text-body-regular font-bold font-montserrat text-textColor cursor-pointer"
        onClick={() => onPageChange(currentPage + 1)} // Increase current page by 1
        disabled={currentPage === pageNumbers.length} // Disable if on the last page
      >
        Next
      </button>
    </div>
  );
}
