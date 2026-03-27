import { Form, Input, Button, Card, Typography, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useAuth';

export default function LoginPage() {
  const loginMutation = useLogin();

  const onFinish = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-logo">
          <Typography.Title level={2} style={{ color: '#1677ff', marginBottom: 4 }}>
            KeToan SaaS
          </Typography.Title>
          <Typography.Text type="secondary">
            Phần mềm kế toán doanh thu & lợi nhuận
          </Typography.Text>
        </div>

        {loginMutation.isError && (
          <Alert
            message={loginMutation.error?.response?.data?.message || 'Đăng nhập thất bại'}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form layout="vertical" onFinish={onFinish} autoComplete="off" size="large">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loginMutation.isPending}
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Demo: admin@demo.com / password
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
}
