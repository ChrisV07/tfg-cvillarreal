import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  path: string;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  path,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <button
          onClick={() => onPageChange(page - 1)}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &laquo;
        </button>
      )}

      {pages.map((currentPage) => (
        <button
          key={currentPage}
          onClick={() => onPageChange(currentPage)}
          className={`${
            page === currentPage && "font-extrabold"
          } bg-white text-gray-900 px-4 py-2 text-sm  ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
        >
          {currentPage}
        </button>
      ))}

      {page < totalPages && (
        <button
          onClick={() => onPageChange(page + 1)}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </button>
      )}
    </nav>
  );
}