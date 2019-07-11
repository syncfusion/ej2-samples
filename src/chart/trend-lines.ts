import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, Category, Tooltip, ILoadedEventArgs, ChartTheme,
    Trendlines, ScatterSeries, SplineSeries, LineSeries, TrendlineTypes
} from '@syncfusion/ej2-charts';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
Chart.Inject(Category, Tooltip, ScatterSeries, SplineSeries, LineSeries, Trendlines);
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Samples for Trend Lines
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
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: { majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' },
        primaryYAxis: {
            title: 'Rupees against Dollars',
            interval: 10, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
        },
        //Initializing Chart Series
        series: [{
            dataSource: series1, xName: 'x', yName: 'y', name: 'Rupees', type: 'Spline', marker: { visible: true },
            //Initializing TrendLines
            trendlines: [{ type: 'Linear', width: 3, name: 'Linear',  fill:  '#C64A75' }]
        }],
        //Initializing User Interaction Tooltip
        tooltip: { enable: true },  //Initializing Chart Title
        title: 'Historical Indian Rupee Rate (INR/USD)',
        legendSettings: { visible: false }, chartArea: { border: { width: 0 } },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
        }
    });
    chart.appendTo('#container');
    let forward: NumericTextBox = new NumericTextBox({
        value: 0, min: 1, max: 20, width: 120, step: 1,
        change: () => {
            chart.series[0].animation.enable = false;
            chart.series[0].trendlines[0].forwardForecast = forward.value;
            chart.refresh();
        }
    });
    forward.appendTo('#forwardForecast');
    let backward: NumericTextBox = new NumericTextBox({
        value: 0, min: 1, max: 20, width: 120, step: 1, change: () => {
            chart.series[0].animation.enable = false;
            chart.series[0].trendlines[0].backwardForecast = backward.value;
            chart.refresh();
        }
    });
    backward.appendTo('#backwardForecast');
    let polynomial: NumericTextBox = new NumericTextBox({
        value: 0, min: 1, max: 20, width: 120, step: 1, enabled: false,
        change: () => {
            chart.series[0].animation.enable = false;
            chart.series[0].trendlines[0].polynomialOrder = polynomial.value;
            chart.refresh();
        }
    });
    polynomial.appendTo('#polynomialOrder');
    let periodValue: NumericTextBox = new NumericTextBox({
        value: 0, min: 1, max: 20, width: 120, step: 1, enabled: false,
        change: () => {
            chart.series[0].animation.enable = false;
            chart.series[0].trendlines[0].period = periodValue.value;
            chart.refresh();
        }
    });
    periodValue.appendTo('#period');
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
            forward.enabled = !forwardForecast;
            backward.enabled = !backwardForecast;
            polynomial.enabled = !polynomialOrder;
            periodValue.enabled = !period;
            chart.refresh();
        }
    });
    trend.appendTo('#trendLineType');
};