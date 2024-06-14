import { loadCultureFiles } from '../common/culture-loader';
import { pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrap5Colors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, pointMaterial3Colors, pointMaterial3DarkColors, pointFluent2Colors, pointFluent2DarkColors } from './theme-color';
import { ChartTheme, Chart3D, Category3D, Legend3D, Chart3DPointRenderEventArgs, ColumnSeries3D, Tooltip3D, Chart3DLoadedEventArgs, Highlight3D } from '@syncfusion/ej2-charts';
Chart3D.Inject(ColumnSeries3D, Category3D, Legend3D, Tooltip3D, Highlight3D);
import { Browser, EmitType } from '@syncfusion/ej2-base';

let labelRender: EmitType<Chart3DPointRenderEventArgs> = (args: Chart3DPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = pointFabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material-dark') {
        args.fill = pointMaterialDarkColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = pointMaterialColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap5-dark') {
        args.fill = pointBootstrap5DarkColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap5') {
        args.fill = pointBootstrap5Colors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap') {
        args.fill = pointBootstrapColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap4') {
        args.fill = pointBootstrapColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap-dark') {
        args.fill = pointBootstrapColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = pointHighContrastColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent-dark') {
        args.fill = pointFluentDarkColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent') {
        args.fill = pointFluentColors[args.point.index % 10];
    } else if (selectedTheme === 'tailwind-dark') {
        args.fill = pointTailwindDarkColors[args.point.index % 10];
    } else if (selectedTheme === 'tailwind') {
        args.fill = pointTailwindColors[args.point.index % 10];
    } else if (selectedTheme === 'material3') {
        args.fill = pointMaterial3Colors[args.point.index % 10];
    } else if (selectedTheme === 'material3-dark') {
        args.fill = pointMaterial3DarkColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2') {
        args.fill = pointFluent2Colors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2-dark') {
        args.fill = pointFluent2DarkColors[args.point.index % 10];
    }
};
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
        pointRender: labelRender,
        load: (args: Chart3DLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    chart.appendTo('#container');
};