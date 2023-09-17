import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {

    const dataset = {
        labels: ['Neutral', 'Positive', 'Negative'],
        datasets: [
            {
                data: data,
                backgroundColor: ['#FFCE56', '#2ECC71', '#FF6384'],
                hoverBackgroundColor: ['#FFCE56', '#2ECC71', '#FF6384'],
            },
        ],
    };

    return (
        // <Box className="pie-chart" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ width: '60%' }}>
            <h2>Sentiment Analysis</h2>
            <p style={{ textAlign: "center", fontSize: '.8rem' }}>Total Comments Fetched:{data[0] + data[1] + data[2]}</p>
            <Doughnut data={dataset} options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {

                        position: 'bottom'

                    }
                }
            }} />
        </Box>
    );
};

export default PieChart;
