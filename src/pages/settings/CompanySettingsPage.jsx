import { useEffect } from 'react';
import { Form, Input, Button, Card, Upload, Avatar, message, Space } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageHeader from '../../components/common/PageHeader';
import { settingsApi } from '../../api/settings';

export default function CompanySettingsPage() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsApi.getSettings(),
    select: (data) => data.data,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => settingsApi.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      message.success('Cập nhật thông tin thành công');
    },
    onError: () => {
      message.error('Cập nhật thất bại');
    },
  });

  const logoMutation = useMutation({
    mutationFn: (file) => settingsApi.uploadLogo(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      message.success('Cập nhật logo thành công');
    },
  });

  useEffect(() => {
    if (settings) {
      form.setFieldsValue(settings);
    }
  }, [settings, form]);

  const onFinish = (values) => {
    updateMutation.mutate(values);
  };

  const handleLogoUpload = (info) => {
    logoMutation.mutate(info.file);
    return false;
  };

  return (
    <div>
      <PageHeader title="Cài đặt công ty" />

      <Card loading={isLoading}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar size={100} src={settings?.logo} style={{ backgroundColor: '#1677ff', fontSize: 36 }}>
              {settings?.name?.[0] || 'C'}
            </Avatar>
            <br />
            <Upload
              beforeUpload={handleLogoUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />} style={{ marginTop: 8 }}>
                Đổi logo
              </Button>
            </Upload>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Tên công ty"
              rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="address" label="Địa chỉ">
              <Input.TextArea rows={2} />
            </Form.Item>

            <Form.Item name="tax_id" label="Mã số thuế">
              <Input />
            </Form.Item>

            <Form.Item name="phone" label="Số điện thoại">
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={updateMutation.isPending}
              >
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
}
