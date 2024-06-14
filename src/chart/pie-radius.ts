import { loadCultureFiles } from '../common/culture-loader';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip,
    AccumulationDataLabel, IAccLoadedEventArgs, AccumulationTheme
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
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
                    { x: 'Argentina', y: 505370, r: Browser.isDevice ? '110' : '100', text: 'Argentina'},
                    { x: 'Belgium', y: 551500, r: Browser.isDevice ? '120' : '118.7', text: 'Belgium' },
                    { x: 'Dominican Republic', y: 312685, r: '137.5', text: Browser.isDevice ? 'Dominican <br> Republic' :  'Dominican Republic'  },
                    { x: 'Cuba', y: 350000, r: '124.6', text: 'Cuba' },
                    { x: 'Egypt', y: 301000, r: '150.8', text: 'Egypt' },
                    { x: 'Kazakhstan', y: 300000, r: '155.5',text: 'Kazakhstan'   },
                    { x: 'Somalia', y: 357022, r: '160.6' , text: 'Somalia' }
                ],
                radius: 'r', xName: 'x',tooltipMappingName:'r',
                yName: 'y', innerRadius: '20%',
                dataLabel: {
                    visible: true, position: Browser.isDevice ? 'Inside' : 'Outside',
                    name: 'text',enableRotation: true,
                    font: { fontWeight: '600' } ,
                    connectorStyle:{type: 'Curve', length:'20px'}
                },
            },
        ],
        enableSmartLabels: true,
        enableBorderOnMouseMove:false,
        title:'Pie with different Radius',
        legendSettings: {
            visible: true,
            reverse: true
        },
        // Initialize tht tooltip
        tooltip: {enable: true, format:'<b>${point.x}</b><br/>Area in square km: <b>${point.y} </b> <br/> Population density per square km: <b>${point.tooltip}</b>'},
        enableAnimation: true,
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    pie.appendTo('#container');
};
