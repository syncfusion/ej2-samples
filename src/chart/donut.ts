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
                dataSource: [{ x: 'Chrome', y: 61.3, text: Browser.isDevice? 'Chrome:<br> 61.3%' : 'Chrome: 61.3%' },
                { x: 'Safari', y: 24.6, text: Browser.isDevice? 'Safari:<br> 24.6%' : 'Safari: 24.6%' },
                { x: 'Edge', y: 5.0, text: 'Edge: 5.0%' },
                { x: 'Samsung Internet', y: 2.7, text: Browser.isDevice? 'Samsung<br> Internet: 2.7%' : 'Samsung Internet: 2.7%' },
                { x: 'Firefox', y: 2.6, text: Browser.isDevice? 'Firefox:<br> 2.6%' : 'Firefox: 2.6%' },
                { x: 'Others', y: 3.6, text: Browser.isDevice? 'Others:<br> 3.6%' : 'Others: 3.6%' }
                ], border: { width: 1 },
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
                yName: 'y', startAngle: Browser.isDevice ? 30 : 62, radius: Browser.isDevice ? '40%' : '75%',
                innerRadius: '65%', name: 'Project'
            }
        ],
        enableSmartLabels: true,
        centerLabel:{
            text : 'Mobile<br>Browsers<br>Statistics',
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
        pointRender: donutPointRender,
         // custom code start
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
         // custom code end
    });
    pie.appendTo('#container');
};
