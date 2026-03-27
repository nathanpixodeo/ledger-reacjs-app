import { Table, Card } from 'antd';
import PageHeader from '../../components/common/PageHeader';

export default function AuditLogPage() {
  // Placeholder — will be connected to API in Phase 2
  const columns = [
    { title: 'Thời gian', dataIndex: 'created_at', key: 'created_at' },
    { title: 'Người dùng', dataIndex: 'user_name', key: 'user_name' },
    { title: 'Hành động', dataIndex: 'action', key: 'action' },
    { title: 'Đối tượng', dataIndex: 'entity', key: 'entity' },
    { title: 'Chi tiết', dataIndex: 'description', key: 'description' },
  ];

  return (
    <div>
      <PageHeader title="Nhật ký hoạt động" />
      <Card>
        <Table
          columns={columns}
          dataSource={[]}
          rowKey="id"
          size="middle"
          locale={{ emptyText: 'Chưa có dữ liệu nhật ký' }}
        />
      </Card>
    </div>
  );
}
