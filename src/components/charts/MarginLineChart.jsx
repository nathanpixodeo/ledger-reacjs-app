import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getMonthLabel } from '../../utils/dateHelper';

export default function MarginLineChart({ data = [] }) {
  const chartData = data.map((item) => ({
    month: getMonthLabel(item.month),
    'Tỷ suất LN': item.margin_percent,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
        <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
        <ReferenceLine y={40} stroke="#faad14" strokeDasharray="5 5" label="Mục tiêu 40%" />
        <Line
          type="monotone"
          dataKey="Tỷ suất LN"
          stroke="#52c41a"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
