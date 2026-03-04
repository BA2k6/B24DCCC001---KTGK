// @ts-nocheck
import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Table,
  Row,
  Col,
  Typography,
  Tag,
} from 'antd';
import { FileAddOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const DeThiPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newDe = {
      MaDe: values.MaDe,
      MaCauTruc: values.MaCauTruc,
      NgayTao: new Date().toLocaleString(),
    };

    setData([...data, newDe]);
    form.resetFields();
  };

  return (
    <div style={{ padding: 24 }}>
      {/* TIÊU ĐỀ */}
      <Title level={3}>📘 Quản lý đề thi</Title>
      <Text type="secondary">
        Sinh đề thi dựa trên cấu trúc đã thiết lập
      </Text>

      <Row gutter={24} style={{ marginTop: 24 }}>
        {/* FORM SINH ĐỀ */}
        <Col span={8}>
          <Card
            title={
              <>
                <FileAddOutlined /> Sinh đề mới
              </>
            }
            bordered={false}
          >
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item
                label="Mã đề"
                name="MaDe"
                rules={[{ required: true, message: 'Vui lòng nhập mã đề' }]}
              >
                <Input placeholder="VD: DE_2026_001" />
              </Form.Item>

              <Form.Item
                label="Mã cấu trúc"
                name="MaCauTruc"
                rules={[{ required: true, message: 'Vui lòng nhập mã cấu trúc' }]}
              >
                <Input placeholder="VD: CT_01" />
              </Form.Item>

              <Button type="primary" block htmlType="submit">
                Sinh đề
              </Button>
            </Form>
          </Card>
        </Col>

        {/* DANH SÁCH ĐỀ */}
        <Col span={16}>
          <Card
            title="📄 Danh sách đề đã sinh"
            bordered={false}
          >
            <Table
              rowKey="MaDe"
              dataSource={data}
              pagination={{ pageSize: 5 }}
              columns={[
                {
                  title: 'Mã đề',
                  dataIndex: 'MaDe',
                  render: (value) => <Tag color="blue">{value}</Tag>,
                },
                {
                  title: 'Mã cấu trúc',
                  dataIndex: 'MaCauTruc',
                  render: (value) => <Tag color="purple">{value}</Tag>,
                },
                {
                  title: 'Ngày tạo',
                  dataIndex: 'NgayTao',
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DeThiPage;