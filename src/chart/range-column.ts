import { loadCultureFiles } from '../common/culture-loader';
import { Chart, RangeColumnSeries, Category, Tooltip,  ILoadedEventArgs, ChartTheme, DataLabel } from '@syncfusion/ej2-charts';
Chart.Inject(RangeColumnSeries, Category, Tooltip,  DataLabel);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for RangeColumn series 
 */ 
(window as any).default = (): void => {
    loadCultureFiles();

    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            labelFormat: '{value}˚C',
            maximum: 20,
            edgeLabelPlacement: 'Shift',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            title:'Temperature (In Celsius)'
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'RangeColumn', name: 'India', xName: 'x', high: 'high', low: 'low',columnSpacing:0.1,
                marker:{
                    dataLabel: {
                       visible: true,
                       position: 'Outer',
                   }
               },
                dataSource: [
                    { x: 'Sun', low: 3.1, high: 10.8 },
                    { x: 'Mon', low: 5.7, high: 14.4 }, { x: 'Tue', low: 8.4, high: 16.9 },
                    { x: 'Wed', low: 9.6, high: 18.2 },
                    { x: 'Thu', low: 8.5, high: 16.1 }, { x: 'Fri', low: 6.0, high: 12.5 },
                    { x: 'Sat', low: 1.5, high: 6.9 }
                ],
            },
        ],
        tooltip: {
            enable: true,
            header: "<b>${point.x}</b>",
            format: "Temperature : <b>${point.low} - ${point.high}</b>"
        },
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart Title
        title: 'Temperature Variation by Week',
        legendSettings: {visible:false},
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    chart.appendTo('#container');
};
