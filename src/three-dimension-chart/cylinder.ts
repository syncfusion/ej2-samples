import { loadCultureFiles } from '../common/culture-loader';
import { pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrap5Colors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, pointMaterial3Colors, pointMaterial3DarkColors, pointFluent2Colors, pointFluent2DarkColors } from './theme-color';
import { ChartTheme, Chart3DPointRenderEventArgs, Chart3D, ColumnSeries3D, Category3D, Tooltip3D, Chart3DLoadedEventArgs } from '@syncfusion/ej2-charts';
Chart3D.Inject(ColumnSeries3D, Category3D, Tooltip3D);
import { Browser, EmitType } from '@syncfusion/ej2-base';
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
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        },
        pointRender: labelRender,
        axisLabelRender: (args: Chart3DAxisLabelRenderEventArgs) => {
            if (args.axis.name === 'primaryYAxis') {
                args.text = args.text + 'M';
            }
        },
    });
    chart.appendTo('#container');
};