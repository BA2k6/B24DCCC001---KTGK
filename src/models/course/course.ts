import { getCourses, saveCourses } from '@/services/course/course';
import { Course } from '@/types/course/course';

export default {
  namespace: 'course',

  state: {
    list: [] as Course[],
  },

  reducers: {
    setCourses(state: any, { payload }: any) {
      return { ...state, list: payload };
    },
  },

  effects: {
  
    *loadCourses(_: any, { put }: any): any {
      const data = getCourses(); 
      yield put({ type: 'setCourses', payload: data });
    },

    *addCourse({ payload }: any, { select, put }: any): any {
      const list = yield select((state: any) => state.course.list);

      const newList = [...list, payload];

      saveCourses(newList);

      yield put({
        type: 'setCourses',
        payload: newList,
      });
    },


    *updateCourse({ payload }: any, { select, put }: any): any {
      const list = yield select((state: any) => state.course.list);

      const newList = list.map((c: Course) =>
        c.id === payload.id ? payload : c
      );

      saveCourses(newList);

      yield put({
        type: 'setCourses',
        payload: newList,
      });
    },

  
    *deleteCourse({ payload }: any, { select, put }: any): any {
      const list = yield select((state: any) => state.course.list);

      const newList = list.filter((c: Course) => c.id !== payload);

      saveCourses(newList);

      yield put({
        type: 'setCourses',
        payload: newList,
      });
    },
  },
};