import { loadCultureFiles } from '../common/culture-loader';

import { Chart, DateTime, LineSeries, MultiColoredLineSeries, Legend, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';

import { Button } from '@syncfusion/ej2-buttons';

import { loadChartTheme } from '../chart/theme-color';

Chart.Inject( DateTime, LineSeries, MultiColoredLineSeries, Legend, Tooltip);

import { getAIResponse } from '../common/ai-service';
import { dataPreprocessingSystemPrompt } from './promptResponseData';

interface ChartPoint {
    time: Date;
    visitors: number | null;
    color?: string;
}


(window as any).default = (): void => {
    loadCultureFiles();

    // Original data
    const originalList: ChartPoint[] = [
        { time: new Date(2024, 6, 1, 0, 0, 0), visitors: 150 },
        { time: new Date(2024, 6, 1, 1, 0, 0), visitors: 160 },
        { time: new Date(2024, 6, 1, 2, 0, 0), visitors: 155 },
        { time: new Date(2024, 6, 1, 3, 0, 0), visitors: null },
        { time: new Date(2024, 6, 1, 4, 0, 0), visitors: 170 },
        { time: new Date(2024, 6, 1, 5, 0, 0), visitors: 175 },
        { time: new Date(2024, 6, 1, 6, 0, 0), visitors: 145 },
        { time: new Date(2024, 6, 1, 7, 0, 0), visitors: 180 },
        { time: new Date(2024, 6, 1, 8, 0, 0), visitors: null },
        { time: new Date(2024, 6, 1, 9, 0, 0), visitors: 185 },
        { time: new Date(2024, 6, 1, 10, 0, 0), visitors: 200 },
        { time: new Date(2024, 6, 1, 11, 0, 0), visitors: null },
        { time: new Date(2024, 6, 1, 12, 0, 0), visitors: 220 },
        { time: new Date(2024, 6, 1, 13, 0, 0), visitors: 230 },
        { time: new Date(2024, 6, 1, 14, 0, 0), visitors: null },
        { time: new Date(2024, 6, 1, 15, 0, 0), visitors: 250 },
        { time: new Date(2024, 6, 1, 16, 0, 0), visitors: 260 },
        { time: new Date(2024, 6, 1, 17, 0, 0), visitors: 270 },
        { time: new Date(2024, 6, 1, 18, 0, 0), visitors: null },
        { time: new Date(2024, 6, 1, 19, 0, 0), visitors: 280 },
        { time: new Date(2024, 6, 1, 20, 0, 0), visitors: 250 },
        { time: new Date(2024, 6, 1, 21, 0, 0), visitors: 290 },
        { time: new Date(2024, 6, 1, 22, 0, 0), visitors: 300 },
        { time: new Date(2024, 6, 1, 23, 0, 0), visitors: null }
    ];

    // Create Chart
    const chart: Chart = new Chart({

        title: 'E-Commerce Website Traffic Data',

        subTitle:
            'AI-powered data cleaning and preprocessing for tracking hourly website visitors',

        chartArea: {
            border: {
                width: 0
            }
        },

        primaryXAxis: {
            valueType: 'DateTime',
            minimum: new Date(2024, 6, 1, 0, 0, 0),
            maximum: new Date(2024, 6, 1, 23, 0, 0),
            labelFormat: 'h a',
            edgeLabelPlacement: 'Shift',
            majorGridLines: {
                width: 0
            }
        },

        primaryYAxis: {
            minimum: 140,
            maximum: 320,
            interval: 30
        },

        legendSettings: {
            visible: true,
            position: 'Top'
        },

        tooltip: {
            enable: true
        },

        height: '520',

        series: [{
            dataSource: originalList,
            xName: 'time',
            yName: 'visitors',
            name: 'Visitors',
            type: 'MultiColoredLine',
            pointColorMapping: 'color'
        }],
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });

    chart.appendTo('#chart-container');

    // Button
    const button: Button = new Button({
        isPrimary: true,
        iconCss: 'e-icons e-ai-chat'
    });

    button.appendTo('#chart-action-button');

    function generatePrompt(data: ChartPoint[]): string {

        function pad(value: number): string {
            // ES5-safe replacement for String.prototype.padStart(2, '0')
            return (value < 10 ? '0' : '') + value;
        }

        function formatDate(d: Date): string {

            return d.getFullYear() + '-' +
                pad(d.getMonth() + 1) + '-' +
                pad(d.getDate()) + '-' +
                pad(d.getHours()) + '-' +
                pad(d.getMinutes()) + '-' +
                pad(d.getSeconds());

        }

        let text =
            'Clean the following e-commerce website traffic data, resolve outliers and fill missing values:\n';

        text += data.map(function (item: ChartPoint): string {

            return formatDate(item.time) +
                ': ' +
                (item.visitors == null
                    ? 'null'
                    : item.visitors);

        }).join('\n');

        text +=
            '\nand the output cleaned data should be in the yyyy-MM-dd-HH-m-ss:Value format, no other explanation required';

        return text;
    }

    function getChartStateSnapshot(): object {

        return {
            primaryXAxis: {
                valueType: 'DateTime',
                minimum: '2024-07-01T00:00:00',
                maximum: '2024-07-01T23:00:00',
                labelFormat: 'h a',
                edgeLabelPlacement: 'Shift',
                majorGridLines: {
                    width: 0
                }
            },
            primaryYAxis: {
                minimum: 140,
                maximum: 320,
                interval: 30
            },
            legendSettings: {
                visible: true,
                position: 'Top'
            },
            chartArea: {
                border: {
                    width: 0
                }
            },
            title: 'E-Commerce Website Traffic Data',
            subTitle: 'AI-powered data cleaning and preprocessing for tracking hourly website visitors',
            series: [{
                type: 'MultiColoredLine',
                xName: 'time',
                yName: 'visitors',
                pointColorMapping: 'color'
            }]
        };
    }

    function showSpinnerById(id: string): void {

        const element =
            document.getElementById(id);

        if (element) {
            element.classList.add('visible');
        }
    }

    function hideSpinnerById(id: string): void {

        const element =
            document.getElementById(id);

        if (element) {
            element.classList.remove('visible');
        }
    }

    function parseCleanedPoints(text: string, originals: ChartPoint[]): ChartPoint[] {

        const lines: string[] =
            text.split('\n')
                .filter((line: string) => line.trim().length);

        const out: ChartPoint[] = [];

        for (const line of lines) {

            const parts: string[] =
                line.split(':').map((p: string) => p.trim());

            if (parts.length < 2) {
                continue;
            }

            const stamp: number[] =
                parts[0].split('-').map((n: string) => parseInt(n, 10));

            if (
                stamp.length < 6 ||
                stamp.slice(0, 6).some((n: number) => isNaN(n))
            ) {
                continue;
            }

            const value: number =
                parseFloat(parts[parts.length - 1]);

            if (isNaN(value)) {
                continue;
            }

            const date: Date =
                new Date(stamp[0], stamp[1] - 1, stamp[2], stamp[3], stamp[4], stamp[5]);

            const original: ChartPoint | undefined =
                originals.find(
                    (p: ChartPoint) =>
                        new Date(p.time).getTime() === date.getTime()
                );

            // Highlight previously-missing points through pointColorMapping
            out.push({
                time: date,
                visitors: value,
                color: (original && original.visitors == null) ? '#F28C00' : '#1A73E8'
            });
        }

        return out;
    }

    document.getElementById('chart-action-button')?.addEventListener('click', processChartData);


    async function processChartData(): Promise<void> {

        showSpinnerById('chartSpinner');

        try {

            const prompt: string =
                generatePrompt(originalList);

            const reply: any = await getAIResponse({
                prompt: prompt,
                systemPrompt:
                    dataPreprocessingSystemPrompt +
                    ' Current chart state: ' + JSON.stringify(getChartStateSnapshot())
            }, new AbortController());

            const raw: string | undefined =
                (reply && (reply.response || reply)) as any;

            if (raw) {

                const cleanedText: string =
                    raw.indexOf('```') >= 0
                        ? raw.split('```')[1].trim()
                        : raw.trim();

                const cleanedPoints: ChartPoint[] =
                    parseCleanedPoints(cleanedText, originalList);

                if (cleanedPoints.length) {
                    (chart.series[0] as any).dataSource = cleanedPoints;
                    chart.refresh();
                }
            }

        } catch (e) {

            console.error(
                'processChartData error:',
                e
            );

        } finally {

            hideSpinnerById(
                'chartSpinner'
            );
        }
    }
};