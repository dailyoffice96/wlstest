/*
 * 공지사항 목록 조회
 * 전체공지 / 중요공지 / 업데이트
 * 조건에 따라 API를 변경한다.
 */

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/config";
import "./NoticePage.css";
import NoticePagination from "../../Pages/NoticePagination";
import NoticeSearch from "../../Pages/NoticeSearch";
import NoticeList from "../../Pages/NoticeList";
import NoticeDetail from "../../Pages/NoticeDetail";
import NoticeForm from "../../Pages/NoticeForm";
import type { NoticeListDto, NoticeDetailDto, NoticeFormData, NoticePageType,} from "../../types/notice";

type NoticePageProps = {
  type: NoticePageType;
};

const NOTICE_API_URL = `${API_BASE_URL}/api/notices`;

function NoticePage({ type }: NoticePageProps) {

  // ====================
  // State
  // ====================

  // 공지 목록
  const [notices, setNotices] = useState<NoticeListDto[]>([]);

  // 선택된 공지
  const [selectedNotice, setSelectedNotice] = useState<NoticeDetailDto | null>(null);

  // 로딩상태
  const [loading, setLoading] = useState(false);

  // 페이지 정보
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // 검색 조건
  const [searchType, setSearchType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 화면 모드
  const [mode, setMode] = useState<"detail" | "create" | "edit">("detail");

  // 등록/수정 폼
  const [formData, setFormData] =
    useState<NoticeFormData>({
    title: "",
    content: "",
    isImportant: false,
    isUpdate: false,
  });
    const userRole = localStorage.getItem("role");
    const isAdmin = userRole === 'ADMIN';

  // 첨부파일
  const [file, setFile] = useState<File | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [removeFile, setRemoveFile] = useState(false);

  const [autoSelectFirst, setAutoSelectFirst] = useState(true);

  // 권한 토큰
  const token = localStorage.getItem("accessToken");

  // ====================
  // API
  // ====================

  // 공지 목록 조회
  const fetchNotices = async () => {
    try {
      setLoading(true);

      let requestUrl = `${NOTICE_API_URL}?page=${currentPage}&size=5`;

      if (type === "important") {
        requestUrl = `${NOTICE_API_URL}/important?page=${currentPage}&size=5`;
      }

      if (type === "update") {
        requestUrl = `${NOTICE_API_URL}/update?page=${currentPage}&size=5`;
      }

      if (searchKeyword.trim()) {
        requestUrl = `${NOTICE_API_URL}/search/list?type=${searchType}&keyword=${encodeURIComponent(
          searchKeyword
        )}&page=${currentPage}&size=5`;
      }

        const response = await fetch(requestUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      if (!response.ok) {
        throw new Error("공지사항 목록 조회 실패");
      }

      const data = await response.json();

      setNotices(data.content ?? []);
      setTotalPages(data.totalPages ?? 0);

     if (autoSelectFirst && data.content?.length > 0) {
       fetchNoticeDetail(data.content[0].noticeId);
       setAutoSelectFirst(false);
     }

    } catch (error) {
      console.error(error);
      alert("공지사항 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 공지 상세 조회
  const fetchNoticeDetail = async (noticeId: number) => {
    try {
      const response = await fetch(`${NOTICE_API_URL}/${noticeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      if (!response.ok) {
        throw new Error("공지사항 상세 조회 실패");
      }

      const data = await response.json();

      setFormData({
        title: data.title || "",
        content: data.content || "",
        isImportant: data.isImportant || false,
        isUpdate: data.categoryId === 2
      });

      setSelectedNotice(data);

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
  };

  // 공지 등록
  const createNotice = async () => {
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

      const categoryId = formData.isUpdate ? 2 : 1;
      formDataObj.append("categoryId", String(categoryId));

      if (file) {
        formDataObj.append("file", file);
      }

      const response = await fetch(NOTICE_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
          },
        body: formDataObj,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("등록 실패 응답:", errorText);
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
      setRemoveFile(false);
      setAttachmentUrl("");
      setMode("detail");

      fetchNotices();
    } catch (error) {
      console.error(error);
      alert("등록에 실패했습니다.");
    }
  };

  // 공지 수정
  const updateNotice = async () => {
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
      const categoryId = formData.isUpdate ? 2 : 1;
      formDataObj.append("categoryId", String(categoryId));
      formDataObj.append("removeFile", String(removeFile));

      if (file) {
        formDataObj.append("file", file);
      }

      const response = await fetch(
        `${NOTICE_API_URL}/${selectedNotice.noticeId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataObj,
        }
      );

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
  };

  // 공지 삭제
  const deleteNotice = async (noticeId: number) => {
    if (!window.confirm("정말 이 공지사항을 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`${NOTICE_API_URL}/${noticeId}`, {
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
  };

  // ====================
  // Event
  // ====================

  const handleSearch = () => {
    setCurrentPage(0);
    setSearchKeyword(keyword.trim());
    setSelectedNotice(null);
    setMode("detail");
  };

   // 새글 작성 모드 진입
   const openCreateMode = () => {
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
   };


    // 수정 모드 진입
    const openEditMode = () => {
      if (!selectedNotice) return;

      setAttachmentUrl(selectedNotice.attachmentUrl ?? "");
      setRemoveFile(false);
      setFile(null);

      setMode("edit");
    };
  // ====================
  // Effect
  // ====================
  useEffect(() => {
      setCurrentPage(0);
      setSelectedNotice(null);
      setAutoSelectFirst(true);
    }, [type]);

  useEffect(() => {
    fetchNotices();
  }, [currentPage, searchKeyword, type, autoSelectFirst]);



  // ====================
  // Render
  // ====================

  return (
    <div className="notice-page">
      <main className="notice-content">
        <section className="notice-list-box">
           {/* 공지 목록 */}
           <NoticeList
                notices={notices}
                selectedNotice={selectedNotice}
                currentPage={currentPage}
                onSelectNotice={fetchNoticeDetail}
                onCreate={openCreateMode}
             >
               {/* NoticeList 컴포넌트 안으로 검색창을 넣습니다 */}
               <NoticeSearch
                 keyword={keyword}
                 searchType={searchType}
                 onKeywordChange={setKeyword}
                 onSearchTypeChange={setSearchType}
                 onSearch={handleSearch}
               />
             </NoticeList>

          {/* 페이징 */}
          <NoticePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}/>
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