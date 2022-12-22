import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationTheme, AccumulationChart, AccumulationLegend, PieSeries, IAccLoadedEventArgs,
    AccumulationDataLabel, AccumulationTooltip
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip);
/**
 * Sample for Doughnut chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let pie: AccumulationChart = new AccumulationChart({
        // Initialize the chart series
        series: [
            {
                dataSource: Browser.isDevice ?
                [{ x: 'Chrome', y: 59.28, text: ' Chrome: 59.28%' }, { x: 'Safari', y: 5.73, text: Browser.isDevice ? 'Safari: <br> 5.73%'  : 'Safari: 5.73%' },
                { x: 'Opera', y: 6.12, text: 'Opera: 6.12%' },
                { x: 'Edge', y: 7.48, text: 'Edge: 7.48%' },
                { x: 'Others', y: 22.41, text: 'Others: 22.41%' }] : 
                [{ x: 'Chrome', y: 59.28, text: ' Chrome: 59.28%' }, { x: 'UC Browser', y: 4.37, text: 'UC Browser: 4.37%' },
                { x: 'Opera', y: 2.12, text: 'Opera: 2.12%' }, { x: 'Sogou Explorer', y: 1.73, text: 'Sogou Explorer: 1.73%' },
                { x: 'QQ', y: 3.96, text: 'QQ: 3.96%' }, { x: 'Safari', y: 5.73, text: 'Safari: 5.73%' },
                { x: 'Internet Explorer', y: 6.12, text: 'Internet Explorer: 6.12%' },
                { x: 'Edge', y: 7.48, text: 'Edge: 7.48%' },
                { x: 'Others', y: 9.21, text: 'Others: 9.21%' }],
                dataLabel: {
                    visible: true,
                    name: 'text',
                    position: 'Outside',
                    font: {
                        fontWeight: '600',
                    },
                    connectorStyle:{length:'20px', type: 'Curve'}
                },
                xName: 'x',
                yName: 'y', startAngle: Browser.isDevice ? 62 : 0, radius: Browser.isDevice ? '40%' : '75%',
                innerRadius: '40%', name: 'Project',
                explode: true, explodeOffset: '10%', explodeIndex: 0,
            }
        ],
        enableSmartLabels: true,
        enableBorderOnMouseMove:false,
        legendSettings: {
            visible: false, position: 'Top'
        },
        // Initialize the tooltip
        tooltip: { enable: true,format:'<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>',header:"" },
        title: 'Mobile Browsers Statistics',
         // custom code start
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
         // custom code end
    });
    pie.appendTo('#container');
};