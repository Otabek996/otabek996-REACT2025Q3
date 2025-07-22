import type { PaginationProps } from '../../ts/interfaces/interfaces';

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  hasNext,
  hasPrevious,
  loading = false,
  showPageInfo = true,
}: PaginationProps) {
  const generatePageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    range.push(1);

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

    for (let i = 0; i < uniqueRange.length; i++) {
      if (i === 0) {
        rangeWithDots.push(uniqueRange[i]);
      } else if (uniqueRange[i] - uniqueRange[i - 1] === 2) {
        rangeWithDots.push(uniqueRange[i - 1] + 1);
        rangeWithDots.push(uniqueRange[i]);
      } else if (uniqueRange[i] - uniqueRange[i - 1] !== 1) {
        rangeWithDots.push('...');
        rangeWithDots.push(uniqueRange[i]);
      } else {
        rangeWithDots.push(uniqueRange[i]);
      }
    }

    return rangeWithDots;
  };

  const handlePageClick = (pageNumber: number) => {
    if (
      pageNumber !== currentPage &&
      pageNumber >= 1 &&
      pageNumber <= totalPages
    ) {
      onPageChange(pageNumber);
    }
  };

  const pageNumbers = generatePageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 my-6">
      <div className="flex justify-center items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!hasPrevious || loading}
          className="px-3 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          Prev
        </button>

        {pageNumbers.map((pageNum, index) => (
          <button
            key={index}
            type="button"
            onClick={() =>
              typeof pageNum === 'number' ? handlePageClick(pageNum) : undefined
            }
            disabled={loading || pageNum === '...'}
            className={`px-3 py-2 rounded transition-colors min-w-[40px] ${
              pageNum === currentPage
                ? 'bg-blue-600 text-white font-bold'
                : pageNum === '...'
                  ? 'bg-transparent text-gray-500 cursor-default'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${loading ? 'cursor-not-allowed' : ''}`}
          >
            {pageNum}
          </button>
        ))}

        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext || loading}
          className="px-3 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>

      {showPageInfo && (
        <div className="text-center text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  );
}

export default Pagination;
