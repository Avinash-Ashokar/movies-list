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
    <div className="flex justify-center items-center gap-x-4 mb-[109px]">
      <button
        className="font-bold text-base leading-6"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <div className="flex gap-x-2">
        {pageNumbers.map((number) => (
          <div
            key={number}
            className={`w-32 h-32 rounded-[4px] flex justify-center items-center ${
              currentPage === number ? "bg-[#2BD17E]" : "bg-[#092C39]"
            }`}
            onClick={() => onPageChange(number)}
          >
            <p className="text-base font-bold leading-6">{number}</p>
          </div>
        ))}
      </div>
      <button
        className="font-bold text-base leading-6"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      >
        Next
      </button>
    </div>
  );
}
