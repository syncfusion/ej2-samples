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
            content: (Browser.isDevice) ? " " : "<div style='font-Weight:600;font-size:14px'>Internet Users <br> by Country<br>2025</div>" ,
            region:"Series",
            x:"50%",
            y:"50%"
        }],
        // Initialize the chart series
        series: [
            {
                dataSource: [
                    { 'x': 'China', y: 35, text: '35%' },
                    { 'x': 'India', y: 30, text: '30%' },
                    { 'x': 'USA', y: 10.7, text: '10.7%' },
                    { 'x': 'Indonesia', y: 7, text: '7%' },
                    { 'x': 'Brazil', y: 5.3, text: '5.3%' },
                    { 'x': 'Others', y: 12, text: '12%' },
                ],
                xName: 'x', yName: 'y',explodeIndex:0,explode:false,
                innerRadius: '50%', borderRadius: 3, border: { color: '#ffffff', width: 1 },
                dataLabel: {
                    visible: false
                }
            }
        ],
        selectionMode: 'Point',
        legendSettings: {
            visible: true, toggleVisibility: false,
            position: 'Bottom', textWrap: 'Wrap'
        },
        enableBorderOnMouseMove:false,
        // Triggered animation complete, text render and load event
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        },
        tooltip: { enable: true, format: '<b>${point.x}</b><br>Percentage: <b>${point.y}%</b>',header:""  },
    });
    pie.appendTo('#donut-container'); 
};