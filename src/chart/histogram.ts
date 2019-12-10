import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, HistogramSeries, DataLabel, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(HistogramSeries, DataLabel, Tooltip);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Histogram Series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chartData: Object[] = [];
    let points: number[] = [5.250, 7.750, 0, 8.275, 9.750, 7.750, 8.275, 6.250, 5.750,
        5.250, 23.000, 26.500, 27.750, 25.025, 26.500, 26.500, 28.025, 29.250, 26.750, 27.250,
        26.250, 25.250, 34.500, 25.625, 25.500, 26.625, 36.275, 36.250, 26.875, 40.000, 43.000,
        46.500, 47.750, 45.025, 56.500, 56.500, 58.025, 59.250, 56.750, 57.250,
        46.250, 55.250, 44.500, 45.525, 55.500, 46.625, 46.275, 56.250, 46.875, 43.000,
        46.250, 55.250, 44.500, 45.425, 55.500, 56.625, 46.275, 56.250, 46.875, 43.000,
        46.250, 55.250, 44.500, 45.425, 55.500, 46.625, 56.275, 46.250, 56.875, 41.000, 63.000,
        66.500, 67.750, 65.025, 66.500, 76.500, 78.025, 79.250, 76.750, 77.250,
        66.250, 75.250, 74.500, 65.625, 75.500, 76.625, 76.275, 66.250, 66.875, 80.000, 85.250,
        87.750, 89.000, 88.275, 89.750, 97.750, 98.275, 96.250, 95.750, 95.250
    ];
    points.map((value: number) => {
        chartData.push({
            y: value
        });
    });
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            majorGridLines: { width: 0 }, title: 'Score of Final Examination',
            minimum: 0, maximum: 100
        },
        chartArea: { border: { width: 0 } },
        legendSettings: { visible: false },
        primaryYAxis: {
            title: 'Number of Students',
            minimum: 0, maximum: 50, interval: 10,
            majorTickLines: { width: 0 }, lineStyle: { width: 0 }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Histogram', width: 2, yName: 'y', name: 'Score',
                dataSource: chartData, binInterval: 20,
                marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } },
                showNormalDistribution: true, columnWidth: 0.99
            }
        ],
        //Initializing Chart title
        width: Browser.isDevice ? '100%' : '60%',
        title: 'Examination Result', tooltip: { enable: true },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
            if (selectedTheme === 'highcontrast') {
                args.chart.series[0].marker.dataLabel.font.color = '#000000';
            }
        }
    });
    chart.appendTo('#container');
};