import { loadCultureFiles } from '../common/culture-loader';
import { load3DChartTheme, pointRender } from './theme-color';
import { ChartTheme, Chart3D, Category3D, Legend3D, ColumnSeries3D, Tooltip3D, Chart3DLoadedEventArgs, Highlight3D } from '@syncfusion/ej2-charts';
Chart3D.Inject(ColumnSeries3D, Category3D, Legend3D, Tooltip3D, Highlight3D);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Column Series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart3D = new Chart3D({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category', labelPlacement: 'BetweenTicks', interval: 1, labelRotation: -45
        },
        primaryYAxis:
        {
            maximum: 20, interval: 4
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'x', yName: 'y', name: 'Gold', columnSpacing: 0.1,
                dataSource: [{ x: 'Italy', y: 10 }, { x: 'Kenya', y: 4 },{ x: 'France', y: 10 }, { x: 'Hungary', y: 0 }, { x: 'Australia', y: 17 }, { x: 'Brazil', y: 7 },  { x: 'Netherlands', y: 10 }, { x: 'Unspecified', y: null }, { x: 'Germany', y: 10 }, { x: 'Serbia', y: 3 }]
            },
        ],
        wallColor: 'transparent',
        enableRotation: true,
        rotation: 7,
        tilt: 10,
        depth: 100,
        height: '400',
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart title
        title: 'Olympic Gold Medal Counts - Tokyo 2020',
        tooltip: { enable: true, header: '${point.x}', format: 'Gold Medal : <b>${point.y}' },
        legendSettings: { enableHighlight: true, visible: false },
        pointRender: pointRender,
        load: (args: Chart3DLoadedEventArgs) => {
            load3DChartTheme(args);
        }
    });
    chart.appendTo('#container');
};