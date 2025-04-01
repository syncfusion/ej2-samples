import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip,
    IAccTextRenderEventArgs, AccumulationSelection, AccumulationAnnotation, IAccLoadedEventArgs, IAccPointRenderEventArgs
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationAnnotation, AccumulationDataLabel, AccumulationTooltip, AccumulationSelection);
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { loadAccumulationChartTheme, pieLegendPointRender } from './theme-color';

/**
 * Sample for Doughnut
 */
let fluent2Colors: string[] = ["#6200EE", "#09AF74", "#0076E5", "#CB3587", "#E7910F", "#66CD15", "#F3A93C", "#107C10",
    "#C19C00"];

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let count: number = 0;
    let pie: AccumulationChart = new AccumulationChart({
        enableSmartLabels: true,
        annotations: [{
            content: (Browser.isDevice) ? " " : "<div style='font-Weight:600;font-size:14px'>Browser<br>Market<br>Share</div>" ,
            region:"Series",
            x:"52%",
            y:"50%"
        }],
        // Initialize the chart series
        series: [
            {
                dataSource: [
                    { 'x': 'Chrome', y: 57.28, text: '57.28%' },
                    { 'x': 'UC Browser', y: 4.37, text: '4.37%' },
                    { 'x': 'Internet Explorer', y: 6.12, text: '6.12%' },
                    { 'x': 'QQ', y: 5.96, text: '5.96%' },
                    { 'x': 'Edge', y: 7.48, text: '7.48%' },
                    { 'x': 'Others', y: 14.06, text: '18.76%' },
                ],
                xName: 'x', yName: 'y', startAngle: 30,explodeIndex:0,explode:false,
                innerRadius: '50%', explodeOffset: '10%', radius: Browser.isDevice ? '80%' : '85%',
                dataLabel: {
                    visible: true, position: 'Inside',
                    font: { fontWeight: '600', color: '#ffffff' }, name: 'y', connectorStyle: { length: '20px', type: 'Curve' }
                }
            }
        ],
        pointRender: pieLegendPointRender,
        title:Browser.isDevice ? "Browser Market Share" : '',
        legendSettings: {
            visible: true, toggleVisibility: false,
            position: 'Bottom',
            maximumColumns: Browser.isDevice ? 2 : 3,
            fixedWidth: true
        },
        enableBorderOnMouseMove:false,center:{ x: '50%', y: '50%'},
        textRender: (args: IAccTextRenderEventArgs) => {
            args.series.dataLabel.font.size = getFontSize(pie.initialClipRect.width);
            args.text = args.text + '%';
        },
        // Triggered animation complete, text render and load event
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        },
        tooltip: { enable: true, enableHighlight: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>',header:""  },
    });
    pie.appendTo('#donut-container'); 
    function getFontSize(width: number): string {
        if (width > 300) {
            return '13px';
        } else if (width > 250) {
            return '8px';
        } else {
            return '6px';
        }
    }
};