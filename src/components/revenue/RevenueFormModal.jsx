import { Modal, Form, InputNumber, DatePicker, Typography, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatPercent } from '../../utils/formatPercent';
import dayjs from 'dayjs';

export default function RevenueFormModal({ open, onCancel, onSubmit, initialValues, loading }) {
  const [form] = Form.useForm();
  const [grossProfit, setGrossProfit] = useState(0);
  const [marginPercent, setMarginPercent] = useState(0);

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        month: initialValues.month ? dayjs().month(initialValues.month - 1).year(initialValues.year) : null,
      });
      calculateDerived(initialValues.revenue, initialValues.cogs);
    } else if (open) {
      form.resetFields();
      setGrossProfit(0);
      setMarginPercent(0);
    }
  }, [open, initialValues, form]);

  const calculateDerived = (revenue, cogs) => {
    const r = revenue || 0;
    const c = cogs || 0;
    const gp = r - c;
    const mp = r > 0 ? (gp / r) * 100 : 0;
    setGrossProfit(gp);
    setMarginPercent(mp);
  };

  const onValuesChange = (_, allValues) => {
    calculateDerived(allValues.revenue, allValues.cogs);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const monthDate = values.month;
    onSubmit({
      year: monthDate.year(),
      month: monthDate.month() + 1,
      revenue: values.revenue,
      cogs: values.cogs,
    });
  };

  return (
    <Modal
      title={initialValues ? 'Sửa doanh thu' : 'Thêm doanh thu'}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      okText={initialValues ? 'Cập nhật' : 'Thêm mới'}
      cancelText="Hủy"
      destroyOnClose
    >
      <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
        <Form.Item
          name="month"
          label="Tháng"
          rules={[{ required: true, message: 'Vui lòng chọn tháng' }]}
        >
          <DatePicker picker="month" style={{ width: '100%' }} format="MM/YYYY" />
        </Form.Item>

        <Form.Item
          name="revenue"
          label="Doanh thu"
          rules={[{ required: true, message: 'Vui lòng nhập doanh thu' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={1000000}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            parser={(value) => value.replace(/\./g, '')}
            addonAfter="VND"
          />
        </Form.Item>

        <Form.Item
          name="cogs"
          label="Giá vốn"
          rules={[{ required: true, message: 'Vui lòng nhập giá vốn' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={1000000}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            parser={(value) => value.replace(/\./g, '')}
            addonAfter="VND"
          />
        </Form.Item>

        <Divider />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Typography.Text type="secondary">Lợi nhuận gộp:</Typography.Text>
            <br />
            <Typography.Text strong style={{ fontSize: 16, color: grossProfit >= 0 ? '#52c41a' : '#ff4d4f' }}>
              {formatCurrency(grossProfit)}
            </Typography.Text>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Typography.Text type="secondary">Tỷ suất lợi nhuận:</Typography.Text>
            <br />
            <Typography.Text strong style={{ fontSize: 16, color: marginPercent >= 40 ? '#52c41a' : '#faad14' }}>
              {formatPercent(marginPercent)}
            </Typography.Text>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
