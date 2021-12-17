import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, ColumnSeries, Category, Legend, DataLabel, Tooltip,
    ILoadedEventArgs, IAxisLabelRenderEventArgs, } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Category, Legend, Tooltip);
import { Browser, EmitType } from '@syncfusion/ej2-base';

/**
 * Sample for Column Series
 */
 let labelRender: EmitType<IAxisLabelRenderEventArgs> = (args: IAxisLabelRenderEventArgs): void => {
    if (args.axis.orientation === 'Horizontal') {
        args.cancel = args.value === 2015 || args.value === 2020;
    }
};
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Double', majorGridLines: { width: 0 },
            minimum: 2015, maximum: 2020, interval: 1
        },
        primaryYAxis:
        {
            valueType: 'Double', minimum: 0, maximum: 1200, interval: 200,
            lineStyle: { width: 0 },labelFormat: '{value}B'
        },
        chartArea: { border: { width: 0 } },
        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Sales',
                dataSource: [{ x: 2016, y: 1000 }, { x: 2017, y: 970}, { x: 2018, y: 1060 }, { x: 2019, y: 1030 }]
            },
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Expense',
                dataSource: [{ x: 2016, y: 400 }, { x: 2017, y: 360 }, { x: 2018, y: 920 }, { x: 2019, y: 540 }]
            },
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Profit',
                dataSource: [{ x: 2016, y: 600 }, { x: 2017, y: 610 }, { x: 2018, y: 140 }, { x: 2019, y: 490 }]
            }
        ],
        //Initializing Chart title
        width: Browser.isDevice ? '100%' : '60%',
        enableRtl: true,
        title: 'Company Performance', tooltip: { enable: true },
        axisLabelRender: labelRender,
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    chart.appendTo('#container');
};