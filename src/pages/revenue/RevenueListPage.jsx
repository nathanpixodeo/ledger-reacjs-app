import { useState } from 'react';
import { Table, Button, Select, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PageHeader from '../../components/common/PageHeader';
import RevenueFormModal from '../../components/revenue/RevenueFormModal';
import { useRevenues, useCreateRevenue, useUpdateRevenue, useDeleteRevenue } from '../../hooks/useRevenue';
import { useRevenueStore } from '../../store/revenueStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatPercent } from '../../utils/formatPercent';
import { getMonthLabel, getYearOptions } from '../../utils/dateHelper';

export default function RevenueListPage() {
  const { selectedYear, setSelectedYear } = useRevenueStore();
  const { data: revenues = [], isLoading } = useRevenues(selectedYear);
  const createMutation = useCreateRevenue();
  const updateMutation = useUpdateRevenue();
  const deleteMutation = useDeleteRevenue();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const sorted = [...revenues].sort((a, b) => a.month - b.month);

  const handleAdd = () => {
    setEditingRecord(null);
    setModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (editingRecord) {
      updateMutation.mutate(
        { id: editingRecord.id, data: values },
        { onSuccess: () => setModalOpen(false) }
      );
    } else {
      createMutation.mutate(values, { onSuccess: () => setModalOpen(false) });
    }
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const columns = [
    {
      title: 'Tháng',
      dataIndex: 'month',
      key: 'month',
      render: (m) => getMonthLabel(m),
      width: 100,
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (v) => formatCurrency(v),
      align: 'right',
    },
    {
      title: 'Giá vốn',
      dataIndex: 'cogs',
      key: 'cogs',
      render: (v) => formatCurrency(v),
      align: 'right',
    },
    {
      title: 'Lợi nhuận gộp',
      dataIndex: 'gross_profit',
      key: 'gross_profit',
      render: (v) => (
        <span style={{ color: v >= 0 ? '#52c41a' : '#ff4d4f' }}>
          {formatCurrency(v)}
        </span>
      ),
      align: 'right',
    },
    {
      title: 'Tỷ suất LN',
      dataIndex: 'margin_percent',
      key: 'margin_percent',
      render: (v) => (
        <Tag color={v >= 40 ? 'green' : v >= 30 ? 'gold' : 'red'}>
          {formatPercent(v)}
        </Tag>
      ),
      align: 'center',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Xóa doanh thu này?"
            description="Hành động này không thể hoàn tác."
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const extra = (
    <Space>
      <Select
        value={selectedYear}
        onChange={setSelectedYear}
        style={{ width: 120 }}
        options={getYearOptions().map((y) => ({ value: y, label: `Năm ${y}` }))}
      />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Thêm mới
      </Button>
    </Space>
  );

  return (
    <div>
      <PageHeader title="Quản lý doanh thu" extra={extra} />

      <Table
        columns={columns}
        dataSource={sorted}
        rowKey="id"
        loading={isLoading}
        pagination={false}
        size="middle"
      />

      <RevenueFormModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingRecord}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
