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
                    { x: 'China', y: 40, text: 'China: 40' },
                    { x: 'Japan', y: 20, text: Browser.isDevice ? 'Japan:<br> 20' : 'Japan: 20' },
                    { x: 'Australia', y: 18, text: Browser.isDevice ? 'Australia:<br> 18' : 'Australia: 18' },
                    { x: 'France', y: 16, text: 'France: 16' },
                    { x: 'Netherlands', y: 15, text: 'Netherlands: 15' },
                    { x: 'Great Britain', y: 14, text: 'Great Britain: 14' },
                    { x: 'South Korea', y: 13, text: 'South Korea: 13' },
                    { x: 'Germany', y: 12, text: Browser.isDevice ? 'Germany:<br> 12' : 'Germany: 12' },
                    { x: 'Italy', y: 12, text: Browser.isDevice ? 'Italy:<br> 12' : 'Italy: 12' },
                    { x: 'Canada', y: 9, text: Browser.isDevice ? 'CA: 9' : 'Canada: 9' },
                    { x: 'Hungary', y: 6, text: Browser.isDevice ? 'HU: 6' : 'Hungary: 6' },
                    { x: 'Spain', y: 5, text: 'Spain: 5' },
                    { x: 'Kenya', y: 4, text: 'Kenya: 4' },
                    { x: 'Brazil', y: 3, text: 'Brazil: 3' }
                ],
                animation: { enable: true }, 
                explode: true,
                dataLabel: {
                    visible: true,
                    name: 'text',
                    position: 'Outside',
                    connectorStyle: { type: 'Curve', length: Browser.isDevice ? '10px' : '20px' },
                    font: {
                         fontWeight: "600", size: Browser.isDevice ? '8px' : '13px'
                    }
                },
                radius:Browser.isDevice ? '40%'  : '55%' ,
                xName: 'x',
                yName: 'y',
                name:'Summer Olympics',
                groupTo: '9',
                groupMode: 'Point',
                startAngle: -20,
                endAngle: 340, borderRadius: 3, border: { width: 1, color: '#ffffff' },
                innerRadius: '0%',
            }
        ],
        enableSmartLabels: true,
        legendSettings: {
            visible: false,
        },
        //Initializing tooltip
        tooltip: {enable: true ,format:"<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>" , header:"", enableHighlight: true},
        enableBorderOnMouseMove:false,
        //Initializing title
        title: 'Summer Olympic 2024 - Gold Medals',
        subTitle: 'Source: wikipedia.org',
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