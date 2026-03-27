import {
  DashboardOutlined,
  DollarOutlined,
  ExportOutlined,
  ImportOutlined,
  SettingOutlined,
  AuditOutlined,
  TeamOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

export const tenantMenuItems = [
  {
    key: '/',
    icon: DashboardOutlined,
    label: 'Bảng điều khiển',
  },
  {
    key: '/revenue',
    icon: DollarOutlined,
    label: 'Doanh thu',
  },
  {
    key: '/export',
    icon: ExportOutlined,
    label: 'Xuất báo cáo',
  },
  {
    key: '/import',
    icon: ImportOutlined,
    label: 'Nhập dữ liệu',
  },
  {
    key: '/settings',
    icon: SettingOutlined,
    label: 'Cài đặt',
  },
];

export const adminMenuItems = [
  {
    key: '/',
    icon: DashboardOutlined,
    label: 'Tổng quan',
  },
  {
    key: '/tenants',
    icon: TeamOutlined,
    label: 'Quản lý khách hàng',
  },
  {
    key: '/audit',
    icon: AuditOutlined,
    label: 'Nhật ký hoạt động',
  },
];
