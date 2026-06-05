import { useEffect, useState } from "react";
import "./NoticePage.css";
import NoticePagination from "../../pages/NoticePagination";
import NoticeSearch from "../../pages/NoticeSearch";
import NoticeList from "../../pages/NoticeList";
import NoticeDetail from "../../pages/NoticeDetail";
import NoticeForm from "../../pages/NoticeForm";

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
};

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
  categoryId?: number;
};

type NoticePageProps = {
  type: "all" | "important" | "update";
};

const API_BASE_URL = "http://localhost:9000/api/notices";

function NoticePage({ type }: NoticePageProps) {
  const [notices, setNotices] = useState<NoticeListDto[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<NoticeDetailDto | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [searchType, setSearchType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [mode, setMode] = useState<"detail" | "create" | "edit">("detail");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isImportant: false,
    isUpdate: false,
  });

  const [file, setFile] = useState<File | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [removeFile, setRemoveFile] = useState(false);

  const token = localStorage.getItem("accessToken");
  console.log("현재 토큰:", token);

  async function fetchNoticeDetail(noticeId: number) {
    try {
//       const response = await fetch(`${API_BASE_URL}/${noticeId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
    const response = await fetch(`${API_BASE_URL}/${noticeId}`);

      if (!response.ok) {
        throw new Error("공지사항 상세 조회 실패");
      }

      const data = await response.json();

      setSelectedNotice(data);

      setFormData({
        title: data.title || "",
        content: data.content || "",
        isImportant: data.isImportant || false,
        isUpdate: data.categoryId === 2,
      });

      setNotices((prev) =>
        prev.map((notice) =>
          notice.noticeId === data.noticeId
            ? { ...notice, viewCount: data.viewCount }
            : notice
        )
      );

      setMode("detail");
    } catch (error) {
      console.error(error);
      alert("공지사항 상세 내용을 불러오지 못했습니다.");
    }
  }

  async function fetchNotices() {
    try {
      let requestUrl = `${API_BASE_URL}?page=${currentPage}&size=5`;

      if (type === "important") {
        requestUrl = `${API_BASE_URL}/important?page=${currentPage}&size=5`;
      }

      if (type === "update") {
        requestUrl = `${API_BASE_URL}/update?page=${currentPage}&size=5`;
      }

      if (searchKeyword.trim()) {
        requestUrl = `${API_BASE_URL}/search/list?type=${searchType}&keyword=${encodeURIComponent(
          searchKeyword
        )}&page=${currentPage}&size=5`;
      }

        const response = await fetch(requestUrl);
//       const response = await fetch(requestUrl, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

      if (!response.ok) {
        throw new Error("공지사항 목록 조회 실패");
      }

      const data = await response.json();

      const list = data.content ?? [];

      setNotices(list);
      setTotalPages(data.totalPages ?? 0);

      if (list.length > 0) {
        fetchNoticeDetail(list[0].noticeId);
      } else {
        setSelectedNotice(null);
      }
    } catch (error) {
      console.error(error);
      alert("공지사항 목록을 불러오지 못했습니다.");
    }
  }

  async function createNotice() {
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!formData.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const formDataObj = new FormData();

      formDataObj.append("title", formData.title);
      formDataObj.append("content", formData.content);
      formDataObj.append("isImportant", String(formData.isImportant));
      formDataObj.append("isUpdate", String(formData.isUpdate));
      formDataObj.append("categoryId", String(formData.isUpdate ? 2 : 1));

      if (file) {
        formDataObj.append("file", file);
      }

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(errorText);
        return;
      }

      alert("등록되었습니다.");

      setFormData({
        title: "",
        content: "",
        isImportant: false,
        isUpdate: false,
      });

      setFile(null);
      setAttachmentUrl("");
      setRemoveFile(false);
      setMode("detail");

      fetchNotices();
    } catch (error) {
      console.error(error);
      alert("등록에 실패했습니다.");
    }
  }

  async function updateNotice() {
    if (!selectedNotice) return;

    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!formData.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const formDataObj = new FormData();

      formDataObj.append("title", formData.title);
      formDataObj.append("content", formData.content);
      formDataObj.append("isImportant", String(formData.isImportant));
      formDataObj.append("categoryId", String(formData.isUpdate ? 2 : 1));
      formDataObj.append("removeFile", String(removeFile));

      if (file) {
        formDataObj.append("file", file);
      }

      const response = await fetch(`${API_BASE_URL}/${selectedNotice.noticeId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error("수정 실패");
      }

      alert("수정되었습니다.");

      setFile(null);
      setRemoveFile(false);
      setMode("detail");

      fetchNoticeDetail(selectedNotice.noticeId);
      fetchNotices();
    } catch (error) {
      console.error(error);
      alert("수정에 실패했습니다.");
    }
  }

  async function deleteNotice(noticeId: number) {
    if (!window.confirm("정말 이 공지사항을 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${noticeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("공지사항 삭제 실패");
      }

      alert("삭제되었습니다.");

      setSelectedNotice(null);
      setMode("detail");
      fetchNotices();
    } catch (error) {
      console.error(error);
      alert("공지사항 삭제에 실패했습니다.");
    }
  }

  function handleSearch() {
    setCurrentPage(0);
    setSearchKeyword(keyword.trim());
    setSelectedNotice(null);
    setMode("detail");
  }

  function openCreateMode() {
    setSelectedNotice(null);

    setFormData({
      title: "",
      content: "",
      isImportant: false,
      isUpdate: false,
    });

    setFile(null);
    setAttachmentUrl("");
    setRemoveFile(false);
    setMode("create");
  }

  function openEditMode() {
    if (!selectedNotice) return;

    setAttachmentUrl(selectedNotice.attachmentUrl ?? "");
    setRemoveFile(false);
    setFile(null);
    setMode("edit");
  }

  useEffect(() => {
    setCurrentPage(0);
    setSelectedNotice(null);
  }, [type]);

  useEffect(() => {
    fetchNotices();
  }, [currentPage, searchKeyword, type]);

  return (
    <div className="notice-page">
      <main className="notice-content">
        <section className="notice-list-box">
          <NoticeList
            notices={notices}
            selectedNotice={selectedNotice}
            currentPage={currentPage}
            onSelectNotice={fetchNoticeDetail}
            onCreate={openCreateMode}
          >
            <NoticeSearch
              keyword={keyword}
              searchType={searchType}
              onKeywordChange={setKeyword}
              onSearchTypeChange={setSearchType}
              onSearch={handleSearch}
            />
          </NoticeList>

          <NoticePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>

        <section className="notice-detail-box">
          {mode === "detail" && (
            <NoticeDetail
              selectedNotice={selectedNotice}
              onEdit={openEditMode}
              onDelete={deleteNotice}
            />
          )}

          {mode === "create" && (
            <NoticeForm
              mode="create"
              formData={formData}
              setFormData={setFormData}
              file={file}
              setFile={setFile}
              attachmentUrl={attachmentUrl}
              setRemoveFile={setRemoveFile}
              setAttachmentUrl={setAttachmentUrl}
              onSubmit={createNotice}
              onCancel={() => setMode("detail")}
            />
          )}

          {mode === "edit" && (
            <NoticeForm
              mode="edit"
              formData={formData}
              setFormData={setFormData}
              file={file}
              setFile={setFile}
              attachmentUrl={attachmentUrl}
              removeFile={removeFile}
              setRemoveFile={setRemoveFile}
              setAttachmentUrl={setAttachmentUrl}
              onSubmit={updateNotice}
              onCancel={() => setMode("detail")}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default NoticePage;