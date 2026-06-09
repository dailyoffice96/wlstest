import axios from "axios";

export interface LectureProgressRecentDto {
  lectureId: number;
  lectureName: string;
  lastViewedAt: string;
  viewCount: number;
}

export const recordLectureView = async (
  lectureId: number
): Promise<void> => {
  await axios.post(`/api/lecture/progress/view`);
};

export const getRecentLecture = async (): Promise<LectureProgressRecentDto | null> => {
  const response = await axios.get<LectureProgressRecentDto>(
    "/api/lecture/progress/recent",
    {
      validateStatus: (status) => status === 200 || status === 204,
    }
  );

  if (response.status === 204) {
    return null;
  }

  return response.data;
};