import { useEffect, useState } from "react";
import NoticeSidebar from "../components/layout/NoticeSidebar";
import "./NoticeContents.css";
import customAxios from "../api/axiosInstance";
import {
  INITIAL_NOTICE_FORM_DATA,
  getNoticeCategoryDescription,
  getNoticeCategoryTitle,
} from "../constants/notice";
import type { Notice, NoticeFormData, NoticeFormMode } from "../types/NoticePage";
import type { User } from "../types/User";

interface AppRoutesProps {
  user: User | null;
}

function NoticeContents({ user }: AppRoutesProps) {
  const isAdmin = user?.role === "ADMIN";

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);

  const [formMode, setFormMode] = useState<NoticeFormMode>("none");
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  const [formData, setFormData] = useState<NoticeFormData>(
    INITIAL_NOTICE_FORM_DATA
  );

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);

      const response = await customAxios.get("/api/notices");

      setNotices(response.data);
    } catch (error) {
      console.error(error);
      alert("공지사항을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const filteredNotices =
    selectedCategoryId === null
      ? notices
      : notices.filter(
          (notice) => notice.noticeCategoryId === selectedCategoryId
        );

  const handleCreateClick = () => {
    setFormMode("create");
    setEditingNotice(null);

    setFormData({
      noticeCategoryId: selectedCategoryId ?? 1,
      title: "",
      contents: "",
      attachmentUrl: "",
    });
  };

  const handleEditClick = (notice: Notice) => {
    setFormMode("edit");
    setEditingNotice(notice);

    setFormData({
      noticeCategoryId: notice.noticeCategoryId,
      title: notice.title,
      contents: notice.contents,
      attachmentUrl: notice.attachmentUrl || "",
    });
  };

  const handleCancelForm = () => {
    setFormMode("none");
    setEditingNotice(null);

    setFormData(INITIAL_NOTICE_FORM_DATA);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: name === "noticeCategoryId" ? Number(value) : value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }

    if (!formData.contents.trim()) {
      alert("내용을 입력해 주세요.");
      return;
    }

    const requestBody = {
      noticeCategoryId: formData.noticeCategoryId,
      title: formData.title,
      contents: formData.contents,
      attachmentUrl:
        formData.attachmentUrl.trim() === "" ? null : formData.attachmentUrl,
    };

    try {
      if (formMode === "create") {
        await customAxios.post("/api/notices", requestBody);

        setFormMode("none");
        setEditingNotice(null);

        await fetchNotices();

        alert("공지사항이 등록되었습니다.");
      }

      if (formMode === "edit" && editingNotice) {
        await customAxios.put(
          `/api/notices/${editingNotice.noticeId}`,
          requestBody
        );

        alert("공지사항이 수정되었습니다.");

        setFormMode("none");
        setEditingNotice(null);

        await fetchNotices();
      }
    } catch (error) {
      console.error(error);
      alert("공지사항 저장 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteClick = async (noticeId: number) => {
    const confirmDelete = window.confirm("공지사항을 삭제하시겠습니까?");

    if (!confirmDelete) {
      return;
    }

    try {
      await customAxios.delete(`/api/notices/${noticeId}`);

      alert("공지사항이 삭제되었습니다.");

      if (editingNotice?.noticeId === noticeId) {
        handleCancelForm();
      }

      await fetchNotices();
    } catch (error) {
      console.error(error);
      alert("공지사항 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="notice-page">
      <NoticeSidebar
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      <section className="notice-content-area">
        <div className="notice-content-header">
          <div>
            <p className="notice-content-badge">NOTICE</p>
            <h1>{getNoticeCategoryTitle(selectedCategoryId)}</h1>
            <p>{getNoticeCategoryDescription(selectedCategoryId)}</p>
          </div>

          {isAdmin && (
            <button
              type="button"
              className="notice-write-button"
              onClick={handleCreateClick}
            >
              공지 작성
            </button>
          )}
        </div>

        <div
          className={
            formMode === "none"
              ? "notice-main-layout"
              : "notice-main-layout split"
          }
        >
          <div className="notice-list-panel">
            {loading ? (
              <div className="notice-empty">
                공지사항을 불러오는 중입니다.
              </div>
            ) : notices.length === 0 ? (
              <div className="notice-empty">
                등록된 공지사항이 없습니다.
              </div>
            ) : filteredNotices.length === 0 ? (
              <div className="notice-empty">
                {getNoticeCategoryTitle(selectedCategoryId)} 카테고리에 등록된 공지사항이 없습니다.
              </div>
            ) : (
              filteredNotices.map((notice) => (
                <article key={notice.noticeId} className="notice-list-item">
                  <div className="notice-item-top">
                    <div className="notice-item-title-box">
                      <span className="notice-item-category">
                        {notice.noticeCategoryName}
                      </span>

                      <h3>{notice.title}</h3>
                    </div>

                    <div className="notice-item-buttons">
                      {isAdmin && (
                        <>
                          <button
                            type="button"
                            className="notice-small-button edit"
                            onClick={() => handleEditClick(notice)}
                          >
                            수정
                          </button>

                          <button
                            type="button"
                            className="notice-small-button delete"
                            onClick={() => handleDeleteClick(notice.noticeId)}
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="notice-item-meta">
                    <span>글번호 #{notice.noticeId}</span>
                    <span>{notice.createdAt?.replace("T", " ")}</span>

                    {notice.updatedAt && (
                      <span>수정됨 {notice.updatedAt.replace("T", " ")}</span>
                    )}
                  </div>

                  <div className="notice-item-content-box">
                    {notice.contents}
                  </div>

                  {notice.attachmentUrl && (
                    <a
                      className="notice-item-attachment"
                      href={notice.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      첨부파일 열기
                    </a>
                  )}
                </article>
              ))
            )}
          </div>

          {formMode !== "none" && (
            <div className="notice-form-panel">
              <div className="notice-form-title">
                <h2>{formMode === "create" ? "공지 작성" : "공지 수정"}</h2>
                <p>
                  {formMode === "create"
                    ? "관리자 권한으로 공지사항을 등록합니다."
                    : "선택한 공지사항의 내용을 수정합니다."}
                </p>
              </div>

              <form className="notice-form" onSubmit={handleSubmit}>
                <label>
                  카테고리
                  <select
                    name="noticeCategoryId"
                    value={formData.noticeCategoryId}
                    onChange={handleChange}
                  >
                    <option value={1}>공지</option>
                    <option value={2}>중요</option>
                    <option value={3}>업데이트</option>
                    <option value={4}>안내</option>
                  </select>
                </label>

                <label>
                  제목
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="공지 제목을 입력하세요."
                  />
                </label>

                <label>
                  내용
                  <textarea
                    name="contents"
                    value={formData.contents}
                    onChange={handleChange}
                    placeholder="공지 내용을 입력하세요."
                  />
                </label>

                <label>
                  첨부파일 URL
                  <input
                    type="text"
                    name="attachmentUrl"
                    value={formData.attachmentUrl}
                    onChange={handleChange}
                    placeholder="첨부파일 URL을 입력하세요."
                  />
                </label>

                <div className="notice-form-button-row">
                  <button
                    type="button"
                    className="notice-cancel-button"
                    onClick={handleCancelForm}
                  >
                    취소
                  </button>

                  <button type="submit" className="notice-submit-button">
                    {formMode === "create" ? "등록하기" : "수정하기"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default NoticeContents;
