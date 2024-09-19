import { loadCultureFiles } from '../common/culture-loader';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
import {
    CircularChart3D, CircularChartLegend3D, PieSeries3D, CircularChartTooltip3D,
    CircularChartDataLabel3D, CircularChart3DLoadedEventArgs, CircularChart3DTheme
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
CircularChart3D.Inject(CircularChartLegend3D, PieSeries3D, CircularChartTooltip3D, CircularChartDataLabel3D);
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
                    { x: 'Belgium', y: 551500, r: Browser.isDevice ? '120' : '110.7', text: 'Belgium' },
                    { x: 'Dominican Republic', y: 312685, r: '137.5', text: 'Dominican Republic' },
                    { x: 'Cuba', y: 350000, r:  '124.6', text: 'Cuba' },
                    { x: 'Egypt', y: 301000, r: Browser.isDevice ? '130.8' : '150.8', text: 'Egypt' },
                    { x: 'Kazakhstan', y: 300000, r: Browser.isDevice ? '135.5' : '155.5', text: 'Kazakhstan' },
                    { x: 'Somalia', y: 357022, r: Browser.isDevice ? '104.6' :'160.6', text: 'Somalia' },
                    { x: 'Argentina', y: 505370, r: Browser.isDevice ? '110' : '100', text: 'Argentina' },
                ],
                radius: 'r', xName: 'x', tooltipMappingName: 'r',
                yName: 'y', innerRadius: '20%',
                dataLabel: {
                    visible: true, position: Browser.isDevice ? 'Inside' : 'Outside',
                    name: 'text', enableRotation: true,
                    font: { fontWeight: '600' },
                    connectorStyle: { length: '20px' }
                },
                animation: {enable: false}
            },
        ],
        rotation: 15,
        tilt: -15,
        title: 'Population Density per Square Kilometer by Country',
        legendSettings: {
            visible: true,
            reverse: true
        },
        enableAnimation: false,
        // Initialize tht tooltip
        tooltip: { enable: true, format: '<b>${point.x}</b><br/>Area in square km: <b>${point.y} </b> <br/> Population density per square km: <b>${point.tooltip}</b>' },
        load: (args: CircularChart3DLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <CircularChart3DTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });
    pie.appendTo('#container');
};
