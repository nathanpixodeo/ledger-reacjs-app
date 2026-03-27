import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMonthLabel } from '../../utils/dateHelper';
import { formatNumber } from '../../utils/formatCurrency';

export default function RevenueBarChart({ data = [] }) {
  const chartData = data.map((item) => ({
    month: getMonthLabel(item.month),
    'Doanh thu': item.revenue,
    'Giá vốn': item.cogs,
  }));

  const formatYAxis = (value) => {
    if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
    return formatNumber(value);
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip
          formatter={(value) => formatNumber(value) + ' VND'}
        />
        <Legend />
        <Bar dataKey="Doanh thu" fill="#1677ff" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Giá vốn" fill="#ff4d4f" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
