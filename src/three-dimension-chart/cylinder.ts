import { loadCultureFiles } from '../common/culture-loader';
import { load3DChartTheme, pointRender } from './theme-color';
import { ChartTheme, Chart3D, ColumnSeries3D, Category3D, Tooltip3D, Chart3DLoadedEventArgs } from '@syncfusion/ej2-charts';
Chart3D.Inject(ColumnSeries3D, Category3D, Tooltip3D);
import { Browser } from '@syncfusion/ej2-base';
import { Chart3DAxisLabelRenderEventArgs } from '@syncfusion/ej2/charts';

/**
 * Sample for Column Series
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
        primaryYAxis:
        {
            maximum: 4,
            interval: 1
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column', columnFacet: 'Cylinder', xName: 'x', yName: 'y', columnWidth: 0.9,
                dataSource: [{ x: 'Czechia', y: 1.11 }, { x: 'Spain', y: 1.66 },  { x: 'USA', y: 1.56 },{ x: 'Germany', y: 3.1 }, { x: 'Russia', y: 1.35 },   { x: 'Slovakia', y: 1 }, { x: 'South Korea', y: 3.16 },{ x: 'France', y: 0.92 }]
            }
        ],
        height: '400',
        rotation: 7,
        tilt: 10,
        depth: 100,
        wallColor: 'transparent',
        width: Browser.isDevice ? '100%' : '75%',
        title: 'Passenger Car Production in Selected Countries – 2021',
        //Initializing Chart title
        tooltip: { enable: true, header: "${point.x}", format: 'Car Production : <b>${point.y}M' },
        load: (args: Chart3DLoadedEventArgs) => {
            load3DChartTheme(args);
        },
        pointRender: pointRender,
        axisLabelRender: (args: Chart3DAxisLabelRenderEventArgs) => {
            if (args.axis.name === 'primaryYAxis') {
                args.text = args.text + 'M';
            }
        },
    });
    chart.appendTo('#container');
};