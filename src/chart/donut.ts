import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationTheme, AccumulationChart, AccumulationLegend, PieSeries, IAccLoadedEventArgs,
    AccumulationDataLabel, AccumulationTooltip
} from '@syncfusion/ej2-charts';
import { Browser, EmitType } from '@syncfusion/ej2/base';
import { IPointRenderEventArgs } from '@syncfusion/ej2/charts';
import { loadAccumulationChartTheme, donutPointRender } from './theme-color';
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
                dataSource: [{ x: 'Chrome', y: 63.5, text: 'Chrome: 63.5%' },
                { x: 'Safari', y: 25.0, text: 'Safari: 25.0%' },
                { x: 'Samsung Internet', y: 6.0, text: 'Samsung Internet: 6.0%' },
                { x: 'UC Browser', y: 2.5, text: 'UC Browser: 2.5%' },
                { x: 'Opera', y: 1.5, text: 'Opera: 1.5%' },
                { x: 'Others', y: 1.5, text: 'Others: 1.5%' }
                ], border: { width: 1, color: '#ffffff' },
                dataLabel: {
                    visible: true,
                    name: 'text',
                    position: 'Outside',
                    font: {
                        fontWeight: '600', size: Browser.isDevice ? '8px' : '12px'
                    },
                    connectorStyle:{length: Browser.isDevice ? '10px' : '20px', type: 'Curve'}
                },
                xName: 'x',
                yName: 'y', startAngle: Browser.isDevice ? 70 : 60, radius: Browser.isDevice ? '40%' : '75%',
                innerRadius: '65%', name: 'Project', explode: false, borderRadius: 3,
            }
        ],
        enableSmartLabels: true,
        centerLabel:{
            text : 'Mobile<br>Browser<br>Statistics<br>2024',
            hoverTextFormat: '${point.x} <br> Browser Share <br> ${point.y}%',
            textStyle: {
                fontWeight: '600',
                size: Browser.isDevice ? '8px' : '15px'
            },
          },
        enableBorderOnMouseMove:false,
        legendSettings: {
            visible: false, position: 'Top'
        },
        tooltip: { enable: true,
            enableHighlight: true,
            format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>',
            header:''},
        pointRender: donutPointRender,
         // custom code start
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
         // custom code end
    });
    pie.appendTo('#container');
};
