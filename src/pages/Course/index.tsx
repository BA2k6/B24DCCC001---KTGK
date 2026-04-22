import { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Input, Select, message } from 'antd';
import CourseTable from './components/CourseTable';
import CourseForm from './components/CourseForm';
import { v4 as uuidv4 } from 'uuid';
import './index.less';

const { Option } = Select;

const Page = ({ dispatch, course }: any) => {
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [search, setSearch] = useState('');

  const [teacherFilter, setTeacherFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    dispatch({ type: 'course/loadCourses' });
  }, []);

  const handleSubmit = (values: any) => {
    const isDuplicate = course.list.some((c: any) =>
      c.name.toLowerCase().trim() === values.name.toLowerCase().trim() &&
      (!editing || c.id !== editing.id)
    );

    if (isDuplicate) {
      message.error('Tên khóa học đã tồn tại!');
      return;
    }

    if (editing) {
      dispatch({
        type: 'course/updateCourse',
        payload: { ...editing, ...values },
      });
    } else {
      dispatch({
        type: 'course/addCourse',
        payload: { ...values, id: uuidv4() },
      });
    }

    setVisible(false);
    setEditing(null);
  };

 
  let filtered = course.list.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );


  if (teacherFilter) {
    filtered = filtered.filter((c: any) => c.teacher === teacherFilter);
  }

 
  if (statusFilter) {
    filtered = filtered.filter((c: any) => c.status === statusFilter);
  }

 
  if (sortOrder === 'asc') {
    filtered = [...filtered].sort((a, b) => a.students - b.students);
  } else if (sortOrder === 'desc') {
    filtered = [...filtered].sort((a, b) => b.students - a.students);
  }

  return (
    <div style={{ padding: 20 }}>
     
      <div className="filter-bar">
        <Input
          placeholder="Tìm kiếm khóa học"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        
        <Select
          placeholder="Giảng viên"
          allowClear
          value={teacherFilter || undefined}
          className="filter-select"
          onChange={(value) => setTeacherFilter(value || '')}
        >
          <Option value="">Tất cả</Option>
          <Option value="Nguyen Van A">Nguyen Van A</Option>
          <Option value="Tran Thi B">Tran Thi B</Option>
        </Select>

   
        <Select
          placeholder="Trạng thái"
          value={statusFilter || undefined}
          className="filter-select"
          onChange={(value) => setStatusFilter(value || '')}
        >
          <Option value="">Tất cả</Option>
          <Option value="OPEN">Đang mở</Option>
          <Option value="CLOSED">Đã kết thúc</Option>
          <Option value="PAUSED">Tạm dừng</Option>
        </Select>

       
        <Select
          placeholder="Sắp xếp học viên"
          allowClear
          value={sortOrder || undefined}
          className="sort-select"
          onChange={(value) => setSortOrder(value || '')}
        >
          <Option value="">Không sắp xếp</Option>
          <Option value="asc">Tăng dần</Option>
          <Option value="desc">Giảm dần</Option>
        </Select>

        <Button
          type="primary"
          className="add-btn"
          onClick={() => {
            setEditing(null);
            setVisible(true);
          }}
        >
          Thêm khóa học
        </Button>
      </div>

    
      <CourseTable
        data={filtered}
        onEdit={(c: any) => {
          setEditing(c);
          setVisible(true);
        }}
        onDelete={(id: string) =>
          dispatch({ type: 'course/deleteCourse', payload: id })
        }
      />

     
      <CourseForm
        visible={visible}
        initialValues={editing}
        onCancel={() => {
          setVisible(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default connect(({ course }: any) => ({ course }))(Page);