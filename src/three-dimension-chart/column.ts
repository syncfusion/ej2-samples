import { loadCultureFiles } from '../common/culture-loader';
import { Chart3DPointRenderEventArgs, ChartTheme, Chart3D, Category3D, Legend3D, ColumnSeries3D, Tooltip3D, Chart3DLoadedEventArgs, Highlight3D } from '@syncfusion/ej2-charts';
Chart3D.Inject(ColumnSeries3D, Category3D, Legend3D, Tooltip3D, Highlight3D);
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrap5Colors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, pointMaterial3Colors, pointMaterial3DarkColors, pointFluent2Colors, pointFluent2DarkColors } from './theme-color';
import { Chart3DAxisLabelRenderEventArgs } from '@syncfusion/ej2/charts';

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
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        },
        pointRender: labelRender

    });
    chart.appendTo('#container');
};