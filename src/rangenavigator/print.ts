import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, StepLineSeries, SplineSeries, IChangedEventArgs,
    ChartTheme, RangeNavigator
} from '@syncfusion/ej2-charts';
Chart.Inject(SplineSeries);
RangeNavigator.Inject(StepLineSeries);
import { Button } from '@syncfusion/ej2-buttons';

/**
 * Sample for Chart print
 */

let series1: Object[] = [];
let series2: Object[] = [];
let value: number = 100;
let value1: number = 120;
for (let i: number = 0; i < 351; i++) {
    if (Math.random() > .5) {
        value += Math.random();
        value1 += Math.random();
    } else {
        value -= Math.random();
        value1 -= Math.random();
    }
    series1.push({ x: i, y: value });
    series2.push({ x: i, y: value1 });
}
let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart(
        {
            primaryXAxis: { crosshairTooltip: { enable: true }, edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } },
            primaryYAxis: { minimum: 80, maximum: 140, majorTickLines: { width: 0 }, lineStyle: { width: 0 } },
            chartArea: { border: { width: 0 } },
            series: [
                { dataSource: series1, xName: 'x', yName: 'y', width: 2, animation: { enable: false }, type: 'Spline' },
                { dataSource: series2, xName: 'x', yName: 'y', width: 2, animation: { enable: false }, type: 'Spline' }
            ],
            crosshair: { enable: true, lineType: 'Vertical' },
            height: '350',
            theme: theme
        }
    );
    chart.appendTo('#chart');

    let range: RangeNavigator = new RangeNavigator(
        {
            labelPosition: 'Outside',
            tooltip: { enable: true },
            value: [150, 250],
            series: [{ dataSource: series1, xName: 'x', yName: 'y', type: 'StepLine', width: 1 }],
            changed: (args: IChangedEventArgs) => {
                chart.primaryXAxis.zoomFactor = args.zoomFactor;
                chart.primaryXAxis.zoomPosition = args.zoomPosition;
                chart.dataBind();
            },
            theme: theme
        }
    );
    range.appendTo('#container');
    let togglebtn: Button = new Button({
        iconCss: 'e-icons e-play-icon', cssClass: 'e-flat', isPrimary: true,
    });
    togglebtn.appendTo('#togglebtn');
    document.getElementById('togglebtn').onclick = () => {
        range.print(['container', 'chart']);
    };
};