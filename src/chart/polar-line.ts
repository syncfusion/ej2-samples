import {
    Chart, Tooltip, Legend, PolarSeries, RadarSeries, Category, LineSeries, ChartDrawType, ILoadedEventArgs,
    ChartTheme
} from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(Tooltip, Legend, PolarSeries, Category, LineSeries, RadarSeries);

/**
 * Sample for Polar Series with DrawType Line
 */
this.default = (): void => {
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Months',
            valueType: 'Category',
            labelPlacement: 'OnTicks',
            interval: 1,
            coefficient: Browser.isDevice ? 80 : 100
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Temperature (Celsius)',
            minimum: -25, maximum: 25, interval: 10,
            edgeLabelPlacement: 'Shift',
            labelFormat: '{value}°C'
        },
        //Initializing Chart Series
        series: [
            {
                dataSource: [
                    { x: 'Jan', y: -7.1 }, { x: 'Feb', y: -3.7 },
                    { x: 'Mar', y: 0.8 }, { x: 'Apr', y: 6.3 },
                    { x: 'May', y: 13.3 }, { x: 'Jun', y: 18.0 },
                    { x: 'Jul', y: 19.8 }, { x: 'Aug', y: 18.1 },
                    { x: 'Sep', y: 13.1 }, { x: 'Oct', y: 4.1 },
                    { x: 'Nov', y: -3.8 }, { x: 'Dec', y: -6.8 },
                ],
                xName: 'x', width: 2, yName: 'y', name: 'Warmest', type: 'Polar',
                marker: {
                    visible: true,
                    height: 10, width: 10,
                    shape: 'Pentagon',
                }
            }, {
                dataSource: [
                    { x: 'Jan', y: -17.4 }, { x: 'Feb', y: -15.6 },
                    { x: 'Mar', y: -12.3 }, { x: 'Apr', y: -5.3 },
                    { x: 'May', y: 1.0 }, { x: 'Jun', y: 6.9 },
                    { x: 'Jul', y: 9.4 }, { x: 'Aug', y: 7.6 },
                    { x: 'Sep', y: 2.6 }, { x: 'Oct', y: -4.9 },
                    { x: 'Nov', y: -13.4 }, { x: 'Dec', y: -16.4 },
                ],
                xName: 'x', width: 2, yName: 'y', name: 'Coldest', type: 'Polar',
                marker: {
                    visible: true, height: 10, width: 10, shape: 'Diamond',
                }
            }
        ],
        //Initializing Chart title
        title: 'Alaska Weather Statistics - 2016',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }
    });
    chart.appendTo('#container');
    document.getElementById('isClosed').onchange = () => {
        let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('isClosed'));
        chart.series[0].isClosed = element.checked;
        chart.series[1].isClosed = element.checked;
        chart.series[0].animation.enable = false;
        chart.series[1].animation.enable = false;
        chart.refresh();
    };
    let polarType: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].type = <ChartDrawType>polarType.value;
            chart.series[1].type = <ChartDrawType>polarType.value;
            chart.series[0].animation.enable = true;
            chart.series[1].animation.enable = true;
            chart.refresh();
        }
    });
    polarType.appendTo('#SelectSeriesType');
    document.getElementById('startangle').onpointermove = document.getElementById('startangle').ontouchmove =
        document.getElementById('startangle').onchange = () => {
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('startangle'));
            chart.primaryXAxis.startAngle = parseInt(element.value, 10);
            document.getElementById('startAngleValue').innerHTML = parseInt(element.value, 10) + '';
            chart.refresh();
        };
    document.getElementById('isinversed').onchange = () => {
        let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('isinversed'));
        chart.primaryXAxis.isInversed = element.checked;
        chart.primaryYAxis.isInversed = element.checked;
        chart.dataBind();
    };
};