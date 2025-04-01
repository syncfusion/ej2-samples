import { loadCultureFiles } from '../common/culture-loader';
import { Chart, SplineSeries, DateTime, Legend, Tooltip, ILoadedEventArgs, Highlight, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

Chart.Inject(SplineSeries, DateTime, Legend, Tooltip, Highlight);
const chartData: Object[] = [
    { x: new Date(2010, 0, 1), y: 5.00, y1: 4.54, y2: 3.62, y3: 2.92, y4: 1.87 },
    { x: new Date(2011, 0, 1), y: 5.69, y1: 4.50, y2: 3.23, y3: 3.00, y4: 1.87 },
    { x: new Date(2012, 0, 1), y: 4.99, y1: 4.60, y2: 4.19, y3: 2.97, y4: 1.85 },
    { x: new Date(2013, 0, 1), y: 5.65, y1: 5.04, y2: 2.99, y3: 2.97, y4: 1.84 },
    { x: new Date(2014, 0, 1), y: 5.43, y1: 4.39, y2: 3.07, y3: 2.00, y4: 1.84 },
    { x: new Date(2015, 0, 1), y: 5.51, y1: 3.86, y2: 3.19, y3: 1.88, y4: 1.65 },
    { x: new Date(2016, 0, 1), y: 6.12, y1: 4.12, y2: 3.28, y3: 1.81, y4: 1.69 },
    { x: new Date(2017, 0, 1), y: 6.68, y1: 6.35, y2: 4.12, y3: 1.79, y4: 1.38 },
    { x: new Date(2018, 0, 1), y: 5.52, y1: 3.90, y2: 3.39, y3: 1.75, y4: 1.72 },
    { x: new Date(2019, 0, 1), y: 5.59, y1: 4.01, y2: 3.46, y3: 1.75, y4: 1.31 },
    { x: new Date(2020, 0, 1), y: 5.46, y1: 4.64, y2: 3.52, y3: 1.78, y4: 1.75 },
    { x: new Date(2021, 0, 1), y: 6.08, y1: 4.12, y2: 3.58, y3: 1.74, y4: 1.29 },
    { x: new Date(2022, 0, 1), y: 6.23, y1: 3.64, y2: 3.40, y3: 1.73, y4: 1.64 }
];
/**
 * Sample for Line series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        primaryXAxis: {
            valueType: 'DateTime', labelFormat: 'y',
            majorGridLines: { width: 0 },
            edgeLabelPlacement: 'Shift'
        },
    
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Yield (In Tons per Hectare)',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            maximum: 8,
            interval: 2
        },
        chartArea: {
            border: {
                width: 0
            },
            margin: { 
                bottom: 12 
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Spline',
                dataSource: chartData,
                xName: 'x', width: 3,
                yName: 'y1', name: 'United States', animation: { enable: true, duration: 1500 }
            },
            {
                type: 'Spline',
                dataSource: chartData,
                xName: 'x', width: 3,
                yName: 'y2', name: 'China', animation: { enable: true, delay: 2300, duration: 1500 }
            },
            {
                type: 'Spline',
                dataSource: chartData,
                xName: 'x', width: 3,
                yName: 'y3', name: 'Afghanistan', animation: { enable: true, delay: 3400, duration: 1500 }
            },
            {
                type: 'Spline',
                dataSource: chartData,
                xName: 'x', width: 3,
                yName: 'y4', name: 'Yemen', animation: { enable: true, delay: 4800, duration: 1500 }
            },
            {
                type: 'Spline',
                dataSource: chartData,
                xName: 'x', width: 3,
                yName: 'y', name: 'Australia', animation: { enable: true, delay: 6200, duration: 1500 }
            }
        ],
        //Initializing Chart title
        title: 'Almond Yield Comparison Across Countries (2010–2022)',
        legendSettings: { visible: true, enableHighlight: true },
        tooltip: {
            enable: true,
            header: '<b>Almond Yield - ${point.x}</b>',
            format: '${series.name}: <b>${point.y}</b>',
            enableHighlight: true, 
            showNearestTooltip: true
        },
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }

    });
    chart.appendTo('#container');
};