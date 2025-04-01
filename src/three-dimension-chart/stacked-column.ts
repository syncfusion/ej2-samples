import { loadCultureFiles } from '../common/culture-loader';
import { Chart3D, StackingColumnSeries3D, Category3D, Legend3D, Tooltip3D, Chart3DLoadedEventArgs, Highlight3D, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { load3DChartTheme } from './theme-color';
Chart3D.Inject(StackingColumnSeries3D, Category3D, Legend3D, Tooltip3D, Highlight3D);

/**
 * Sample for StackedColumn Series
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart3D = new Chart3D({

        //Initializing Primary X Axis
        primaryXAxis: {
            interval: 1,
            valueType: 'Category'
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            maximum: Browser.isDevice ? 50 : 60,
            interval: 10
        },
        //Initializing Chart Series
        series: [
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2018', y: 24.5 },
                    { x: '2019', y: 25.6 },
                    { x: '2020', y: 29 },
                    { x: '2021', y: 28.5 },
                    { x: '2022', y: 30.6 }
                ],
                xName: 'x', stackingGroup: 'Asia',
                yName: 'y', name: 'Iran', columnWidth: 0.6
            },
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2018', y: 6.2 },
                    { x: '2019', y: 15.6 },
                    { x: '2020', y: 14.3 },
                    { x: '2021', y: 9.3 },
                    { x: '2022', y: 7.8 },
                ],
                xName: 'x', stackingGroup: 'Asia',
                yName: 'y', name: 'Indonesia', columnWidth: 0.6
            },
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2018', y: 24.5 },
                    { x: '2019', y: 23.2 },
                    { x: '2020', y: 20.4 },
                    { x: '2021', y: 23.2 },
                    { x: '2022', y: 24.5 }
                ],
                xName: 'x', stackingGroup: 'Europe',
                yName: 'y', name: 'Italy', columnWidth: 0.6

            },
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2018', y: 15.4 },
                    { x: '2019', y: 21.1 },
                    { x: '2020', y: 13.9 },
                    { x: '2021', y: 11.6 },
                    { x: '2022', y: 14.4 },
                ],
                xName: 'x', stackingGroup: 'Europe',
                yName: 'y', name: 'France', columnWidth: 0.6

            }
        ],

        //Initializing Chart title
        title: 'Steel Production by Countries, Grouped by Continent',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true, format: '${point.x} : <b>${point.y} Mmt'
        },
        wallColor: 'transparent',
        height: '400',
        enableRotation: true,
        rotation: 7,
        tilt: 10,
        depth: 100,
        width: Browser.isDevice ? '100%' : '75%',
        legendSettings: {
            enableHighlight: true
        },
        load: (args: Chart3DLoadedEventArgs) => {
            load3DChartTheme(args);
        },
        axisLabelRender: function (args) {
            if (args.axis.name === 'primaryYAxis') {
                args.text = args.text + ' Mmt';
            }
        }
    });
    chart.appendTo('#container');
};