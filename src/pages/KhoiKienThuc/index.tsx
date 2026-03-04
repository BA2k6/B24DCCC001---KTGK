import { Table, Button, Modal, Form, Input } from 'antd';
import { useState } from 'react';

const KhoiKienThucPage = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  // ❗ Sau này data sẽ lấy từ API backend
  const [data, setData] = useState<any[]>([]);

  // Khi submit form
  const onFinish = (values: any) => {
    /**
     * values = {
     *   MaKhoi: string,
     *   TenKhoi: string
     * }
     */
    console.log('DATA GUI BACKEND:', values);

    // ❗ Sau này gọi API POST /knowledge-block
    setData([...data, values]);
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm khối kiến thức
      </Button>

      <Table
        rowKey="MaKhoi"
        dataSource={data}
        columns={[
          { title: 'Mã khối', dataIndex: 'MaKhoi' },
          { title: 'Tên khối', dataIndex: 'TenKhoi' },
        ]}
        style={{ marginTop: 16 }}
      />

      <Modal
        title="Thêm khối kiến thức"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Mã khối"
            name="MaKhoi"
            rules={[{ required: true, message: 'Bắt buộc' }]}
          >
            <Input placeholder="VD: KHOI_01" />
          </Form.Item>

          <Form.Item
            label="Tên khối"
            name="TenKhoi"
            rules={[{ required: true, message: 'Bắt buộc' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default KhoiKienThucPage;