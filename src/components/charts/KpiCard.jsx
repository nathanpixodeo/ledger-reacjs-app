import { Card, Statistic } from 'antd';

export default function KpiCard({ title, value, prefix, suffix, valueStyle, loading }) {
  return (
    <Card className="kpi-card" loading={loading}>
      <Statistic
        title={title}
        value={value}
        prefix={prefix}
        suffix={suffix}
        valueStyle={{ fontSize: 24, fontWeight: 600, ...valueStyle }}
      />
    </Card>
  );
}
