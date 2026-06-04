/*
 * 공지사항 등록/수정 폼
 * 새 공지 작성과 기존 공지 수정을 처리한다.
 */

 // ====================
 // Type
 // ====================

type NoticeFormData = {
  title: string;
  content: string;
  isImportant: boolean;

};

// ====================
// Props
// ====================

type NoticeFormProps = {
    mode: "create" | "edit";
    formData: NoticeFormData;
    setFormData: (formData: NoticeFormData) => void;
    setFile: (file: File | null) => void;
    attachmentUrl: string;
    setRemoveFile: (value: boolean) => void;
    setAttachmentUrl: (value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
  };

const FILE_BASE_URL = "http://localhost:9000";

// ====================
// Component
// ====================

function NoticeForm({ mode, formData, setFormData, setFile, attachmentUrl, setRemoveFile, setAttachmentUrl, onSubmit, onCancel,}:
    NoticeFormProps) {


    // 첨부파일 제거
    const handleRemoveFile = () => {
        setRemoveFile(true);
        setAttachmentUrl("");
        setFile(null);
    };

  return (
    <>
     {/* 폼 제목 */}
     <h3>{mode === "create" ? "새글 작성" : "공지 수정"}</h3>

              {/* 제목 입력 */}
              <div className="form-group">
                <label>제목</label>

                <input
                  className="form-input"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              {/* 내용 입력 */}
              <div className="form-group">
                <label>내용</label>
                <textarea
                  className="form-textarea"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
              </div>

              {/* 중요 공지 여부 */}
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  id="isImportant"
                  checked={formData.isImportant}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isImportant: e.target.checked,
                    })
                  }
                />
                <label htmlFor="isImportant">중요 공지로 설정</label>

                <input
                    type="checkbox"
                    id="isUpdate"
                    checked={formData.isUpdate} // 새로운 상태 필요
                    onChange={(e) => setFormData({ ...formData, isUpdate: e.target.checked })}
                  />
                  <label htmlFor="isUpdate">업데이트로 설정</label>
              </div>

              {/* 첨부파일 */}
              <div className="form-group">
                <label>첨부파일</label>

               {/* 수정 모드 + 기존 파일 존재 */}
                {mode === "edit" && attachmentUrl && (
                  <div className="file-current-box">
                    <span>현재 첨부파일</span>

                    <a
                      href={`${FILE_BASE_URL}${attachmentUrl}`}
                      target="_blank"
                      rel="noreferrer">PDF 보기</a>

                    <button
                      type="button"
                      className="file-remove-btn"
                      onClick={handleRemoveFile}>
                      제거</button>
                  </div>
                )}

                 {/* 수정 모드 + 기존 파일 없음 */}
                {mode === "edit" && !attachmentUrl && (
                  <p className="file-empty-text">첨부파일이 없습니다.</p>
                )}

                {/* 새 파일 선택 */}
                <input
                  type="file"
                  accept=".pdf"
                  className="form-input"
                  onChange={(e) => {
                    setFile(e.target.files?.[0] ?? null);
                    setRemoveFile(false);
                  }}
                />
              </div>

              {/* 하단 버튼 */}
              <div className="detail-bottom">
              <button onClick={onCancel}>취소</button>
              <button className="submit-btn" onClick={onSubmit}>
                  {mode === "create" ? "등록하기" : "수정완료"}
              </button>
              </div>
            </>
          );
        }

export default NoticeForm;