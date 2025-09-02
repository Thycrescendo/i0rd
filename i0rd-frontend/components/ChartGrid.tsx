// components/ChartGrid.tsx
import React, { useState, useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts'; // Correct import
import axios from 'axios';
import { Coin } from '../types';

const ChartGrid: React.FC = () => {
  const [gridConfig, setGridConfig] = useState({ rows: 2, cols: 2 });
  const [charts, setCharts] = useState<string[]>(['bitcoin', 'ethereum', 'cardano']);
  const chartRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chartInstances = useRef<(IChartApi & { series?: ISeriesApi<'Line'> })[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Coin[]>('/api/coins');
        setCoins(response.data);
      } catch (err) {
        console.error('Error fetching coins for charts:', err);
        setError('Failed to load chart data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
    const interval = setInterval(fetchCoins, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    charts.forEach((coinId, index) => {
      const container = chartRefs.current[index];
      const coin = coins.find((c) => c.id === coinId);
      if (container && coin?.priceHistory && !chartInstances.current[index]) {
        try {
          const chart = createChart(container, {
            width: container.clientWidth,
            height: 300,
            layout: { background: { color: '#1F2937' }, textColor: '#FFFFFF' },
            timeScale: { timeVisible: true, secondsVisible: false },
            // attributionLogo: true, // Not required in lightweight-charts
          });
          if (!chart.addLineSeries) {
            console.error('addLineSeries is not available on chart object');
            setError('Chart initialization failed: addLineSeries unavailable');
            return;
          }
          const series = chart.addLineSeries({ color: '#3B82F6' });
          series.setData(
            coin.priceHistory.map((point) => ({
              time: point.time,
              value: point.price,
            }))
          );
          chartInstances.current[index] = { ...chart, series };
        } catch (err) {
          console.error(`Error initializing chart for ${coinId}:`, err);
          setError(`Failed to initialize chart for ${coinId}`);
        }
      } else if (chartInstances.current[index]?.series && coin?.priceHistory) {
        chartInstances.current[index].series!.setData(
          coin.priceHistory.map((point) => ({
            time: point.time,
            value: point.price,
          }))
        );
      }
    });

    const handleResize = () => {
      chartInstances.current.forEach((chart, index) => {
        const container = chartRefs.current[index];
        if (chart && container) {
          chart.resize(container.clientWidth, 300);
        }
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstances.current.forEach((chart) => chart?.remove());
      chartInstances.current = [];
    };
  }, [charts, coins, gridConfig]);

  const addChart = () => {
    const availableCoins = coins.filter((coin) => !charts.includes(coin.id));
    if (availableCoins.length > 0) {
      setCharts([...charts, availableCoins[0].id]);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Rows:</label>
          <input
            type="number"
            value={gridConfig.rows}
            onChange={(e) => setGridConfig({ ...gridConfig, rows: parseInt(e.target.value) || 1 })}
            className="bg-gray-700 text-white p-2 rounded w-16"
          />
          <label className="ml-4 mr-2">Cols:</label>
          <input
            type="number"
            value={gridConfig.cols}
            onChange={(e) => setGridConfig({ ...gridConfig, cols: parseInt(e.target.value) || 1 })}
            className="bg-gray-700 text-white p-2 rounded w-16"
          />
        </div>
        <button
          onClick={addChart}
          disabled={coins.length <= charts.length}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded"
        >
          Add Chart
        </button>
      </div>
      {loading && <p className="text-gray-400 animate-pulse">Loading charts...</p>}
      {!loading && (
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${gridConfig.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridConfig.rows}, 300px)`,
          }}
        >
          {charts.map((coinId, index) => (
            <div key={coinId} className="bg-gray-800 p-4 rounded shadow-md">
              <h3 className="text-lg font-bold mb-2">
                {coins.find((c) => c.id === coinId)?.name || coinId} Chart
              </h3>
              <div
                ref={(el) => (chartRefs.current[index] = el)}
                className="h-[280px] w-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartGrid;