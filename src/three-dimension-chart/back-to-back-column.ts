import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart3D, Category3D, ColumnSeries3D, Legend3D, Chart3DLoadedEventArgs, Tooltip3D, Highlight3D } from '@syncfusion/ej2-charts';
Chart3D.Inject(Category3D, ColumnSeries3D, Legend3D, Tooltip3D, Highlight3D);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Column Series with Side by side placement
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart3D = new Chart3D({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category', interval: 1,
            labelPlacement: 'BetweenTicks',
            labelRotation: -45
        },
        primaryYAxis: {
            interval: Browser.isDevice ? 4 : 2
        },
        series: [
            {
                type: 'Column', xName: 'x', yName: 'y', name: 'Grapes',
                dataSource: [{ x: 'Jamesh', y: 1 }, { x: 'Michael', y: 2 }, { x: 'John', y: 2 }, { x: 'Jack', y: 1 }, { x: 'Lucas', y: 1 }],
                columnWidth: 0.2
            },
            {
                type: 'Column', xName: 'x', yName: 'y', name: 'Orange',
                dataSource: [{ x: 'Jamesh', y: 4 }, { x: 'Michael', y: 3 }, { x: 'John', y: 4 }, { x: 'Jack', y: 2 }, { x: 'Lucas', y: 3 }],
                columnWidth: 0.2
            },
            {
                type: 'Column', xName: 'x', yName: 'y', name: 'Apple',
                dataSource: [{ x: 'Jamesh', y: 5 }, { x: 'Michael', y: 4 }, { x: 'John', y: 5 }, { x: 'Jack', y: 5 }, { x: 'Lucas', y: 6 }],
                columnWidth: 0.2
            },
            {
                type: 'Column', xName: 'x', yName: 'y', name: 'Total',
                dataSource: [{ x: 'Jamesh', y: 10, text: 'Total 10' },
                { x: 'Michael', y: 9, text: 'Total 9' }, { x: 'John', y: 11, text: 'Total 11' }, { x: 'Jack', y: 8, text: 'Total 8' }, { x: 'Lucas', y: 10, text: 'Total 10' }],
                columnWidth: 0.2
            }
        ],
        enableSideBySidePlacement: false,
        rotation: Browser.isDevice ? 5 : 25,
        depth: 500,
        height: '400',
        title: 'Fruit Consumption by Individuals', tooltip: { enable: true },
        legendSettings: { visible: true, enableHighlight: true },
        width: Browser.isDevice ? '100%' : '75%',
        load: function (args) {
            var selectedTheme = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    chart.appendTo('#container');
};