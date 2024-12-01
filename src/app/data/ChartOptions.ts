import {ChartOptions} from "chart.js/auto";

export const HighlightLinePlugin = {
    id: 'highlightLine',
    beforeDraw: (chart) => {
        const { ctx, chartArea, scales } = chart;
        const yValue = chart.options.plugins.highlightLine?.yValue;

        if (yValue !== undefined && yValue !== null) {
            const y = scales.y.getPixelForValue(yValue);

            if (y >= chartArea.top && y <= chartArea.bottom) {
                ctx.save();
                ctx.strokeStyle = chart.options.plugins.highlightLine.color || 'red';
                ctx.lineWidth = chart.options.plugins.highlightLine.lineWidth || 2;
                ctx.beginPath();
                ctx.moveTo(chartArea.left, y);
                ctx.lineTo(chartArea.right, y);
                ctx.stroke();
                ctx.restore();
            }
        }
    },
};

export const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
            labels: {
                color: "white",
                font: {
                    size: 16,
                },
            },
            onClick: null,
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: "Time",
                color: "white",
                font: {
                    size: 16,
                },
            },
            ticks: {
                color: "white",
            },
        },
        y: {
            title: {
                display: true,
                text: "Value",
                color: "white",
                font: {
                    size: 16,
                },
            },
            ticks: {
                color: "white",
            },
        },
    },
};

export const optionsWithHighlight = {
    ...options, // Use your existing options as base
    plugins: {
        ...options.plugins,
        highlightLine: {
            yValue: 0,
            color: "blue",
            lineWidth: 1,
        },
    },
};