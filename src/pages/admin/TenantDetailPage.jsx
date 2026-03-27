import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Tag, Button, Space, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import PageHeader from '../../components/common/PageHeader';
import { useTenant } from '../../hooks/useTenant';

export default function TenantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: tenant, isLoading } = useTenant(id);

  if (isLoading) {
    return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
  }

  const planLabels = { free: 'Miễn phí', pro: 'Chuyên nghiệp', enterprise: 'Doanh nghiệp' };

  return (
    <div>
      <PageHeader
        title="Chi tiết khách hàng"
        extra={
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/tenants')}>
            Quay lại
          </Button>
        }
      />

      <Card>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Tên công ty">{tenant?.name}</Descriptions.Item>
          <Descriptions.Item label="Slug">{tenant?.slug}</Descriptions.Item>
          <Descriptions.Item label="Gói dịch vụ">
            <Tag color="blue">{planLabels[tenant?.plan] || tenant?.plan}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={tenant?.status === 'active' ? 'green' : 'red'}>
              {tenant?.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Số người dùng">{tenant?.users_count}</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {tenant?.created_at ? new Date(tenant.created_at).toLocaleDateString('vi-VN') : '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
