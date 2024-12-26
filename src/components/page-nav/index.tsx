interface PageNavProps {
  totalMovies: number;
  moviesPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export default function PageNav({
  totalMovies,
  moviesPerPage,
  currentPage,
  onPageChange,
}: PageNavProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-x-16 mb-[109px]">
      <button
        className="text-body-regular font-bold font-montserrat text-textColor cursor-pointer"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <div className="flex gap-x-8">
        {pageNumbers.map((number) => (
          <div
            key={number}
            className={`w-32 h-32 rounded-[4px] flex justify-center items-center cursor-pointer ${
              currentPage === number ? "bg-[#2BD17E]" : "bg-[#092C39]"
            }`}
            onClick={() => onPageChange(number)}
          >
            <p className="text-body-regular font-bold font-montserrat text-textColor">
              {number}
            </p>
          </div>
        ))}
      </div>
      <button
        className="text-body-regular font-bold font-montserrat text-textColor cursor-pointer"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      >
        Next
      </button>
    </div>
  );
}
