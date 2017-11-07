import { Chart, PolarSeries, Category, Tooltip, ILoadedEventArgs, RadarSeries, ChartDrawType, ChartTheme } from '@syncfusion/ej2-charts';
Chart.Inject(PolarSeries, Category, Tooltip, RadarSeries);
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Polar Series DrawType RangeColumn Sample
 */
this.default = (): void => {

    let chart: Chart = new Chart({


        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            title: 'Months',
            labelPlacement: 'OnTicks',
            startAngle: 90
        },

        //Initializing Primary Y Axis
        primaryYAxis: {
            labelFormat: '{value}˚C',
            minimum: 0, maximum: 20, interval: 5
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Polar', drawType: 'RangeColumn', name: 'Germany', xName: 'x', high: 'high', low: 'low',
                dataSource: [
                    { x: 'Jan', low: 2.7, high: 7.1 }, { x: 'Feb', low: 3.9, high: 7.7 },
                    { x: 'Mar', low: 3.2, high: 7.5 }, { x: 'Apr', low: 4.5, high: 9.8 },
                    { x: 'May', low: 6.7, high: 11.4 }, { x: 'June', low: 8.4, high: 14.4 },
                    { x: 'July', low: 11.6, high: 17.2 }, { x: 'Aug', low: 12.7, high: 17.9 },
                    { x: 'Sep', low: 9.5, high: 15.1 }, { x: 'Oct', low: 5.0, high: 10.5 },
                    { x: 'Nov', low: 3.2, high: 7.9 }, { x: 'Dec', low: 6.1, high: 9.1 }
                ],
                border: { width: 3, color: 'white' },
            },
        ],
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true
        },
        legendSettings: { visible: false },
        //Initializing Chart Title
        title: 'Maximum and Minimum Temperature',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }
    });
    chart.appendTo('#container');
    let polarType: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].type = <ChartDrawType>polarType.value;
            chart.series[0].animation.enable = true;
            chart.refresh();
        }
    });
    polarType.appendTo('#SelectSeriesType');
};
