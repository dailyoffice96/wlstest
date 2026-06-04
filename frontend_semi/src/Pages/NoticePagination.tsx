/*
 * 공지사항 페이징
 * 현재 페이지와 전체 페이지 수를 받아 이전 / 다음 / 페이지 번호 이동을 처리한다.
 */

// ====================
// Props
// ====================

// 부모 컴포넌트로부터 전달받는 값
type NoticePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

// ====================
// Component
// ====================

// 페이징 컴포넌트
function NoticePagination({ currentPage, totalPages, onPageChange, }:
  NoticePaginationProps) {
  return (
    <div className="pagination">
        {/* 이전 페이지 */}
        <button
          disabled={currentPage === 0}
          onClick={() => onPageChange(currentPage - 1)}
        >
          &lt;&lt;
        </button>

        {/* 페이지 번호*/}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index ? "active" : ""}
            onClick={() => onPageChange(index)}
          >
            {index + 1}
          </button>
        ))}

        {/* 다음 페이지 */}
        <button
          disabled={currentPage >= totalPages - 1}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &gt;&gt;
        </button>
    </div>
  );
}

export default NoticePagination;