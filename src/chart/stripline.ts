import { Chart, LineSeries, Category, Legend, Tooltip, ILoadedEventArgs, StripLine, ChartTheme } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, Category, Legend, Tooltip, StripLine);
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Sample for Striplines
 */
this.default = (): void => {
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', majorGridLines: { width: 0 },
            //Initializing Striplines
            stripLines: [
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
                }
            ]
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
                    { x: 'Sun', y: 28 }, { x: 'Mon', y: 27 }, { x: 'Tue', y: 33 }, { x: 'Wed', y: 36 },
                    { x: 'Thu', y: 28 }, { x: 'Fri', y: 30 }, { x: 'Sat', y: 31 }],
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
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }
    });
    chart.appendTo('#container');
    let mode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            if (mode.value === 'Vertical') {
                for (let i: number = 0; i < 3; i++) {
                    chart.primaryYAxis.stripLines[i].visible = false;
                }
                for (let i: number = 0; i <= 4; i++) {
                    chart.primaryXAxis.stripLines[i].visible = true;
                }
            } else {
                for (let i: number = 0; i < 3; i++) {
                    chart.primaryYAxis.stripLines[i].visible = true;
                }
                for (let i: number = 0; i <= 4; i++) {
                    chart.primaryXAxis.stripLines[i].visible = false;
                }
            }
            chart.refresh();
        }
    });
    mode.appendTo('#selmode');
};