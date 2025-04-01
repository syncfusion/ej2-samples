import { loadCultureFiles } from '../common/culture-loader';
import { Chart, StackingColumnSeries, Category, Legend, Tooltip, DataLabel, ILoadedEventArgs, ILegendClickEventArgs, Highlight } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(StackingColumnSeries, Category, Legend, Tooltip, Highlight, DataLabel);

/**
 * Sample for StackedColumn Series
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            majorGridLines: { width: 0 },
            minorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            interval: 1,
            lineStyle: { width: 0 },
            labelIntersectAction: 'Rotate45',
            valueType: 'Category'
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Production (60KG Bags)',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            majorGridLines: { width: 1 },
            minorGridLines: { width: 1 },
            minorTickLines: { width: 0 },
            labelFormat: '{value}M',
            interval: 20
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
                type: 'StackingColumn',
                dataSource: Browser.isDevice ?
                    [
                        { x: '2021', y: 24.3 },
                        { x: '2022', y: 26.3 },
                        { x: '2023', y: 25.4 },
                        { x: '2024', y: 25 }
                    ] :
                    [
                        { x: '2019', y: 28.5 },
                        { x: '2020', y: 27.5 },
                        { x: '2021', y: 24.3 },
                        { x: '2022', y: 26.3 },
                        { x: '2023', y: 25.4 },
                        { x: '2024', y: 25 }
                    ],
                xName: 'x', marker: { dataLabel: { visible: true, font: { size: Browser.isDevice ? '10px' : '12px' } } }, legendShape: 'Rectangle',
                yName: 'y', name: 'India', columnWidth: 0.4, border: { width: 1, color: "white" }
            },
            {
                type: 'StackingColumn',
                dataSource: Browser.isDevice ?
                    [
                        { x: '2021', y: 26.7 },
                        { x: '2022', y: 30.8 },
                        { x: '2023', y: 27.4 },
                        { x: '2024', y: 31 }
                    ] :
                    [
                        { x: '2019', y: 26.9 },
                        { x: '2020', y: 29.3 },
                        { x: '2021', y: 26.7 },
                        { x: '2022', y: 30.8 },
                        { x: '2023', y: 27.4 },
                        { x: '2024', y: 31 }
                    ],
                xName: 'x', marker: { dataLabel: { visible: true, font: { size: Browser.isDevice ? '10px' : '12px' } } }, legendShape: 'Rectangle',
                yName: 'y', name: 'China', columnWidth: 0.4, border: { width: 1, color: "white" }
            },
            {
                type: 'StackingColumn',
                dataSource: Browser.isDevice ?
                    [
                        { x: '2021', y: 17.5 },
                        { x: '2022', y: 14.5 },
                        { x: '2023', y: 12.1 },
                        { x: '2024', y: 14.4 }
                    ] :
                    [
                        { x: '2019', y: 19.9 },
                        { x: '2020', y: 14.6 },
                        { x: '2021', y: 17.5 },
                        { x: '2022', y: 14.5 },
                        { x: '2023', y: 12.1 },
                        { x: '2024', y: 14.4 }
                    ],
                xName: 'x', marker: { dataLabel: { visible: true, font: { size: Browser.isDevice ? '10px' : '12px' } } }, legendShape: 'Rectangle',
                yName: 'y', name: 'United States', columnWidth: 0.4, border: { width: 1, color: "white" }, cornerRadius: { topLeft: 4, topRight: 4 }
            }
        ],

        //Initializing Chart title
        title: 'Global Cotton Production by Country (2019–2024)',
        subTitle: 'Source: fas.usda.gov',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true,
            enableHighlight: true,
            header: '<b>${point.x}</b>',
            format: '${series.name} : <b>${point.y}</b>'
        },
        width: Browser.isDevice ? '100%' : '75%',
        legendSettings: {
            enableHighlight: true,
            shapeWidth: 9,
            shapeHeight: 9
        },
        stackLabels: {
            visible: true,
            format: '{value}M',
            font: {
                size: Browser.isDevice ? '10px' : '12px'
            }
        },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        legendClick: (args: ILegendClickEventArgs) => {
            if (args.series.index === 0) {
                if (args.chart.series[2].visible) {
                    args.chart.series[2].cornerRadius.topLeft = 4;
                    args.chart.series[2].cornerRadius.topRight = 4;
                    args.chart.series[0].cornerRadius.topLeft = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                } else if (args.chart.series[1].visible) {
                    args.chart.series[1].cornerRadius.topLeft = 4;
                    args.chart.series[1].cornerRadius.topRight = 4;
                    args.chart.series[0].cornerRadius.topLeft = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                } else {
                    args.chart.series[0].cornerRadius.topLeft = 4;
                    args.chart.series[0].cornerRadius.topRight = 4;
                }
            }
            if (args.series.index === 1) {
                if (args.chart.series[2].visible) {
                    args.chart.series[2].cornerRadius.topLeft = 4;
                    args.chart.series[2].cornerRadius.topRight = 4;
                    args.chart.series[1].cornerRadius.topLeft = 0;
                    args.chart.series[1].cornerRadius.topRight = 0;
                } else if (args.series.visible && args.chart.series[0].visible) {
                    args.chart.series[0].cornerRadius.topLeft = 4;
                    args.chart.series[0].cornerRadius.topRight = 4;
                    args.chart.series[1].cornerRadius.topLeft = 0;
                    args.chart.series[1].cornerRadius.topRight = 0;
                } else {
                    args.chart.series[1].cornerRadius.topLeft = 4;
                    args.chart.series[1].cornerRadius.topRight = 4;
                    args.chart.series[0].cornerRadius.topLeft = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                }
            }

            if (args.series.index === 2) {
                if (!args.series.visible) {
                    args.chart.series[2].cornerRadius.topLeft = 4;
                    args.chart.series[2].cornerRadius.topRight = 4;
                    args.chart.series[1].cornerRadius.topLeft = 0;
                    args.chart.series[1].cornerRadius.topRight = 0;
                    args.chart.series[0].cornerRadius.topLeft = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                } else if (args.chart.series[1].visible) {
                    args.chart.series[1].cornerRadius.topLeft = 4;
                    args.chart.series[1].cornerRadius.topRight = 4;
                    args.chart.series[2].cornerRadius.topLeft = 0;
                    args.chart.series[2].cornerRadius.topRight = 0;
                } else if (args.series.visible && args.chart.series[0].visible) {
                    args.chart.series[0].cornerRadius.topLeft = 4;
                    args.chart.series[0].cornerRadius.topRight = 4;
                    args.chart.series[2].cornerRadius.topLeft = 0;
                    args.chart.series[2].cornerRadius.topRight = 0;
                }
            }
        }
    });
    chart.appendTo('#container');
};