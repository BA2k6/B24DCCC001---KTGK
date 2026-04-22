import { Modal, Form, Input, Select, InputNumber } from 'antd';
import { useEffect } from 'react';
import { CourseStatus } from '@/types/course/course';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const teachers = ['Nguyen Van A', 'Tran Thi B'];

export default ({ visible, onCancel, onSubmit, initialValues }: any) => {
  const [form] = Form.useForm();

  // reset + set dữ liệu khi mở form
  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }
  }, [visible, initialValues]);

  const handleOk = async () => {
    const values = await form.validateFields();
    onSubmit(values);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      title="Thông tin khóa học"
      width={700}
      destroyOnClose
    >
      <Form form={form} layout="vertical">

        {/* TÊN KHÓA HỌC */}
        <Form.Item
          name="name"
          label="Tên khóa học"
          rules={[
            { required: true, message: 'Không được để trống' },
            { max: 100, message: 'Tối đa 100 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>

        {/* GIẢNG VIÊN */}
        <Form.Item
          name="teacher"
          label="Giảng viên"
          rules={[{ required: true, message: 'Chọn giảng viên' }]}
        >
          <Select options={teachers.map(t => ({ label: t, value: t }))} />
        </Form.Item>

        {/* SỐ HỌC VIÊN */}
        <Form.Item
          name="students"
          label="Số học viên"
          rules={[{ required: true, message: 'Nhập số học viên' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        {/* 🔥 HTML EDITOR - REACT QUILL */}
        <Form.Item name="description" label="Mô tả khóa học">
          <ReactQuill
            theme="snow"
            value={form.getFieldValue('description') || ''}
            onChange={(value) => {
              form.setFieldsValue({ description: value });
            }}
            style={{ height: 200, marginBottom: 40 }}
          />
        </Form.Item>

        {/* TRẠNG THÁI */}
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Chọn trạng thái' }]}
        >
          <Select
            options={[
              { label: 'Đang mở', value: CourseStatus.OPEN },
              { label: 'Đã kết thúc', value: CourseStatus.CLOSED },
              { label: 'Tạm dừng', value: CourseStatus.PAUSED },
            ]}
          />
        </Form.Item>

      </Form>
    </Modal>
  );
};