import { loadCultureFiles } from '../common/culture-loader';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
import { CircularChart3D, PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChartHighlight3D, CircularChart3DLoadedEventArgs, CircularChart3DTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
CircularChart3D.Inject( PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChartHighlight3D);
/**
 * Sample for Pie with Various Radius
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let pie: CircularChart3D = new CircularChart3D({
        // Initialize the chart series
        series: [
            {
                dataSource: [
                    { 'x': 'Canada', y: 46, text: 'Canada: 46' },
                    { 'x': 'Hungary', y: 30, text: 'Hungary: 30' },
                    { 'x': 'Germany', y: 79, text: 'Germany: 79' },
                    { 'x': 'Mexico', y: 13, text: 'Mexico: 13' },
                    { 'x': 'China', y: 56, text: 'Greece: 26' },
                    { 'x': 'India', y: 41, text: 'India: 41' },
                    { 'x': 'Bangladesh', y: 25, text: 'Bangladesh: 25' },
                    { 'x': 'United States', y: 32, text: 'United States: 32' },
                    { 'x': 'Belgium', y: 34, text: 'Belgium: 34' }
                ],
                xName: 'x',
                yName: 'y',
                radius: Browser.isDevice ? '45%' : '75%',
                innerRadius: '0%',
                explode: true,
                explodeOffset: Browser.isDevice ? '10%' : '30%',
                dataLabel: {
                    visible: true, position: 'Outside',
                    name: 'x',
                    font: { fontWeight: '600' },
                    connectorStyle: { length: Browser.isDevice ? '20px' : '40px' }
                },
            },
        ],
        title: 'Berlin 2023 Special Olympics Gold Medals',
        legendSettings: {
            visible: false,
        },
        // Initialize tht tooltip
        tooltip: { enable: true, format: "<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>", header: "" },
        enableRotation: true,
        tilt: -45,
        load: (args: CircularChart3DLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <CircularChart3DTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    pie.appendTo('#container');
};
