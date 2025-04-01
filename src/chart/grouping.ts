import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationChart, AccumulationLegend, PieSeries, 
    IAccTextRenderEventArgs, AccumulationTheme
} from '@syncfusion/ej2-charts';
import { IAccPointRenderEventArgs, IAccLoadedEventArgs,AccumulationTooltip, AccumulationDataLabel, GroupModes } from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2/base';
import { loadAccumulationChartTheme } from './theme-color';

/**
 * Sample for grouping in Pie chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let pie: AccumulationChart = new AccumulationChart({
        //Initializing Series
        series: [
            {
                dataSource: [
                    { 'x': 'Australia', y: 26, text: 'Australia: 26' },
                    { 'x': 'Russia', y: 19, text: 'Russia: 19' },
                    { 'x': 'Germany', y: 17, text: 'Germany: 17' },
                    { 'x': 'Japan', y: 12, text: 'Japan: 12' },
                    { 'x': 'China', y: 10, text: 'China: 10' },
                    { 'x': 'South Korea', y: 9, text: 'South Korea: 9' },
                    { 'x': 'Great Britain', y: 27, text: 'Great Britain: 27' },
                    { 'x': 'Italy', y: 8, text: 'Italy: 8' },
                    { 'x': 'France', y: 8, text: 'France: 8' },
                    { 'x': 'Spain', y: 7, text: 'Spain: 7' },
                    { 'x': 'Hungary', y: 8, text: 'Hungary: 8' },
                    { 'x': 'Brazil', y: 7, text: 'Brazil: 7' },
                    { 'x': 'Netherlands', y: 8, text: 'Netherlands: 8' },
                    { 'x': 'Kenya', y: 6, text: 'Kenya: 6' },
                ],
                animation: { enable: true }, 
                explode: true,
                dataLabel: {
                    visible: true,
                    position: 'Outside',
                    connectorStyle: { type: 'Curve', length: '20px' },
                    font: {
                         fontWeight: "600"
                    }
                },
                radius:Browser.isDevice ? '40%'  : '70%' ,
                xName: 'x',
                yName: 'y',
                groupTo: '9',
                groupMode: 'Point',
                startAngle: 0,
                endAngle: 360,
                innerRadius: '0%',
            }
        ],
        pointRender: (args: IAccPointRenderEventArgs) => {
            if (args.point.isClubbed || args.point.isSliced) {
                args.fill = '#D3D3D3';
            }
        },
        enableSmartLabels: true,
        legendSettings: {
            visible: false,
        },
        textRender: (args: IAccTextRenderEventArgs) => {
            args.text = args.point.x + ' ' + args.point.y;
        },
        //Initializing tooltip
        tooltip: {enable: true ,format:"<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>" , header:"", enableHighlight: true},
        enableBorderOnMouseMove:false,
        //Initializing title
        title: 'Rio Olympic Gold Medals',
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
    });
    pie.appendTo('#container');
    let mode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            let currentValue: number = mode.value === 'Point' ? 9 : 8;
            (document.getElementById('clubpoint') as HTMLInputElement).value =  currentValue.toString();
            pie.series[0].groupMode = <GroupModes>mode.value;
            clubchange(currentValue);
        }
    });
    mode.appendTo('#mode');
    function clubchange(value: number): void {
        pie.series[0].groupTo = value.toString();
        pie.series[0].animation.enable = false;
        document.getElementById('clubvalue').innerHTML = value.toString();
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    document.getElementById('clubpoint').ontouchmove =
        document.getElementById('clubpoint').onchange = (e: Event) => {
            clubchange(+(document.getElementById('clubpoint') as HTMLInputElement).value);
        };
};