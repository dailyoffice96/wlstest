/*
 * 공지사항 목록
 * 공지사항 목록을 화면에 출력한다.
 * 첨부파일 여부와 중요 공지 여부를 함께 표시한다.
 */

import { Paperclip } from "lucide-react";

// ====================
// Type
// ====================

type NoticeListDto = {
  noticeId: number;
  title: string;
  isImportant: boolean;
  viewCount: number;
  createdAt: string;
  categoryName?: string;
  authorName?: string;
  hasFile?: boolean;
  attachmentUrl?: string;
  isUpdate: false
};

type NoticeDetailDto = {
  noticeId: number;
};

// ====================
// Props
// ====================

type NoticeListProps = {
  notices: NoticeListDto[];
  selectedNotice: NoticeDetailDto | null;
  currentPage: number;
  onSelectNotice: (noticeId: number) => void;
  onCreate: () => void;
  children?: React.ReactNode;

};

const FILE_BASE_URL = "http://localhost:9000";
const userRole = localStorage.getItem("role");

// ====================
// Component
// ====================

function NoticeList({ notices, selectedNotice, currentPage, onSelectNotice, onCreate,  children, }:
    NoticeListProps) {
  return (
    <>
      <div className="list-header">
        <h3>📋 공지 목록</h3>

        {/* 새글 작성 */}
        {userRole === 'ADMIN' && (
        <button className="write-btn" onClick={onCreate}>
          새글 작성
        </button>)}
      </div>

       {children}

      <div className="table-area">
        <table className="notice-table">
          <thead>
            <tr>
              {/* 공지사항 목록 헤더 */}
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
              <th>작성자</th>
              <th>조회수</th>
            </tr>
          </thead>

          <tbody>
            {/* 공지사항 목록 출력 */}
            {notices.map((notice, index) => (
              <tr
                key={notice.noticeId}
                className={
                  selectedNotice?.noticeId === notice.noticeId
                    ? "selected"
                    : ""}
                onClick={() => onSelectNotice(notice.noticeId)} >
                <td>{currentPage * 5 + index + 1}</td>

                <td className="title-cell">
                {/* 중요 공지 표시 */}
                  {notice.isImportant && (
                    <span className="important-badge">중요 </span>
                  )}
                  {notice.title}

                  {/* 첨부파일 표시 */}
                  {notice.hasFile && (
                    <span
                      style={{marginLeft: "6px", display: "inline-flex", alignItems: "center"}}
                      onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`${FILE_BASE_URL}${notice.attachmentUrl}`}
                        download
                        style={{textDecoration: "none"}}>
                        <Paperclip size={14}  color="#888"/>
                      </a>
                    </span>
                  )}
                </td>

                <td> {notice.createdAt?.substring(0, 10)} </td>
                <td> {notice.authorName ?? "관리자"} </td>
                <td>{notice.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default NoticeList;