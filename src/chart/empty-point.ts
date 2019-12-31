import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, ChartTheme, SplineSeries, AreaSeries, ChartSeriesType,
    EmptyPointMode, Category, Legend, Tooltip, ILoadedEventArgs
} from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
Chart.Inject(ColumnSeries, Category, Legend, Tooltip, SplineSeries, AreaSeries);

/**
 * Sample for Empty Points
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            title: 'Product', valueType: 'Category', interval: 1
        },
        primaryYAxis:
        {
            title: 'Profit', minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}%'
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Profit',
                dataSource: [
                    { x: 'Rice', y: 80 }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
                    { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
                    { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
                    { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
                ],
                marker: { visible: true, height: 10, width: 10 },
                emptyPointSettings: {
                    fill: '#e6e6e6',
                }
            },
        ],
        legendSettings: { visible: false },
        //Initializing Chart title
        title: 'Annual Product-Wise Profit Analysis',
        // Tooltip initialized
        tooltip: { enable: true },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    chart.appendTo('#container');
    let mode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].emptyPointSettings.mode = <EmptyPointMode>mode.value;
            chart.refresh();
        }
    });
    mode.appendTo('#emptypointmode');
    let edgeMode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].type = <ChartSeriesType>edgeMode.value;
            chart.refresh();
        }
    });
    edgeMode.appendTo('#SelectSeriesType');
};