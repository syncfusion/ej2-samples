import { loadCultureFiles } from '../common/culture-loader';
import { Chart, ColumnSeries, Category, Legend, Tooltip, ILoadedEventArgs, IAxisLabelRenderEventArgs, ITooltipRenderEventArgs, Highlight } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, Category, Legend, Tooltip, Highlight);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Column Series
 */
let columnData: Object[] = [
    { country: 'Chile', walnuts: 175000, almonds: 11300 },
    { country: 'European Union', walnuts: 140000, almonds: 135000 },
    { country: 'Turkey', walnuts: 67000, almonds: 24000 },
    { country: 'India', walnuts: 33000, almonds: 4200 },
    { country: 'Australia', walnuts: 12000, almonds: 154000 }
];

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category',
            interval: 1,
            labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
            labelRotation: Browser.isDevice ? -45 : 0,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }
        },
        chartArea: { border: { width: 0 }, margin: { bottom: 12 } },
        primaryYAxis:
        {
            title: 'Metric Tons',
            interval: 40000,
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'country', yName: 'walnuts', name: 'Walnuts', columnSpacing: 0.4, legendShape: 'Rectangle',
                dataSource: columnData, cornerRadius: { topLeft: 4, topRight: 4 }
            },
            {
                type: 'Column', xName: 'country', yName: 'almonds', name: 'Almonds', columnSpacing: 0.4, legendShape: 'Rectangle',
                dataSource: columnData, cornerRadius: { topLeft: 4, topRight: 4 }
            }
        ],
        //Initializing Chart title
        width: Browser.isDevice ? '100%' : '75%',
        title: 'Walnuts and Almonds Estimated Production for 2023',
        subTitle: 'Source: fas.usda.gov',
        tooltip: { enable: true, header: '<b>${point.x}</b>', format: '${series.name}: <b>${point.y}</b>', enableHighlight: true },
        legendSettings: { visible: true, enableHighlight: true, shapeWidth: 9, shapeHeight: 9 },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            const value: number = parseInt(args.text.replace(/,/g, ''), 10);
            if (value >= 1000) {
                args.text = value / 1000 + 'K';
            }
        },
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            if (args.text) {
                let value: string = args.point.y.toLocaleString('en-US');
                args.text = `${args.series.name}: <b>${value}</b>`;
            }
        }
    });
    chart.appendTo('#container');
};