import type { PaginationProps } from '../models/models';
import '../styles/HomePage/Pagination.css';
import Image from 'next/image';

export default function Pagination({
  currentPage,
  pagesCount,
  onPageChange,
}: PaginationProps) {
  const changePage = (isMore: boolean) => {
    const newPage = isMore ? currentPage + 1 : currentPage - 1;
    if (newPage > pagesCount || newPage < 1) return;
    onPageChange(String(newPage));
  };

  return (
    <div className="pagination">
      <Image
        src="/icons/left-arrow.svg"
        width={40}
        height={40}
        alt="left-arrow-icon"
        className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => changePage(false)}
      />

      <div className="current-page"> {currentPage} </div>

      <Image
        src="/icons/right-arrow.svg"
        width={50}
        height={50}
        alt="right-arrow-icon"
        className={`pagination-arrow ${currentPage >= pagesCount ? 'disabled' : ''}`}
        onClick={() => changePage(true)}
      />
    </div>
  );
}
