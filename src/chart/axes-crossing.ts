import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { Chart, LineSeries, ScatterSeries, SplineSeries, Tooltip, Legend, ILoadedEventArgs, ChartTheme, Highlight } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, ScatterSeries, SplineSeries, Tooltip, Legend, Highlight);

/**
 * Axes Crossing Sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        primaryXAxis: {
            minimum: -8, maximum: 8, interval: 2,
            valueType: 'Double',
            lineStyle: {
                width: 2
            },
            minorTickLines: { width: 0 },
            majorTickLines: { width: 0 },
            crossesAt: 0,
            minorTicksPerInterval: 3
        },
        primaryYAxis: {
            minimum: -8, maximum: 8, interval: 2,
            lineStyle: {
                width: 2
            },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            crossesAt: 0,
            minorTicksPerInterval: 3,
        },
        series: [
            {
                type: 'Line',
                dataSource: [
                    { x: -6, y: 2 }, { x: -5, y: 0 }, { x: -4.511, y: -0.977 }, { x: -3, y: -4 }, { x: -1.348, y: -1.247 },
                    { x: -0.6, y: 0 }, { x: 0, y: 1 }, { x: 1.5, y: 3.5 }, { x: 6, y: 4.5 },
                ],
                fill: 'Blue', name: 'Linear Interpolation',
                enableTooltip: false, xName: 'x', width: 2, yName: 'y',
            },
            {
                type: 'Spline',
                dataSource: [
                    { x: -6, y: 2 }, { x: -5.291, y: 0 }, { x: -5, y: -0.774 }, { x: -3, y: -4 }, { x: -0.6, y: -0.965 },
                    { x: -0.175, y: 0 }, { x: 0, y: 0.404 }, { x: 1.5, y: 3.5 }, { x: 3.863, y: 5.163 }, { x: 6, y: 4.5 },
                ],
                fill: 'Green', name: 'Cubic Spline Interpolation',
                xName: 'x', width: 2, enableTooltip: false, yName: 'y',
            }, {
                type: 'Scatter',
                dataSource: [
                    { x: -6, y: 2 }, { x: -3, y: -4 }, { x: 1.5, y: 3.5 }, { x: 6, y: 4.5 },
                ],
                fill: 'Red', name: 'Data Points', xName: 'x', width: 2,
                yName: 'y', marker: { visible: false, width: 7, height: 7 }
            }
        ],
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        },
        tooltip: { enable: true },
        legendSettings: { enableHighlight: true },
        title: 'Spline Interpolation',
    });
    chart.appendTo('#container');
    let axes: DropDownList = new DropDownList({
        index: 0, placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            let target: HTMLInputElement = document.getElementById('axisElements') as HTMLInputElement;
            if (axes.index === 0) {
                target.checked = chart.primaryXAxis.placeNextToAxisLine;
                crossValue.value = +chart.primaryXAxis.crossesAt;
            } else {
                target.checked = chart.primaryYAxis.placeNextToAxisLine;
                crossValue.value = +chart.primaryYAxis.crossesAt;
            }
            chart.dataBind();
        }
    });
    axes.appendTo('#selectAxis');
    let crossValue: NumericTextBox = new NumericTextBox({
        value: 0, min: -8,
        max: 8, width: 120,
        step: 2,
        change: () => {
            if (axes.index === 0) {
                chart.primaryXAxis.crossesAt = crossValue.value;
            } else {
                chart.primaryYAxis.crossesAt = crossValue.value;
            }
            chart.dataBind();
        }
    });
    crossValue.appendTo('#crossingValue');
    document.getElementById('axisElements').onchange = (e: Event): void => {
        let value: boolean = (e.target as HTMLInputElement).checked;
        if (axes.index === 0) {
            chart.primaryXAxis.placeNextToAxisLine = value;
        } else {
            chart.primaryYAxis.placeNextToAxisLine = value;
        }
        chart.dataBind();
    };
};