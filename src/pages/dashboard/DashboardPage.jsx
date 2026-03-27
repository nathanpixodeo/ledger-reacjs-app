import { Row, Col, Card, Select, Table } from 'antd';
import PageHeader from '../../components/common/PageHeader';
import KpiCard from '../../components/charts/KpiCard';
import RevenueBarChart from '../../components/charts/RevenueBarChart';
import MarginLineChart from '../../components/charts/MarginLineChart';
import { useRevenues } from '../../hooks/useRevenue';
import { useRevenueStore } from '../../store/revenueStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatPercent } from '../../utils/formatPercent';
import { getMonthLabel, getYearOptions } from '../../utils/dateHelper';

export default function DashboardPage() {
  const { selectedYear, setSelectedYear } = useRevenueStore();
  const { data: revenues = [], isLoading } = useRevenues(selectedYear);

  const sorted = [...revenues].sort((a, b) => a.month - b.month);

  const totalRevenue = revenues.reduce((s, r) => s + r.revenue, 0);
  const totalCogs = revenues.reduce((s, r) => s + r.cogs, 0);
  const totalGrossProfit = totalRevenue - totalCogs;
  const avgMargin = revenues.length > 0
    ? revenues.reduce((s, r) => s + r.margin_percent, 0) / revenues.length
    : 0;

  const summaryColumns = [
    { title: 'Tháng', dataIndex: 'month', key: 'month', render: (m) => getMonthLabel(m) },
    { title: 'Doanh thu', dataIndex: 'revenue', key: 'revenue', render: (v) => formatCurrency(v), align: 'right' },
    { title: 'Giá vốn', dataIndex: 'cogs', key: 'cogs', render: (v) => formatCurrency(v), align: 'right' },
    { title: 'Lợi nhuận gộp', dataIndex: 'gross_profit', key: 'gross_profit', render: (v) => formatCurrency(v), align: 'right' },
    { title: 'Tỷ suất LN', dataIndex: 'margin_percent', key: 'margin_percent', render: (v) => formatPercent(v), align: 'right' },
  ];

  const yearSelector = (
    <Select
      value={selectedYear}
      onChange={setSelectedYear}
      style={{ width: 120 }}
      options={getYearOptions().map((y) => ({ value: y, label: `Năm ${y}` }))}
    />
  );

  return (
    <div>
      <PageHeader title="Bảng điều khiển" extra={yearSelector} />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Tổng doanh thu" value={formatCurrency(totalRevenue)} loading={isLoading} valueStyle={{ color: '#1677ff' }} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Tổng giá vốn" value={formatCurrency(totalCogs)} loading={isLoading} valueStyle={{ color: '#ff4d4f' }} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Lợi nhuận gộp" value={formatCurrency(totalGrossProfit)} loading={isLoading} valueStyle={{ color: '#52c41a' }} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Tỷ suất bình quân" value={formatPercent(avgMargin)} loading={isLoading} valueStyle={{ color: avgMargin >= 40 ? '#52c41a' : '#faad14' }} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="Doanh thu vs Giá vốn" className="dashboard-chart-card">
            <RevenueBarChart data={sorted} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Tỷ suất lợi nhuận (%)" className="dashboard-chart-card">
            <MarginLineChart data={sorted} />
          </Card>
        </Col>
      </Row>

      <Card title="Bảng tổng hợp" style={{ marginTop: 16 }}>
        <Table
          columns={summaryColumns}
          dataSource={sorted}
          rowKey="id"
          loading={isLoading}
          pagination={false}
          size="middle"
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}><strong>Tổng cộng</strong></Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right"><strong>{formatCurrency(totalRevenue)}</strong></Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="right"><strong>{formatCurrency(totalCogs)}</strong></Table.Summary.Cell>
                <Table.Summary.Cell index={3} align="right"><strong>{formatCurrency(totalGrossProfit)}</strong></Table.Summary.Cell>
                <Table.Summary.Cell index={4} align="right"><strong>{formatPercent(avgMargin)}</strong></Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </div>
  );
}
