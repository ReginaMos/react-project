import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';
import type { PaginationProps } from '../models/models';
import '../styles/HomePage/Pagination.css';

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
      <img
        src={leftArrow}
        alt="left-arrow-icon"
        className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => changePage(false)}
      />
      <div className="current-page"> {currentPage} </div>
      <img
        src={rightArrow}
        alt="right-arrow-icon"
        className={`pagination-arrow ${currentPage >= pagesCount ? 'disabled' : ''}`}
        onClick={() => changePage(true)}
      />
    </div>
  );
}
