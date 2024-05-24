import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  path: string;
};

export default function Pagination({
  page,
  totalPages,
  path,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <Link
          href={`${path}?page=${page - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &laquo;
        </Link>
      )}

      {pages.map((currentPage) => (
        <Link
          key={currentPage}
          href={`${path}?page=${currentPage}`}
          className={`${
            page === currentPage && "font-extrabold"
          } bg-white text-gray-900 px-4 py-2 text-sm  ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
        >
          {currentPage}
        </Link>
      ))}

      {page < totalPages && (
        <Link
          href={`${path}?page=${page + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
