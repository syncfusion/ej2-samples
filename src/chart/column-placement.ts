import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, ColumnSeries, Category, DataLabel, Tooltip, ILoadedEventArgs, Legend } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Category, Tooltip, Legend);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Column Series with Side by side placement
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
        },
        chartArea: { border: { width: 0 } },
        primaryYAxis:
        {
            title: 'Fruits Count',
            majorTickLines: { width: 0 }, lineStyle: { width: 0 }
        },
        enableSideBySidePlacement: false,
        // Initialize the chart series
        series: [
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Total',
                dataSource: [{ x: 'Jamesh', y: 10, text: 'Total 10' },
                { x: 'Michael', y: 9, text: 'Total 9' }, { x: 'John', y: 11, text: 'Total 11' }, { x: 'Jack', y: 8, text: 'Total 8' }, { x: 'Lucas', y: 10, text: 'Total 10' }],
                columnWidth: 0.5,
                marker: { dataLabel: { visible: true, name: 'text', position:  Browser.isDevice ? 'Outer' : 'Top', font: { fontWeight: '600', color:  Browser.isDevice? '' :'#ffffff' } } }
            },
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Apple',
                dataSource: [{ x: 'Jamesh', y: 5 }, { x: 'Michael', y: 4 }, { x: 'John', y: 5 }, { x: 'Jack', y: 5}, { x: 'Lucas', y: 6}],
                columnWidth: 0.4,
                marker: { dataLabel: { visible: true, name: 'text', position: 'Top', font: (Browser.isDevice) ? {size: '8px', fontWeight: '600'} : { fontWeight: '600', color: '#ffffff' }} }
            }, {
                type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Orange',
                dataSource: [{ x: 'Jamesh', y: 4 }, { x: 'Michael', y: 3 }, { x: 'John', y: 4 }, { x: 'Jack', y: 2 }, { x: 'Lucas', y: 3}],
                columnWidth: 0.3,
                marker: { dataLabel: { visible: true, name: 'text', position: 'Top', font: (Browser.isDevice) ? {size: '8px', fontWeight: '600'} : { fontWeight: '600', color: '#ffffff' } } }
            },
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Grapes',
                dataSource: [{ x: 'Jamesh', y: 1 }, { x: 'Michael', y: 2 }, { x: 'John', y: 2 }, { x: 'Jack', y: 1}, { x: 'Lucas', y: 1}],
                columnWidth: 0.2,
                marker: { dataLabel: { visible: true, name: 'text', position: 'Top', font: (Browser.isDevice) ? {size: '8px', fontWeight: '600'} : { fontWeight: '600', color: '#ffffff' } } }
            }
        ],
        // Initialize the chart title
        title: 'Fruit Consumption', tooltip: { enable: true, shared: true },
        legendSettings: {visible:true},
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });
    chart.appendTo('#container');
};