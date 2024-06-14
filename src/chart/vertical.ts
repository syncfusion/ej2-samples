import { loadCultureFiles } from '../common/culture-loader';
import { Chart, LineSeries, ILoadedEventArgs, Series, ChartTheme, getElement, ColumnSeries, Category, Tooltip } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, ColumnSeries, Category, Tooltip);
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for vertical chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chartData: Object[] = [
          { x:"2016", y:13600, y1:0.5},
          { x:"2017", y:12900, y1:1.5},
          { x:"2018", y:12500, y1:3.5},
          { x:"2019", y:14500, y1:1.5},
          { x:"2020", y:14500, y1:3},
          { x:"2021", y:12000, y1:2.5},
    ];
    let interval: number;
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } },
        //Initializing Primary Y Axis
        primaryYAxis: { title: 'Sales in Billion', majorGridLines: { width: 0 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minimum: 11000, maximum: 15000, interval: 500, edgeLabelPlacement: 'Shift' },
        axes: [
            {
                minimum: 0, maximum: 4, interval: 0.5, opposedPosition: true, name: 'yAxis2', title: 'Profit(In Percentage)',
                labelFormat: '{value}%', edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }
            }
        ],
        series: [
            {
                type: 'Column', xName: 'x', yName: 'y', dataSource: chartData,
                width: 2, name: 'Sales'
            },
            {
                dataSource: chartData, type: 'Line', yAxisName: 'yAxis2', xName: 'x', yName: 'y1', width: 2,
                marker: { isFilled: true, visible: true, width: 7, height: 7 }, name: 'Profit Margin'
            }
        ],
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Vertical Mode
        isTransposed: true,
        //Initializing Chart Title
        title: 'Sales Vs Profit Margins',
        //Initializing User Interaction Tooltip
        tooltip: { enable: true },
        legendSettings: { visible: false },
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        },
    });
    chart.appendTo('#container-vertical');
};