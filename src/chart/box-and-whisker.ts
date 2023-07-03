import { loadCultureFiles } from '../common/culture-loader';
import {
    ChartTheme, Chart, getSaturationColor, Category, ILoadedEventArgs,
    IPointRenderEventArgs, BoxAndWhiskerSeries, Tooltip, getElement, BoxPlotMode
} from '@syncfusion/ej2-charts';
import { bubbleFabricColors, pointFabricColors, pointMaterialDarkColors, bubbleMaterialDarkColors, bubbleMaterialColors, pointMaterialColors, bubbleBootstrap5DarkColors, pointBootstrap5DarkColors, bubbleBootstrap5Colors, pointBootstrap5Colors, bubbleBootstrapColors, pointBootstrapColors, bubbleHighContrastColors, pointHighContrastColors, bubbleFluentDarkColors, pointFluentDarkColors, bubbleFluentColors, pointFluentColors, bubbleTailwindDarkColors, pointTailwindDarkColors, bubbleTailwindColors, pointTailwindColors } from './theme-color';
Chart.Inject(Category, BoxAndWhiskerSeries, Tooltip);
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2/base';

/**
 * Sample for Box and Whisker series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
        '#ea7a57', '#404041', '#00bdae'];
    let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
        '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
    let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
        '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
    let fluentColors: string[] = ['#1AC9E6', '#4C6FB1', '#CC6952', '#3F579A', '#4EA09B', '#6E7A89', '#D4515C', '#E6AF5D', '#639751',
        '#9D4D69'];
    let fluentDarkColors: string[] = ['#1AC9E6', '#2A72D5', '#43B786', '#584EC6', '#E85F9C', '#6E7A89', '#EA6266', '#EBA844', '#26BC7A', 
        '#BC4870'];        
    let labelRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
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
        }
    };
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category', 
            majorGridLines: { width: 0 },
            labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45',
            labelRotation: Browser.isDevice ? -45 : 0,
            majorTickLines: { width: 0 },
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        primaryYAxis:
        {
            minimum: 10, maximum: 60,
            interval: 10, title: 'Age',
            majorGridLines: { width: 1 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        },
        pointRender: labelRender,
        //Initializing Chart Series
        series: [
            {
                type: 'BoxAndWhisker',
                dataSource: [
                    { x: 'Development', y: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
                    { x: 'Testing', y: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
                    { x: 'Finance', y: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
                    { x: 'R&D', y: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
                    { x: 'Sales', y: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
                    { x: 'Inventory', y: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
                    { x: 'Graphics', y: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
                    { x: 'Training', y: [28, 29, 30, 31, 32, 34, 35, 36] },
                    { x: 'HR', y: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] }
                ],
                xName: 'x',
                yName: 'y',
                marker: {
                    visible: true,
                    width: 7,
                    height: 7
                }, boxPlotMode: "Normal", showMean: true,
            }
        ],
        // Initializing the tooltip
        tooltip: {
            enable: true
        }, //Initializing Chart title
        width: Browser.isDevice ? '100%' : '70%',
        title: 'Employee Age Group in Various Department',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        legendSettings: {
            visible: false
        }
    });
    chart.appendTo('#container');
};