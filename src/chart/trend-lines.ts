import {
    Chart, Category, Tooltip, ILoadedEventArgs, ChartTheme,
    Trendlines, ScatterSeries, SplineSeries, LineSeries, TrendlineTypes
} from '@syncfusion/ej2-charts';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
Chart.Inject(Category, Tooltip, ScatterSeries, SplineSeries, LineSeries, Trendlines);
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Trend Lines Sample
 */
let series1: Object[] = [];
let yValue: number[] = [7.66, 8.03, 8.41, 8.97, 8.77, 8.20, 8.16, 7.89, 8.68, 9.48, 10.11, 11.36, 12.34, 12.60, 12.95,
    13.91, 16.21, 17.50, 22.72, 28.14, 31.26, 31.39, 32.43, 35.52, 36.36,
    41.33, 43.12, 45.00, 47.23, 48.62, 46.60, 45.28, 44.01, 45.17, 41.20, 43.41, 48.32, 45.65, 46.61, 53.34, 58.53];
let point1: Object; let i: number; let j: number = 0;
for (i = 1973; i <= 2013; i++) {
    point1 = { x: i, y: yValue[j] };
    series1.push(point1); j++;
}
let powerData: object[] = [
    { x: 1, y: 10 }, { x: 2, y: 50 }, { x: 3, y: 80 }, { x: 4, y: 110 },
    { x: 5, y: 180 }, { x: 6, y: 220 }, { x: 7, y: 300 }, { x: 8, y: 370 }, { x: 9, y: 490 }, { x: 10, y: 500 }
];
this.default = (): void => {
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: { majorGridLines: { width: 0 } },
        primaryYAxis: {
            title: 'Rupees against Dollars',
            interval: 10, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
        },
        //Initializing Chart Series
        series: [{
            dataSource: series1, xName: 'x', yName: 'y',
            name: 'Apple Inc', fill: '#0066FF', type: 'Scatter',
            //Initializing TrendLines
            trendlines: [{ type: 'Linear', width: 3, marker: { visible: false }, name: 'Linear' }]
        }],
        //Initializing User Interaction Tooltip
        tooltip: { enable: true },
        //Initializing Chart Title
        title: 'Historical Indian Rupee Rate (INR USD)',
        legendSettings: { visible: false }, chartArea: { border: { width: 0 } },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
    });
    chart.appendTo('#container');
    let trend: DropDownList = new DropDownList({
        index: 0, width: 120,
        change: () => {
            chart.series[0].animation.enable = false;
            chart.series[0].dataSource = [];
            chart.series[0].trendlines[0].type = <TrendlineTypes>trend.value;
            chart.series[0].trendlines[0].name = <TrendlineTypes>trend.value;
            let forwardForecast: boolean; let backwardForecast: boolean; let polynomialOrder: boolean; let period: boolean;
            if (trend.value !== 'Power') {
                chart.series[0].dataSource = series1; chart.series[0].name = 'Rupees';
                chart.primaryXAxis.title = ''; chart.primaryYAxis.interval = 10;
                chart.primaryYAxis.title = 'Rupees against Dollars';
                chart.title = 'Historical Indian Rupee Rate (INR USD)';
                if (trend.value === 'MovingAverage') {
                    chart.series[0].trendlines[0].marker.visible = false;
                }
            } else {
                chart.series[0].dataSource = powerData; chart.series[0].name = 'Meters';
                chart.primaryXAxis.title = 'Seconds'; chart.primaryYAxis.title = 'Meters';
                chart.primaryYAxis.interval = 100; chart.title = 'Distance Measurement';
            }
            if (trend.value !== 'Polynomial' && trend.value !== 'MovingAverage') {
                period = polynomialOrder = true; forwardForecast = backwardForecast = false;
            } else if (trend.value === 'MovingAverage') {
                period = false; forwardForecast = backwardForecast = polynomialOrder = true;
            } else {
                forwardForecast = backwardForecast = polynomialOrder = false; period = true;
            }
            (<HTMLInputElement>document.getElementById('forwardForecast')).disabled = forwardForecast;
            (<HTMLInputElement>document.getElementById('backwardForecast')).disabled = backwardForecast;
            (<HTMLInputElement>document.getElementById('polynomialOrder')).disabled = polynomialOrder;
            (<HTMLInputElement>document.getElementById('period')).disabled = period;
            chart.refresh();
        }
    });
    trend.appendTo('#trendLineType');
    let forwardForecast: NumericTextBox = new NumericTextBox({
        value: 0, min: 1, max: 20, width: 120, step: 1,
        change: () => {
            chart.series[0].animation.enable = false;
            chart.series[0].trendlines[0].forwardForecast = forwardForecast.value;
            chart.refresh();
        }
    });
    forwardForecast.appendTo('#forwardForecast');
    let backwardForecast: NumericTextBox = new NumericTextBox({
        value: 0, min: 1, max: 20, width: 120, step: 1, change: () => {
            chart.series[0].animation.enable = false;
            chart.series[0].trendlines[0].backwardForecast = backwardForecast.value;
            chart.refresh();
        }
    });
    backwardForecast.appendTo('#backwardForecast');
    let polynomialOrder: NumericTextBox = new NumericTextBox({
        value: 0, min: 1, max: 20, width: 120, step: 1,
        change: () => {
            chart.series[0].animation.enable = false;
            chart.series[0].trendlines[0].polynomialOrder = polynomialOrder.value;
            chart.refresh();
        }
    });
    polynomialOrder.appendTo('#polynomialOrder');
    let period: NumericTextBox = new NumericTextBox({
        value: 0, min: 1, max: 20, width: 120, step: 1,
        change: () => {
            chart.series[0].animation.enable = false;
            chart.series[0].trendlines[0].period = period.value;
            chart.refresh();
        }
    });
    period.appendTo('#period');
    (<HTMLInputElement>document.getElementById('polynomialOrder')).disabled = true;
    (<HTMLInputElement>document.getElementById('period')).disabled = true;
};