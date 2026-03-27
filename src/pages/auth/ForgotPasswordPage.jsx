import { Form, Input, Button, Card, Typography, Alert, Result } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/auth';

export default function ForgotPasswordPage() {
  const mutation = useMutation({
    mutationFn: ({ email }) => authApi.forgotPassword(email),
  });

  if (mutation.isSuccess) {
    return (
      <div className="login-container">
        <Card className="login-card">
          <Result
            status="success"
            title="Email đã được gửi"
            subTitle="Vui lòng kiểm tra hộp thư để đặt lại mật khẩu."
            extra={<Link to="/login"><Button type="primary">Quay lại đăng nhập</Button></Link>}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-logo">
          <Typography.Title level={3}>Quên mật khẩu</Typography.Title>
          <Typography.Text type="secondary">
            Nhập email để nhận liên kết đặt lại mật khẩu
          </Typography.Text>
        </div>

        {mutation.isError && (
          <Alert message="Gửi email thất bại" type="error" showIcon style={{ marginBottom: 16 }} />
        )}

        <Form layout="vertical" onFinish={(values) => mutation.mutate(values)} size="large">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={mutation.isPending}>
              Gửi email đặt lại mật khẩu
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Link to="/login">Quay lại đăng nhập</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
