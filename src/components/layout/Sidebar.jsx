import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar({ menuItems }) {
  const location = useLocation();
  const navigate = useNavigate();

  const items = menuItems.map((item) => ({
    key: item.key,
    icon: item.icon ? <item.icon /> : null,
    label: item.label,
  }));

  const handleClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={items}
      onClick={handleClick}
    />
  );
}
