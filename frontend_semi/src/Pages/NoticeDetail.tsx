/*
 * 공지사항 상세보기
 * 선택된 공지사항의 제목, 내용, 작성자, 작성일, 조회수, 첨부파일을 표시한다.
 * 수정/삭제 버튼 클릭 시 이벤트를 실행한다.
 */

// ====================
// Type
// ====================


type NoticeDetailDto = {
  noticeId: number;
  title: string;
  content: string;
  isImportant: boolean;
  viewCount: number;
  createdAt: string;
  categoryName?: string;
  authorName?: string;
  attachmentUrl?: string;
  originalFileName?: string;
  isUpdate: boolean;
};

// ====================
// Props
// ====================


   type  NoticeDetailProps = {
      selectedNotice: NoticeDetailDto | null;
      onEdit: () => void;
      onDelete: (noticeId: number) => void;
   };

    const FILE_BASE_URL = "http://localhost:9000";
    const userRole = localStorage.getItem("role");

// ====================
// Component
// ====================

   function NoticeDetail({selectedNotice, onEdit, onDelete,}:  NoticeDetailProps) {
     if (!selectedNotice) {
                return null;
      }
    return (
            <section className="notice-detail-box">
                  <h3>📄 공지 상세보기</h3>

                  <div className="detail-title-row">
                    {/* 중요 공지 표시 */}
                    {selectedNotice.isImportant && (
                      <span className="important-badge big">중요</span>)}
                    <h2>{selectedNotice.title}</h2>
                  </div>

                  <div className="detail-meta">
                    <span>작성자 {selectedNotice.authorName ?? "관리자"}</span>
                    <span>작성일 {selectedNotice.createdAt?.substring(0, 10)}</span>
                    <span>조회 {selectedNotice.viewCount}</span>
                  </div>

                  <div className="detail-content">{selectedNotice.content}</div>

                  {/* 첨부파일 */}
                  {selectedNotice.attachmentUrl && (
                    <div className="file-current-box">
                      <span>첨부파일 </span>

                      <a
                        href={`${FILE_BASE_URL}/api/notices/download/${
                        selectedNotice.attachmentUrl?.split("/").pop()}`}>
                        {selectedNotice.originalFileName || selectedNotice.attachmentUrl.split("_").slice(1).join("_")}
                      </a>
                    </div>
                  )}

                  {userRole === 'ADMIN' && selectedNotice && (
                    <div
                      className="detail-bottom"
                      style={{ display: "flex", gap: "10px", marginTop: "20px" }}
                    >
                      <button onClick={onEdit}>수정하기</button>
                      <button onClick={() => onDelete(selectedNotice.noticeId)}>삭제하기</button>
                    </div>
                  )}
        </section>
   );
}



export default NoticeDetail;