import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { MonthlySeriesPoint } from '../../types/dashboard';

interface FuelCostTrendChartProps {
  data: MonthlySeriesPoint[];
}

export function FuelCostTrendChart({ data }: FuelCostTrendChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current, 'dark');
    chart.setOption({
      backgroundColor: 'transparent',
      color: ['#38BDF8'],
      tooltip: { trigger: 'axis', formatter: '{b}: ₹{c}k' },
      xAxis: {
        type: 'category',
        data: data.map(item => item.month),
        axisLine: { lineStyle: { color: '#6B7280' } },
        axisLabel: { color: '#9AA0AC' },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#272B33' } },
        axisLabel: { color: '#9AA0AC', formatter: '₹{value}k' },
      },
      series: [{ type: 'bar', data: data.map(item => item.value), barWidth: '40%', itemStyle: { borderRadius: [6, 6, 0, 0] } }],
      grid: { left: '10%', right: '5%', bottom: '12%', top: '15%' },
    });
    const resize = () => chart.resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} className="h-80 w-full" />;
}
