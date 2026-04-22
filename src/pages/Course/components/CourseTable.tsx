import { Table, Button, Popconfirm, message, Tag } from 'antd';

const statusMap: any = {
  OPEN: { text: 'Đang mở', color: 'green' },
  CLOSED: { text: 'Đã kết thúc', color: 'red' },
  PAUSED: { text: 'Tạm dừng', color: 'orange' },
};

export default ({ data, onEdit, onDelete }: any) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Tên khóa học', dataIndex: 'name' },
    { title: 'Giảng viên', dataIndex: 'teacher' },
    { title: 'Số học viên', dataIndex: 'students' },

    {
      title: 'Mô tả',
      dataIndex: 'description',
      render: (html: string) => (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ),
    },

    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={statusMap[status]?.color}>
          {statusMap[status]?.text}
        </Tag>
      ),
    },

    {
      title: 'Hành động',
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => onEdit(record)}>Sửa</Button>

          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => {
              if (record.students > 0) {
                message.error('Không thể xóa khóa có học viên');
                return;
              }
              onDelete(record.id);
            }}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={data} />;
};