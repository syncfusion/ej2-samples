import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationTheme, AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs,
    AccumulationDataLabel
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
import { loadAccumulationChartTheme } from './theme-color';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 * Sample for Pie chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let pie: AccumulationChart = new AccumulationChart({
        // Initialize the chart series
        series: [
            {
                dataSource: Browser.isDevice ? 
                    [{ 'x': 'Chrome', y: 59.28, text: 'Chrome: 59.28%' },
                        { 'x': 'Safari', y: 4.73, text: 'Safari <br> 4.73%' },
                        { 'x': 'Opera', y: 6.12, text: 'Opera: 6.12%' },
                        { 'x': 'Edge', y: 7.48, text: 'Edge: 7.48%' },
                        { 'x': 'Others', y: 22.39, text: 'Others: 22.39%' }] :
                    [
                        { 'x': 'Chrome', y: 59.28, text: 'Chrome: 59.28%' },
                        { 'x': 'UC Browser', y: 4.37, text: 'UC Browser: 4.37%' },
                        { 'x': 'Opera', y: 3.12, text: 'Opera: 3.12%' },
                        { 'x': 'Sogou Explorer', y: 1.73, text: 'Sogou Explorer: 1.73%' },
                        { 'x': 'QQ', y: 3.96, text: 'QQ: 3.96%' },
                        { 'x': 'Safari', y: 4.73, text: 'Safari: 4.73%' },
                        { 'x': 'Internet Explorer', y: 6.12, text: 'Internet Explorer: 6.12%' },
                        { 'x': 'Edge', y: 7.48, text: 'Edge: 7.48%' },
                        { 'x': 'Others', y: 9.57, text: 'Others: 9.57%' }
                    ],
                dataLabel: {
                    visible: true, position: 'Outside', name: 'text', font: { fontWeight: '600' }, connectorStyle:{length:'20px', type: 'Curve'}
                },
                 xName: 'x', yName: 'y', startAngle: Browser.isDevice ? 55 : 35,  innerRadius: '0%',radius: Browser.isDevice ? '40%' : '70%',
                    explode: true, explodeOffset: '10%', explodeIndex: 0, name: 'Browser'
            }
        ],
        center: { x: '50%', y: '50%' },
        enableSmartLabels: true,
        enableBorderOnMouseMove: false,
        enableAnimation: true,
        legendSettings: { visible: false },
        // Initialize tht tooltip
        tooltip: {enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "", enableHighlight: true },
        title: 'Browser Market Share',
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
    });
    pie.appendTo('#container');
    

};