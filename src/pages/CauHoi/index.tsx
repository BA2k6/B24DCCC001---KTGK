import { Table, Button, Modal, Form, Input, Select } from 'antd';
import { useState } from 'react';

const CauHoiPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    /**
     * {
     *   MaCH: string,
     *   NoiDung: string,
     *   MaMon: string,
     *   MaKhoi: string,
     *   MucDo: 'DE' | 'TRUNG_BINH' | 'KHO'
     * }
     */
    console.log(values);
    setData([...data, values]);
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm câu hỏi
      </Button>

      <Table
        rowKey="MaCH"
        dataSource={data}
        columns={[
          { title: 'Mã CH', dataIndex: 'MaCH' },
          { title: 'Nội dung', dataIndex: 'NoiDung' },
          { title: 'Môn', dataIndex: 'MaMon' },
          { title: 'Khối', dataIndex: 'MaKhoi' },
          { title: 'Mức độ', dataIndex: 'MucDo' },
        ]}
        style={{ marginTop: 16 }}
      />

<Modal
  title="Thêm"
  visible={open}
  onCancel={() => setOpen(false)}
  onOk={() => form.submit()}
>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="MaCH" label="Mã câu hỏi" rules={[{ required: true }]}>
            <Input placeholder="CH_001" />
          </Form.Item>

          <Form.Item name="NoiDung" label="Nội dung" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="MaMon" label="Mã môn" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="MaKhoi" label="Mã khối" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="MucDo" label="Mức độ" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'DE', label: 'Dễ' },
                { value: 'TRUNG_BINH', label: 'Trung bình' },
                { value: 'KHO', label: 'Khó' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CauHoiPage;