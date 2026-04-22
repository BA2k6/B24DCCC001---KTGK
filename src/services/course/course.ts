import { Course } from '@/types/course/course';

const KEY = 'COURSE_LIST';

/**
 * Lấy danh sách khóa học từ localStorage
 */
export const getCourses = (): Course[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Lưu danh sách khóa học vào localStorage
 */
export const saveCourses = (list: Course[]) => {
  localStorage.setItem(KEY, JSON.stringify(list));
};