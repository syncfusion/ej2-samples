import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationAnnotation, 
    IAccLoadedEventArgs, AccumulationTheme, AccumulationTooltip
} from '@syncfusion/ej2-charts';
import { checkBrowserInfo } from '@syncfusion/ej2/diagrams';
import { Browser } from '@syncfusion/ej2/base';
import { loadAccumulationChartTheme } from './theme-color';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationAnnotation, AccumulationTooltip);

/**
 * Sample fro Semi Pie chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let pie: AccumulationChart = new AccumulationChart({
        //Initializing Series
        annotations: [{
            content:  Browser.isDevice ? "<div style='font-Weight:700; font-size:11px;'>Browser<br>Market<br>Shares</div>" : "<div style='font-Weight:600; font-size:14px;'>Browser<br>Market<br>Shares</div>",
            region: "Series",
            x: Browser.isDevice ? "52%" :"50%",
            y:Browser.isDevice ? "82%" : "85%"
        }],
        series: [
            {
                dataSource: [
                    { x: 'Chrome', y: 100, text: 'Chrome (100M)<br>40%', tooltipMappingName: '40%' },
                    { x: 'UC Browser', y: 40, text: 'UC Browser (40M)<br>16%', tooltipMappingName: '16%' },
                    { x: 'Opera', y: 30, text: 'Opera (30M)<br>12%', tooltipMappingName: '12%' },
                    { x: 'Safari', y: 30, text: 'Safari (30M)<br>12%', tooltipMappingName: '12%' },
                    { x: 'Firefox', y: 25, text: 'Firefox (25M)<br>10%', tooltipMappingName: '10%' },
                    { x: 'Others', y: 25, text: 'Others (25M)<br>10%', tooltipMappingName: '10%' }
                ],
                xName: 'x', 
                yName: 'y',
                startAngle: 270,
                endAngle: 90,
                explode: false,radius : Browser.isDevice ? '85%' : '100%',
                innerRadius: '40%', tooltipMappingName: 'tooltipMappingName',
                dataLabel: {
                    visible: true, position: 'Inside' ,
                    connectorStyle: { length: '10%' }, name: 'text', enableRotation:true,
                    font: { fontWeight: '600' ,size: Browser.isDevice ? '8px' : '11px', color: '#ffffff'}
                },
            }
        ],
        enableAnimation: false,
        enableBorderOnMouseMove:false,
        //Initializing Tooltip
        tooltip: { enable: true, enableHighlight: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.tooltip}</b>' },
        legendSettings: {
            visible: false,
        },
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
    });
    pie.appendTo('#container');
};