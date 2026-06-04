/*
 * 공지사항 검색
 * 검색어와 검색 조건을 받아 부모 컴포넌트의 검색 이벤트를 실행한다.
 */

import { FiSearch } from "react-icons/fi";

// ====================
// Props
// ====================

type NoticeSearchProps = {
  keyword: string;
  searchType: string;
  onKeywordChange: (value: string) => void;
  onSearchTypeChange: (value: string) => void;
  onSearch: () => void;
};

// ====================
// Component
// ====================

function NoticeSearch({ keyword, searchType, onKeywordChange, onSearchTypeChange, onSearch, }:
    NoticeSearchProps) {
      return(
         <div className="notice-search-row">
            <div className="search-box">
             {/* 검색어 입력 */}
              <input
                placeholder="검색어를 입력하세요"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
              />

              {/* 돋보기 아아콘 클릭 */}
              <button type="button" className="search-btn" onClick={onSearch}>
                <FiSearch />
              </button>
            </div>

            {/* 조건별 검색 가능 */}
            <select
              value={searchType}
              onChange={(e) => onSearchTypeChange(e.target.value)}
            >
              <option value="all">전체</option>
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="author">작성자</option>
            </select>
         </div>
  );
}

export default NoticeSearch;