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
                dataSource: 
                    [
                        { 'x': 'Coal', y: 34.4, text: 'Coal: 34.4%' },
                        { 'x': 'Natural Gas', y: 22.1, text: 'Natural Gas: 22.1%' },
                        { 'x': 'Hydro', y: 14.4, text: 'Hydro: 14.4%' },
                        { 'x': 'Nuclear', y: 9.0, text: 'Nuclear: 9.0%' },
                        { 'x': 'Wind', y: 8.1, text: 'Wind: 8.1%' },
                        { 'x': 'Others', y: 12.0, text: 'Others: 12.0%' }
                    ],
                dataLabel: {
                    visible: true, position: 'Outside', name: 'text', font: { size: Browser.isDevice ? '8px' : '12px', fontWeight: '600' }, connectorStyle:{length: Browser.isDevice ? '10px' : '20px', type: 'Curve'}
                },
                border: { color: 'white', width: 1 },
                 xName: 'x', yName: 'y', startAngle: Browser.isDevice ? 70 : 30,  innerRadius: '0%',radius: Browser.isDevice ? '40%' : '60%',
                    explode: true, explodeOffset: '10%', explodeIndex: 0, name: 'Browser', borderRadius: 3
            }
        ],
        enableBorderOnMouseMove: false,
        enableAnimation: true,
        legendSettings: { visible: false },
        // Initialize tht tooltip
        tooltip: {enable: true, format: '<b>${point.x}</b><br>Percentage: <b>${point.y}%</b>', header: "", enableHighlight: true },
        title: 'Global Electricity Generation by Source - 2024',
        subTitle: 'Source: wikipedia.org',
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
    });
    pie.appendTo('#container');
    

};