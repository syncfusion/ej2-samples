import { loadCultureFiles } from '../common/culture-loader';
import { Chart, ColumnSeries, Category, Tooltip, ILoadedEventArgs, Legend, IAxisLabelRenderEventArgs, ISharedTooltipRenderEventArgs, IResizeEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, Category, Tooltip, Legend);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Column Series with Side by side placement
 */
let totalData: Object[] = [
    { country: 'India', population: 1450935791 },
    { country: 'China', population: 1419321278 },
    { country: 'USA', population: 345426571 },
    { country: 'Indonesia', population: 283487931 },
    { country: 'Pakistan', population: 251269164 }
];

let maleData: Object[] = [
    { country: 'India', male: 748323427 },
    { country: 'China', male: 723023723 },
    { country: 'USA', male: 173551527 },
    { country: 'Indonesia', male: 142407931 },
    { country: 'Pakistan', male: 127433405 }
];

let femaleData: Object[] = [
    { country: 'India', female: 702612364 },
    { country: 'China', female: 696297555 },
    { country: 'USA', female: 171875044 },
    { country: 'Indonesia', female: 141080014 },
    { country: 'Pakistan', female: 123835758 }
];

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category',
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            interval: 1,
            majorGridLines: { width: 0 },
            labelRotation: Browser.isDevice ? -45 : 0
        },
        chartArea: { border: { width: 0 }, margin: { bottom: 12 } },
        primaryYAxis:
        {
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            title: 'Inhabitants (Millions)',
            interval: 300000000
        },
        enableSideBySidePlacement: false,
        // Initialize the chart series
        series: [
            {
                type: 'Column', xName: 'country', yName: 'population', name: 'Total',
                dataSource: totalData, columnWidth: 0.5, cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle'
            },
            {
                type: 'Column', xName: 'country', yName: 'male', name: 'Male',
                dataSource: maleData, columnWidth: 0.3, cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle'
            }, {
                type: 'Column', xName: 'country', yName: 'female', name: 'Female',
                dataSource: femaleData, columnWidth: 0.2, cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle'
            }
        ],
        // Initialize the chart title
        title: 'Population Distribution of the Top 5 Most Populous Countries (2024)',
        subTitle: 'Source: statisticstimes.com',
        tooltip: { enable: true, shared: true },
        legendSettings: { visible: true, shapeWidth: 9, shapeHeight: 9, maximumColumns: 1, position: 'Custom', location: { x: 750, y: 80 } },
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = loadChartTheme(args);
            if (selectedTheme.indexOf('Dark') !== -1 || selectedTheme.indexOf('HighContrast') !== -1) {
                args.chart.legendSettings.border = { width: 2, color: '#FFFFFF' };
            } else {
                args.chart.legendSettings.border = { width: 2, color: '#000000' };
            }
        },
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            const value: number = parseInt(args.text.replace(/,/g, ''), 10);
            if (value >= 1_000_000) {
                args.text = (value / 1_000_000).toFixed(0) + 'M';
            }
        },
        sharedTooltipRender: (args: ISharedTooltipRenderEventArgs) => {
            if (args.text && args.point && args.series) {
                for (let i: number = 0; i < args.point.length; i++) {
                    if (args.point[i] && args.point[i].y !== undefined) {
                        let formattedValue: string = (args.point[i].y as number).toLocaleString('en-US');
                        let seriesName: string = args.series[i] ? args.series[i].name : `Series ${i + 1}`;
                        args.text[i] = `${seriesName}: <b>${formattedValue}</b>`;
                    }
                }
            }
        },
        resized: (args: IResizeEventArgs) => {
            const maxWidth: number = args.chart.availableSize.width;
            args.chart.legendSettings.location.x = maxWidth - 115;
        }
    });
    chart.appendTo('#container');
};