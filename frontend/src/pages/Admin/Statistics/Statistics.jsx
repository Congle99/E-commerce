import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Api from '~/components/Api';
import './Statistics.scss';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Statistics = () => {
    const { http } = Api();
    const [timeRange, setTimeRange] = useState('month'); // 'day', 'month', 'year'
    const [stats, setStats] = useState({
        products: [],
        orders: [],
        revenue: [],
        labels: [],
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await http.get(`/stats?timeRange=${timeRange}`);
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [timeRange]);

    const revenueChartData = {
        labels: stats.labels,
        datasets: [
            {
                label: 'Revenue',
                data: stats.revenue,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.1,
            },
        ],
    };

    const ordersChartData = {
        labels: stats.labels,
        datasets: [
            {
                label: 'Orders',
                data: stats.orders,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
        ],
    };

    const productsChartData = {
        labels: stats.labels,
        datasets: [
            {
                label: 'Products',
                data: stats.products,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Statistics Overview',
            },
        },
    };

    return (
        <div className="statistics-container">
            <div className="header">
                <h1>Statistics Dashboard</h1>
                <div className="time-range-selector">
                    <button
                        className={timeRange === 'day' ? 'active' : ''}
                        onClick={() => setTimeRange('day')}
                    >
                        Daily
                    </button>
                    <button
                        className={timeRange === 'month' ? 'active' : ''}
                        onClick={() => setTimeRange('month')}
                    >
                        Monthly
                    </button>
                    <button
                        className={timeRange === 'year' ? 'active' : ''}
                        onClick={() => setTimeRange('year')}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading statistics...</div>
            ) : (
                <div className="charts-grid">
                    <div className="chart-container">
                        <h2>Revenue</h2>
                        <Line data={revenueChartData} options={chartOptions} />
                    </div>
                    <div className="chart-container">
                        <h2>Orders</h2>
                        <Bar data={ordersChartData} options={chartOptions} />
                    </div>
                    <div className="chart-container">
                        <h2>Products</h2>
                        <Bar data={productsChartData} options={chartOptions} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statistics; 