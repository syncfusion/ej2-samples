import { loadCultureFiles } from '../common/culture-loader';
import { CircularChart3D, PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChartHighlight3D, CircularChartSelection3D , CircularChart3DLoadedEventArgs, CircularChart3DTheme } from '@syncfusion/ej2-charts';
import { Browser, EmitType } from '@syncfusion/ej2/base';
CircularChart3D.Inject( PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChartHighlight3D, CircularChartSelection3D );
/**
 * Sample for pie selection
 */

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let count: number = 0;
    let pie: CircularChart3D = new CircularChart3D({
        // Initialize the chart series
        series: [
            {
                dataSource: [
                    { 'x': 'Chrome', y: 62.92 },
                    { 'x': 'Internet Explorer', y: 6.12 },
                    { 'x': 'Edge', y: 5.5 },
                    { 'x': 'Opera', y: 3.15 },
                    { 'x': 'Safari', y: 19.97 },
                    { 'x': 'Others', y: 2.34 }
                ],
                xName: 'x', yName: 'y',
                radius: Browser.isDevice ? '50%' : '70%',
                dataLabel: {
                    visible: true,
                    name: 'x',
                    position: 'Outside',
                    font: {
                        fontWeight: '600',
                    },
                    connectorStyle: { length: Browser.isDevice ? '20px' : '40px' }
                },
            }
        ],
        title: "Browser Market Shares in November 2023",
        legendSettings: {
            visible: true,
            position: Browser.isDevice ? 'Bottom' : 'Right',
            toggleVisibility: false
        },
        tilt: -30,
        selectionMode: 'Point',
        selectionPattern: 'DiagonalBackward',
        isMultiSelect: true,
        highlightMode: 'Point',
        tooltip: { enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "" },
        // Triggered animation complete, text render and load event
        load: (args: CircularChart3DLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <CircularChart3DTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        },
    });
    pie.appendTo('#donut-container');
};