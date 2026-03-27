import { useState } from 'react';
import { Upload, Button, Table, Card, Alert, Space, message, Tag } from 'antd';
import { UploadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import * as XLSX from 'xlsx';
import PageHeader from '../../components/common/PageHeader';
import { importApi } from '../../api/import';

export default function ImportPage() {
  const [parsedData, setParsedData] = useState([]);
  const [fileName, setFileName] = useState('');

  const importMutation = useMutation({
    mutationFn: (data) => importApi.importExcel(data),
    onSuccess: (data) => {
      message.success(`Đã nhập ${data.data.imported} bản ghi thành công`);
      setParsedData([]);
      setFileName('');
    },
    onError: () => {
      message.error('Nhập dữ liệu thất bại');
    },
  });

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      const records = json.map((row, index) => ({
        key: index,
        year: row.year || row.nam || row.Year,
        month: row.month || row.thang || row.Month,
        revenue: row.revenue || row.doanh_thu || row.Revenue || 0,
        cogs: row.cogs || row.gia_von || row.COGS || 0,
        valid: !!(row.year || row.nam || row.Year) && !!(row.month || row.thang || row.Month),
      }));

      setParsedData(records);
      setFileName(file.name);
    };
    reader.readAsArrayBuffer(file);
    return false; // prevent auto upload
  };

  const columns = [
    { title: 'Năm', dataIndex: 'year', key: 'year' },
    { title: 'Tháng', dataIndex: 'month', key: 'month' },
    { title: 'Doanh thu', dataIndex: 'revenue', key: 'revenue', render: (v) => v?.toLocaleString('vi-VN'), align: 'right' },
    { title: 'Giá vốn', dataIndex: 'cogs', key: 'cogs', render: (v) => v?.toLocaleString('vi-VN'), align: 'right' },
    {
      title: 'Trạng thái',
      dataIndex: 'valid',
      key: 'valid',
      render: (v) => v ? <Tag color="green">Hợp lệ</Tag> : <Tag color="red">Lỗi</Tag>,
    },
  ];

  const validCount = parsedData.filter((r) => r.valid).length;

  return (
    <div>
      <PageHeader title="Nhập dữ liệu từ Excel" />

      <Card style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Upload.Dragger
            accept=".xlsx,.xls,.csv"
            beforeUpload={handleFile}
            showUploadList={false}
            maxCount={1}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined style={{ fontSize: 48, color: '#1677ff' }} />
            </p>
            <p className="ant-upload-text">Kéo thả file Excel vào đây hoặc nhấn để chọn file</p>
            <p className="ant-upload-hint">Hỗ trợ: .xlsx, .xls, .csv</p>
          </Upload.Dragger>

          {fileName && (
            <Alert message={`File đã chọn: ${fileName}`} type="info" showIcon />
          )}
        </Space>
      </Card>

      {parsedData.length > 0 && (
        <Card
          title={`Xem trước dữ liệu (${validCount}/${parsedData.length} hợp lệ)`}
          extra={
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => importMutation.mutate(parsedData.filter((r) => r.valid))}
              loading={importMutation.isPending}
              disabled={validCount === 0}
            >
              Xác nhận nhập {validCount} bản ghi
            </Button>
          }
        >
          <Table
            columns={columns}
            dataSource={parsedData}
            pagination={false}
            size="small"
            scroll={{ y: 400 }}
          />
        </Card>
      )}
    </div>
  );
}
