import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip,
    IAccTextRenderEventArgs, AccumulationTheme
} from '@syncfusion/ej2-charts';
import { IAccPointRenderEventArgs, IAccLoadedEventArgs, AccumulationDataLabel, GroupModes } from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);
import { DropDownList } from '@syncfusion/ej2-dropdowns';

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
                    { 'x': 'China', y: 26, text: 'China: 26' },
                    { 'x': 'Russia', y: 19, text: 'Russia: 19' },
                    { 'x': 'Germany', y: 17, text: 'Germany: 17' },
                    { 'x': 'Japan', y: 12, text: 'Japan: 12' },
                    { 'x': 'France', y: 10, text: 'France: 10' },
                    { 'x': 'South Korea', y: 9, text: 'South Korea: 9' },
                    { 'x': 'Great Britain', y: 27, text: 'Great Britain: 27' },
                    { 'x': 'Italy', y: 8, text: 'Italy: 8' },
                    { 'x': 'Australia', y: 8, text: 'Australia: 8' },
                    { 'x': 'Netherlands', y: 8, text: 'Netherlands: 8' },
                    { 'x': 'Hungary', y: 8, text: 'Hungary: 8' },
                    { 'x': 'Brazil', y: 7, text: 'Brazil: 7' },
                    { 'x': 'Spain', y: 7, text: 'Spain: 7' },
                    { 'x': 'Kenya', y: 6, text: 'Kenya: 6' },
                ],
                animation: { enable: true }, name: 'RIO',
                explode: true,
                dataLabel: {
                    visible: true,
                    position: 'Outside',
                    connectorStyle: { type: 'Line', length: '5%' },
                    font: {
                        size: '14px'
                    }
                },
                radius: '70%',
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
        tooltip: { enable: false },
        //Initializing title
        title: 'RIO Olympics Gold',
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
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
    document.getElementById('clubpoint').onpointermove = document.getElementById('clubpoint').ontouchmove =
        document.getElementById('clubpoint').onchange = (e: Event) => {
            clubchange(+(document.getElementById('clubpoint') as HTMLInputElement).value);
        };
};