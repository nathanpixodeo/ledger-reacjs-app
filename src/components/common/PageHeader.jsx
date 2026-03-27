import { Typography } from 'antd';

export default function PageHeader({ title, extra }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        {title}
      </Typography.Title>
      {extra && <div>{extra}</div>}
    </div>
  );
}
