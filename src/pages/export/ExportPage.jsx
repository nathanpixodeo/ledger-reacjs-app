import { Card, Button, Select, Space, Typography, Row, Col, Table } from 'antd';
import { FileExcelOutlined, FilePdfOutlined } from '@ant-design/icons';
import PageHeader from '../../components/common/PageHeader';
import RevenueBarChart from '../../components/charts/RevenueBarChart';
import MarginLineChart from '../../components/charts/MarginLineChart';
import { useRevenues } from '../../hooks/useRevenue';
import { useExportExcel, useExportPdf } from '../../hooks/useExport';
import { useRevenueStore } from '../../store/revenueStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatPercent } from '../../utils/formatPercent';
import { getMonthLabel, getYearOptions } from '../../utils/dateHelper';

export default function ExportPage() {
  const { selectedYear, setSelectedYear } = useRevenueStore();
  const { data: revenues = [], isLoading } = useRevenues(selectedYear);
  const exportExcel = useExportExcel();
  const exportPdf = useExportPdf();

  const sorted = [...revenues].sort((a, b) => a.month - b.month);

  const columns = [
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
      <PageHeader title="Xuất báo cáo" extra={yearSelector} />

      <Card style={{ marginBottom: 16 }}>
        <Space>
          <Button
            type="primary"
            icon={<FileExcelOutlined />}
            loading={exportExcel.isPending}
            onClick={() => exportExcel.mutate(selectedYear)}
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
          >
            Xuất Excel
          </Button>
          <Button
            type="primary"
            icon={<FilePdfOutlined />}
            loading={exportPdf.isPending}
            onClick={() => exportPdf.mutate(selectedYear)}
            danger
          >
            Xuất PDF
          </Button>
        </Space>
      </Card>

      <Typography.Title level={5}>Xem trước báo cáo năm {selectedYear}</Typography.Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title="Biểu đồ doanh thu vs giá vốn" size="small">
            <RevenueBarChart data={sorted} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Biểu đồ tỷ suất lợi nhuận" size="small">
            <MarginLineChart data={sorted} />
          </Card>
        </Col>
      </Row>

      <Card title="Bảng chi tiết" style={{ marginTop: 16 }}>
        <Table
          columns={columns}
          dataSource={sorted}
          rowKey="id"
          loading={isLoading}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  );
}
