import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart3D, Category3D, Legend3D, ColumnSeries3D, Tooltip3D, Chart3DLoadedEventArgs, Highlight3D } from '@syncfusion/ej2-charts';
Chart3D.Inject(ColumnSeries3D, Category3D, Legend3D, Tooltip3D, Highlight3D);
import { Browser } from '@syncfusion/ej2-base';
import { load3DChartTheme, pointRender } from './theme-color';
import { Chart3DAxisLabelRenderEventArgs } from '@syncfusion/ej2/charts';


/**
 * Sample for Column Series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart3D = new Chart3D({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category',
            labelRotation: -45,
            labelPlacement: 'BetweenTicks'
        },
        primaryYAxis:
        {
            maximum: 150000, interval: 30000
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'x', yName: 'y', columnSpacing: 0.1,
                dataSource: [{ x: 'Tesla', y: 137429 },{ x: 'Aion', y: 80308 }, { x: 'Wuling', y: 76418 }, { x: 'Changan', y: 52849 }, { x: 'Geely', y: 47234 }, { x: 'Nio', y: 31041 }, { x: 'Neta', y: 22449 }, { x: 'BMW', y: 18733 } ]
            }
        ],
        wallColor: 'transparent',
        enableRotation: true,
        rotation: 7,
        tilt: 10,
        depth: 100,
        height: '400',
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart title
        title: 'Top Selling Electric Cars in China',
        tooltip: { enable: true, header: "${point.x}", format: 'Sales Count : <b>${point.y}' },
        legendSettings: { enableHighlight: true, visible: false },
        axisLabelRender: (args: Chart3DAxisLabelRenderEventArgs) => {
            if (args.axis.name === 'primaryYAxis') {
                let value: number = Number(args.text) / 1000;
                args.text = (typeof value === 'number' && !isNaN(value)) ? String(value) + 'k' : args.text;
            }
        },
        load: (args: Chart3DLoadedEventArgs) => {
            load3DChartTheme(args);
        },
        pointRender: pointRender

    });
    chart.appendTo('#container');
};