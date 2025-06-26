import { loadCultureFiles } from '../common/culture-loader';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip,
    AccumulationDataLabel, IAccLoadedEventArgs, AccumulationTheme
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
import { loadAccumulationChartTheme } from './theme-color';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);
/**
 * Sample for Pie with Various Radius
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let pie: AccumulationChart = new AccumulationChart({
        // Initialize the chart series
        series: [
            {
                dataSource: [
                    { x: 'Cuba', y: 103800, r: '106', text: 'CUB'},
                    { x: 'Syria', y: 185178, r: '133', text: 'SYR'},
                    { x: 'Benin', y: 112760, r: '128', text: 'BEN'},
                    { x: 'Portugal', y: 91606, r: '114', text: 'POR'},
                    { x: 'Austria', y: 82520, r: '111', text: 'AUS'},
                    { x: 'Honduras', y: 111890, r: '97',text: 'HON'},
                    { x: 'Azerbaijan', y: 82650, r: '125' , text: 'AZE'}
                ],
                radius: 'r', xName: 'x',tooltipMappingName:'r',
                yName: 'y', innerRadius: '20%', borderRadius: 3, 
                border: { color: '#ffffff', width: 1},
                dataLabel: {
                    visible: true, position: Browser.isDevice ? 'Inside' : 'Outside',
                    name: Browser.isDevice ? 'text' : 'x', textWrap: Browser.isDevice ? 'Wrap' : 'Normal',
                    font: { size: Browser.isDevice ? '7px' : '12px', fontWeight: '600' } ,
                    connectorStyle:{type: 'Curve', length: Browser.isDevice ? '10px' : '20px'}
                },
            },
        ],
        enableSmartLabels: true,
        enableBorderOnMouseMove:false,
        title:'Global Distribution of Population and Land Area by Country - 2025',
        subTitle: 'Source: wikipedia.org',
        legendSettings: {
            visible: false
        },
        // Initialize tht tooltip
        tooltip: {enable: true, format:'<b>${point.x}</b><br/>Area in square km: <b>${point.y} </b> <br/> Population density per square km: <b>${point.tooltip}</b>', enableHighlight: true},
        enableAnimation: true,
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
    });
    pie.appendTo('#container');
};
