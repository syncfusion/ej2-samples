import { loadCultureFiles } from '../common/culture-loader';
import { ILoadedEventArgs, StripLineSettingsModel, StripLine, ChartTheme } from '@syncfusion/ej2-charts';
import { Chart, LineSeries, Category, Legend, Tooltip } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, Category, Legend, Tooltip, StripLine);
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Sample for Striplines
 */
let xAxisStripLine: StripLineSettingsModel[] = [
    {
        start: -1, end: 1.5, text: 'Winter', color: 'url(#winter)',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        start: 1.5, end: 3.5, text: 'Summer', color: 'url(#summer)',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        start: 3.5, end: 4.5, text: 'Spring', color: 'url(#spring)',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        start: 4.5, end: 5.5, text: 'Autumn', color: 'url(#autumn)',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        start: 5.5, end: 7, text: 'Winter', color: 'url(#winter)',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' },
        border: { width: 0 }, rotation: -90, visible: true
    }, {
        startFromAxis: true, size: 2, isSegmented: true, segmentStart: 22.5, text: 'Average Temperature',
        segmentEnd: 27.5, visible: false, color: '#fc902a',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 }, rotation: 0
    }, {
        start: 3.5, size: 3, isSegmented: true, segmentStart: 22.5, text: 'Average Temperature',
        segmentEnd: 27.5, visible: false, color: '#fc902a',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 }, rotation: 0
    }, {
        start: 1.5, size: 2, isSegmented: true, segmentStart: 32.5, text: 'High Temperature',
        segmentEnd: 37.5, visible: false, color: '#ff512f',
        textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 }, rotation: 0
    }
];
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', majorGridLines: { width: 0 },
            //Initializing Striplines
            stripLines: xAxisStripLine
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            minimum: 10, maximum: 40, interval: 5,
            lineStyle: { color: '#808080' }, labelFormat: '{value} °C', rangePadding: 'None',
            //Initializing Striplines
            stripLines: [
                {
                    start: 30, end: 40, text: 'High Temperature', color: '#ff512f', visible: false,
                    textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 },
                }, {
                    start: 20, end: 30, text: 'Average Temperature', color: '#fc902a', visible: false,
                    textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 },
                }, {
                    start: 10, end: 20, text: 'Low Temperature', visible: false,
                    textStyle: { size: '18px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 }, color: '#f9d423'
                }
            ]
        },
        //Initializing Chart Series
        series: [
            {
                dataSource: [
                    { x: 'Sun', y: 25 }, { x: 'Mon', y: 27 }, { x: 'Tue', y: 33 }, { x: 'Wed', y: 36 },
                    { x: 'Thu', y: 26 }, { x: 'Fri', y: 27.5 }, { x: 'Sat', y: 23 }],
                xName: 'x', width: 2, yName: 'y', fill: '#ffffff', type: 'Line', name: 'Weather',
                marker: { visible: true, width: 10, height: 10, border: { width: 2, color: '#ffffff' }, fill: '#666666' },
            },
        ],
        legendSettings: { visible: false },
        //Initializing Chart Title
        title: 'Weather Report',
        //Initializing User Interaction Tooltip
        tooltip: { enable: true },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    chart.appendTo('#container');
    let mode: DropDownList = new DropDownList({
        index: 0,
        width: 120,
        change: () => {
            chart.series[0].fill = 'white';
            chart.series[0].marker.fill = 'black';
            chart.series[0].marker.border.color = 'white';
            for (let i: number = 0; i < 3; i++) {
                chart.primaryYAxis.stripLines[i].visible = false;
            }
            if (mode.value === 'Vertical') {
                for (let i: number = 0; i <= 7; i++) {
                    chart.primaryXAxis.stripLines[i].visible = !chart.primaryXAxis.stripLines[i].isSegmented;
                }
            } else if (mode.value === 'Horizontal') {
                for (let i: number = 0; i < 3; i++) {
                    chart.primaryYAxis.stripLines[i].visible = true;
                }
                for (let i: number = 0; i <= 7; i++) {
                    chart.primaryXAxis.stripLines[i].visible = false;
                }
            } else {
                for (let i: number = 0; i <= 7; i++) {
                    chart.primaryXAxis.stripLines[i].visible = chart.primaryXAxis.stripLines[i].isSegmented;
                }
                chart.series[0].fill = 'black';
                chart.series[0].marker.fill = 'white';
                chart.series[0].marker.border.color = 'black';
            }
            chart.refresh();
        }
    });
    mode.appendTo('#selmode');
};