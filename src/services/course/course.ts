import { Course } from '@/types/course/course';

const KEY = 'COURSE_LIST';

export const getCourses = (): Course[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCourses = (list: Course[]) => {
  localStorage.setItem(KEY, JSON.stringify(list));
};