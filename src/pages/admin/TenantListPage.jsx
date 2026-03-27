import { Table, Button, Tag, Space, Popconfirm } from 'antd';
import { CheckCircleOutlined, StopOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { useTenants, useSuspendTenant, useActivateTenant } from '../../hooks/useTenant';

export default function TenantListPage() {
  const navigate = useNavigate();
  const { data: tenants = [], isLoading } = useTenants();
  const suspendMutation = useSuspendTenant();
  const activateMutation = useActivateTenant();

  const planColors = { free: 'default', pro: 'blue', enterprise: 'gold' };
  const planLabels = { free: 'Miễn phí', pro: 'Chuyên nghiệp', enterprise: 'Doanh nghiệp' };

  const columns = [
    { title: 'Tên công ty', dataIndex: 'name', key: 'name' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
    {
      title: 'Gói',
      dataIndex: 'plan',
      key: 'plan',
      render: (p) => <Tag color={planColors[p]}>{planLabels[p] || p}</Tag>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (s) => (
        <Tag color={s === 'active' ? 'green' : 'red'}>
          {s === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
        </Tag>
      ),
    },
    { title: 'Người dùng', dataIndex: 'users_count', key: 'users_count', align: 'center' },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (d) => new Date(d).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/tenants/${record.id}`)}>
            Chi tiết
          </Button>
          {record.status === 'active' ? (
            <Popconfirm
              title="Tạm ngưng khách hàng này?"
              onConfirm={() => suspendMutation.mutate(record.id)}
              okText="Tạm ngưng"
              cancelText="Hủy"
            >
              <Button type="link" danger icon={<StopOutlined />}>Tạm ngưng</Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Kích hoạt lại khách hàng này?"
              onConfirm={() => activateMutation.mutate(record.id)}
              okText="Kích hoạt"
              cancelText="Hủy"
            >
              <Button type="link" icon={<CheckCircleOutlined />} style={{ color: '#52c41a' }}>
                Kích hoạt
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Quản lý khách hàng" />
      <Table
        columns={columns}
        dataSource={tenants}
        rowKey="id"
        loading={isLoading}
        size="middle"
      />
    </div>
  );
}
