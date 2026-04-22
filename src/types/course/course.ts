export enum CourseStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  PAUSED = 'PAUSED',
}

export interface Course {
  id: string;
  name: string;
  teacher: string;
  students: number;
  description: string;
  status: CourseStatus;
}