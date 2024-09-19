import { loadCultureFiles } from '../common/culture-loader';
import { Chart3D, StackingBarSeries3D, Category3D, Legend3D, Tooltip3D, Chart3DLoadedEventArgs, Highlight3D, ChartTheme } from '@syncfusion/ej2-charts';
Chart3D.Inject(StackingBarSeries3D, Category3D, Legend3D, Tooltip3D, Highlight3D);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for StackedBar Series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart3D = new Chart3D({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            labelPlacement: 'BetweenTicks'
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            edgeLabelPlacement: 'Shift', interval: Browser.isDevice ? 20 : 10
        },
        //Initializing Chart Series
        series: [
            {
                type: 'StackingBar',
                dataSource: [
                    { x: 'Sochi 2014', y: 9 },
                    { x: 'Rio 2016', y: 46 },
                    { x: Browser.isDevice ? 'Pyeongchang<br> 2018' : 'Pyeongchang 2018', y: 9 },
                    { x: 'Tokyo 2020', y: 39 },
                    { x: 'Beijing 2022', y: 8 },
                ],
                name: 'America',
                xName: 'x',
                yName: 'y',
                columnWidth: 0.6
            },
            {
                type: 'StackingBar',
                dataSource: [
                    { x: 'Sochi 2014', y: 10 },
                    { x: 'Rio 2016', y: 4 },
                    { x: Browser.isDevice ? 'Pyeongchang<br> 2018' : 'Pyeongchang 2018', y: 11 },
                    { x: 'Tokyo 2020', y: 7 },
                    { x: 'Beijing 2022', y: 4 },],
                name: 'Canada',
                xName: 'x',
                yName: 'y',
                columnWidth: 0.6
            },
            {
                type: 'StackingBar',
                dataSource: [
                    { x: 'Sochi 2014', y: 4 },
                    { x: 'Rio 2016', y: 10 },
                    { x: Browser.isDevice ? 'Pyeongchang<br> 2018' : 'Pyeongchang 2018', y: 5 },
                    { x: 'Tokyo 2020', y: 10 },
                    { x: 'Beijing 2022', y: 5 },],
                name: 'France',
                xName: 'x',
                yName: 'y',
                columnWidth: 0.6

            },
            {
                type: 'StackingBar',
                dataSource: [
                    { x: 'Sochi 2014', y: 8 },
                    { x: 'Rio 2016', y: 17 },
                    { x: Browser.isDevice ? 'Pyeongchang<br> 2018' : 'Pyeongchang 2018', y: 14 },
                    { x: 'Tokyo 2020', y: 10 },
                    { x: 'Beijing 2022', y: 12 },],
                name: 'Germany',
                xName: 'x',
                yName: 'y',
                columnWidth: 0.6

            }
        ],

        //Initializing Chart title
        title: 'Olympic Gold Medal Comparison',
        tooltip: {
            enable: true
        },
        enableRotation: true,
        rotation: 22,
        depth: 100,
        height: '400',
        width: Browser.isDevice ? '100%' : '75%',
        legendSettings: {
            enableHighlight: true
        },
        load: (args: Chart3DLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });
    chart.appendTo('#container');
};