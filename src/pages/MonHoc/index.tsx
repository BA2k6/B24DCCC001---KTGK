import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';
import { useState } from 'react';

const MonHocPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    /**
     * {
     *   MaMon: string,
     *   TenMon: string,
     *   SoTinChi: number
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
        Thêm môn học
      </Button>

      <Table
        rowKey="MaMon"
        dataSource={data}
        columns={[
          { title: 'Mã môn', dataIndex: 'MaMon' },
          { title: 'Tên môn', dataIndex: 'TenMon' },
          { title: 'Số tín chỉ', dataIndex: 'SoTinChi' },
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
          <Form.Item name="MaMon" label="Mã môn" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="TenMon" label="Tên môn" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="SoTinChi" label="Số tín chỉ" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MonHocPage;