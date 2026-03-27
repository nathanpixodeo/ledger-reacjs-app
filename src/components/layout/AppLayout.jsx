import { Layout, Dropdown, Avatar, Space, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { tenantMenuItems } from '../../constants/menuConfig';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { useLogout } from '../../hooks/useAuth';

const { Header, Sider, Content } = Layout;

export default function AppLayout() {
  const user = useAuthStore((s) => s.user);
  const { sidebarCollapsed, toggleSidebar } = useUiStore();
  const logoutMutation = useLogout();

  const userMenuItems = [
    {
      key: 'user-info',
      label: user?.name || 'User',
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
    },
  ];

  const handleUserMenu = ({ key }) => {
    if (key === 'logout') {
      logoutMutation.mutate();
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={sidebarCollapsed}
        onCollapse={toggleSidebar}
        breakpoint="lg"
        collapsedWidth={80}
      >
        <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
          <Typography.Text strong style={{ color: '#fff', fontSize: sidebarCollapsed ? 14 : 18 }}>
            {sidebarCollapsed ? 'KT' : 'KeToan SaaS'}
          </Typography.Text>
        </div>
        <Sidebar menuItems={tenantMenuItems} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <span
            onClick={toggleSidebar}
            style={{ fontSize: 18, cursor: 'pointer' }}
          >
            {sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
          <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenu }} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span>{user?.name}</span>
            </Space>
          </Dropdown>
        </Header>
        <Content style={{ margin: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
